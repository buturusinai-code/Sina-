import React, { useState } from 'react';
import { Product } from '../types';
import { buildWhatsAppUrl, formatPriceInquiryMessage, NUTRIGOMA_PHONE } from '../utils/whatsapp';
import { PhoneCall, X, User, ArrowRight, MessageSquare, Tag, Sparkles } from 'lucide-react';

interface PriceQuoteModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PriceQuoteModal: React.FC<PriceQuoteModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [clientName, setClientName] = useState('');
  const [estimatedQuantity, setEstimatedQuantity] = useState('10 sacs et plus (gros)');
  const [question, setQuestion] = useState('');

  if (!isOpen || !product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = formatPriceInquiryMessage({
      productName: product.name,
      clientName: clientName.trim(),
      estimatedQuantity,
      question: question.trim(),
    });

    const url = buildWhatsAppUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border-2 border-amber-500/30 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-emerald-900 text-amber-300 rounded-lg">
              <PhoneCall className="w-5 h-5 font-bold" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-200 font-semibold">Tarification & Négociation</span>
              <h3 className="text-lg font-bold leading-tight">Demander le Prix / Devis Gros</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-amber-200 hover:text-white hover:bg-amber-800/50 rounded-lg transition"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          
          <div className="bg-amber-50/70 border border-amber-200 p-3 rounded-xl flex items-center gap-3">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-14 h-14 rounded-lg object-cover border border-amber-300 shrink-0"
            />
            <div className="text-xs space-y-0.5">
              <h4 className="font-bold text-gray-900 line-clamp-1">{product.name}</h4>
              <p className="text-gray-600 font-medium">Sac de {product.bagWeightKg} kg</p>
              <div className="flex items-center gap-2 pt-0.5">
                <span className="text-emerald-700 font-bold">Détail indicatif : ${product.retailPriceUsd}</span>
                <span className="text-amber-700 font-bold">Gros : dès ${product.wholesalePriceUsd}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Votre Nom ou Nom de votre Ferme
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Ex: Élevage du Kivu / Patrick"
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-amber-700" /> Volume envisagé pour la cotation
            </label>
            <select
              value={estimatedQuantity}
              onChange={(e) => setEstimatedQuantity(e.target.value)}
              className="w-full text-sm py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none bg-white"
            >
              <option value="1 à 4 sacs (Détail)">1 à 4 sacs (Achat au détail)</option>
              <option value="5 à 9 sacs (Semi-gros)">5 à 9 sacs (Semi-gros)</option>
              <option value="10 à 25 sacs (Tarif Gros Provenderie)">10 à 25 sacs (Tarif Gros Provenderie)</option>
              <option value="Plus de 25 sacs (Gros volume élevage)">Plus de 25 sacs (Grand volume régulier)</option>
              <option value="Approvisionnement mensuel contractuel">Contrat d'approvisionnement mensuel</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-amber-700" /> Précisez votre demande ou question
            </label>
            <textarea
              rows={3}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ex: Demande de remise pour 20 sacs livrés à Sake, facilités de paiement, disponibilité immédiate..."
              className="w-full text-sm py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none resize-none"
            />
          </div>

          <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg text-xs text-gray-600 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p>
              Le Technicien Supérieur <strong>Sinaï Buturu</strong> vous répondra directement sur WhatsApp ({NUTRIGOMA_PHONE}) pour vous proposer le meilleur tarif selon vos volumes.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm active:scale-95"
            >
              <PhoneCall className="w-4 h-4 font-bold" />
              <span>NÉGOCIER & DEMANDER LE PRIX SUR WHATSAPP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
