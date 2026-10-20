import React, { useState, useId } from 'react';
import { Product, Order, DeliveryMethod } from '../types';
import { buildWhatsAppUrl, formatProductOrderMessage, NUTRIGOMA_PHONE } from '../utils/whatsapp';
import { ShoppingCart, X, CheckCircle2, MapPin, Phone, User, Package, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

interface OrderModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onOrderPlaced: (order: Order) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  product,
  isOpen,
  onClose,
  onOrderPlaced,
}) => {
  const quantityInputId = useId();
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [quantity, setQuantity] = useState<number>(1);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('retrait_depot');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState('');

  if (!isOpen || !product) return null;

  // Auto calculate price type: if quantity >= wholesaleMinBags, apply wholesale price automatically!
  const isWholesale = quantity >= product.wholesaleMinBags;
  const unitPrice = isWholesale ? product.wholesalePriceUsd : product.retailPriceUsd;
  const totalPrice = Number((quantity * unitPrice).toFixed(2));
  const savings = isWholesale 
    ? Number(((product.retailPriceUsd - product.wholesalePriceUsd) * quantity).toFixed(2))
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !phone.trim()) {
      alert('Veuillez renseigner votre nom et votre numéro de téléphone.');
      return;
    }

    const orderId = `CMD-${Date.now().toString().slice(-6)}`;
    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      clientName: clientName.trim(),
      phone: phone.trim(),
      productId: product.id,
      productName: product.name,
      quantity,
      priceType: isWholesale ? 'gros' : 'detail',
      unitPrice,
      totalPrice,
      deliveryMethod,
      deliveryAddress: deliveryAddress.trim() || (deliveryMethod === 'retrait_depot' ? 'Retrait au Dépôt NUTRIGOMA' : 'Goma Centre'),
      notes: notes.trim(),
      status: 'en_attente',
    };

    onOrderPlaced(newOrder);

    const waMessage = formatProductOrderMessage({
      orderId,
      clientName: clientName.trim(),
      phone: phone.trim(),
      productName: product.name,
      quantity,
      bagWeightKg: product.bagWeightKg,
      priceType: isWholesale ? 'gros' : 'detail',
      unitPrice,
      totalPrice,
      deliveryMethod,
      deliveryAddress: newOrder.deliveryAddress,
      notes: notes.trim(),
    });

    const url = buildWhatsAppUrl(waMessage);
    setLastWhatsAppUrl(url);
    setSubmitted(true);

    // Automatically trigger WhatsApp in new tab / app
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setClientName('');
    setPhone('');
    setQuantity(1);
    setDeliveryAddress('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border-2 border-emerald-600/20 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-amber-400 text-black rounded-lg">
              <ShoppingCart className="w-5 h-5 font-bold" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold">Formulaire de Commande</span>
              <h3 className="text-lg font-bold leading-tight">Commander cet Aliment</h3>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 text-emerald-200 hover:text-white hover:bg-emerald-700/50 rounded-lg transition"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          /* Confirmation State */
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-gray-900">Commande Préparée avec Succès !</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Votre commande pour <strong>{quantity} sac(s) de {product.name}</strong> d'un montant total de <strong>${totalPrice} USD</strong> a été enregistrée.
            </p>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-left text-xs space-y-1 text-emerald-900">
              <p><strong>Client :</strong> {clientName} ({phone})</p>
              <p><strong>Tarif :</strong> {isWholesale ? 'Prix de Gros' : 'Prix de Détail'} (${unitPrice}/sac)</p>
              <p><strong>Destinataire WhatsApp :</strong> Sinaï Buturu ({NUTRIGOMA_PHONE})</p>
              <p className="text-emerald-700 pt-1 italic">
                La commande doit être confirmée sur WhatsApp pour validation des disponibilités et préparation immédiate de vos sacs.
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={lastWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition text-base"
              >
                <span>Ouvrir WhatsApp maintenant</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full py-2.5 px-4 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition text-sm"
              >
                Fermer et retourner au catalogue
              </button>
            </div>
          </div>
        ) : (
          /* Form State */
          <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[82vh] overflow-y-auto">
            
            {/* Product Summary Card */}
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-200">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-16 h-16 rounded-lg object-cover border border-gray-300 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-gray-900 text-sm truncate">{product.name}</h4>
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 mt-1">
                  <span className="bg-emerald-100 text-emerald-800 font-medium px-2 py-0.5 rounded">
                    {product.bagWeightKg} kg / sac
                  </span>
                  <span className="font-semibold text-gray-800">
                    Détail: ${product.retailPriceUsd}
                  </span>
                  <span className="text-amber-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                    Gros: ${product.wholesalePriceUsd} (dès {product.wholesaleMinBags} sacs)
                  </span>
                </div>
              </div>
            </div>

            {/* Client Information */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Nom complet du client ou nom de la ferme *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ex: Élevage Baraka / Jean Mukeba"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Numéro de Téléphone / WhatsApp *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ex: +243 997 000 000 ou +250 788..."
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Quantity Selector & Auto Price Calculation */}
            <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor={quantityInputId} className="text-xs font-bold text-gray-900 block">
                    Nombre de sacs ({product.bagWeightKg} kg/sac) :
                  </label>
                  <span className="text-[11px] text-gray-600">
                    {isWholesale ? '🎉 Prix de gros appliqué !' : `Passez à ${product.wholesaleMinBags} sacs pour le tarif de gros (-$${(product.retailPriceUsd - product.wholesalePriceUsd).toFixed(2)}/sac)`}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-emerald-300 text-emerald-800 font-bold flex items-center justify-center hover:bg-emerald-100 active:scale-95 transition"
                  >
                    -
                  </button>
                  <input
                    id={quantityInputId}
                    type="number"
                    min="1"
                    max="1000"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-14 text-center font-bold text-gray-900 bg-white border border-emerald-300 rounded-lg py-1 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-emerald-700 text-white font-bold flex items-center justify-center hover:bg-emerald-800 active:scale-95 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[1, 5, 10, 20, 50].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setQuantity(preset)}
                    className={`text-xs px-2.5 py-1 rounded-md font-semibold transition ${
                      quantity === preset
                        ? 'bg-emerald-700 text-white'
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-emerald-400'
                    }`}
                  >
                    {preset} {preset === 1 ? 'sac' : 'sacs'} {preset >= product.wholesaleMinBags ? '⭐ Gros' : ''}
                  </button>
                ))}
              </div>

              {/* Dynamic Calculation Banner */}
              <div className="bg-white p-3 rounded-lg border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 block">Calcul du Total :</span>
                  <div className="text-xs font-medium text-gray-700">
                    {quantity} sac(s) × ${unitPrice} =
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-extrabold text-emerald-800">
                    ${totalPrice} <span className="text-xs font-normal text-gray-500">USD</span>
                  </div>
                  {savings > 0 && (
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                      Vous économisez ${savings} USD
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Delivery Method */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-emerald-700" /> Mode de Livraison Souhaité *
              </label>
              <select
                value={deliveryMethod}
                onChange={(e) => setDeliveryMethod(e.target.value as DeliveryMethod)}
                className="w-full text-sm py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
              >
                <option value="retrait_depot">🏪 Retrait gratuit au Dépôt NUTRIGOMA (Goma)</option>
                <option value="livraison_goma">🚚 Livraison à domicile / ferme à Goma (Ville)</option>
                <option value="livraison_peripherie">🚜 Livraison périphérie (Sake, Masisi, Nyiragongo, Rutshuru)</option>
                <option value="expedition_region">📦 Expédition provinciale / régionale (Bukavu, Butembo, Rwanda)</option>
              </select>
            </div>

            {/* Delivery Address / Notes */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" /> Adresse de livraison ou repère précis
              </label>
              <input
                type="text"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Ex: Quartier Mabanga Sud, av. du Lac, réf. Église..."
                className="w-full text-sm py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Remarques ou instructions particulières (facultatif)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex: Besoin urgent pour demain matin, rappel souhaité..."
                className="w-full text-sm py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
              />
            </div>

            {/* Trust disclaimer */}
            <div className="flex items-start gap-2 bg-amber-50/80 border border-amber-200 p-2.5 rounded-lg text-[11px] text-amber-900">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Engagement NUTRIGOMA BUSINESS :</strong> Les prix, les stocks réels et les rendez-vous de livraison sont vérifiés et confirmés directement par le Technicien Supérieur Sinaï Buturu via WhatsApp.
              </span>
            </div>

            {/* Action Button: CONFIRMER MA COMMANDE */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-black py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-150 flex items-center justify-center gap-2 text-base active:scale-[0.98]"
              >
                <Package className="w-5 h-5 font-bold" />
                <span>CONFIRMER MA COMMANDE SUR WHATSAPP</span>
              </button>
              <p className="text-center text-[11px] text-gray-500 mt-1.5">
                Ouvre instantanément WhatsApp avec toutes vos informations préremplies pour Sinaï Buturu.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
