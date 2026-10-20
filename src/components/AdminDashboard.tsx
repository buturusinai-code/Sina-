import React, { useState } from 'react';
import { 
  Product, 
  MachineService, 
  Formation, 
  Order, 
  ServiceRequest, 
  Appointment, 
  TrainingRegistration 
} from '../types';
import { Storage } from '../utils/storage';
import { buildWhatsAppUrl, NUTRIGOMA_PHONE, NUTRIGOMA_OWNER } from '../utils/whatsapp';
import { 
  Lock, 
  Unlock, 
  KeyRound, 
  Package, 
  Wrench, 
  Calendar, 
  GraduationCap, 
  ShoppingCart, 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Edit3, 
  Plus, 
  Trash2, 
  Phone, 
  MessageCircle, 
  RefreshCw, 
  Download,
  AlertTriangle,
  UserCheck
} from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  services: MachineService[];
  formations: Formation[];
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  serviceRequests: ServiceRequest[];
  setServiceRequests: React.Dispatch<React.SetStateAction<ServiceRequest[]>>;
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  registrations: TrainingRegistration[];
  setRegistrations: React.Dispatch<React.SetStateAction<TrainingRegistration[]>>;
  onBackToHome: () => void;
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (val: boolean) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  setProducts,
  services,
  formations,
  orders,
  setOrders,
  serviceRequests,
  setServiceRequests,
  appointments,
  setAppointments,
  registrations,
  setRegistrations,
  onBackToHome,
  isAdminLoggedIn,
  setIsAdminLoggedIn,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState<'commandes' | 'services' | 'rdv' | 'formations' | 'stocks'>('commandes');
  
  // Product Edit Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newRetailPrice, setNewRetailPrice] = useState('30');
  const [newWholesalePrice, setNewWholesalePrice] = useState('26');
  const [newStockQty, setNewStockQty] = useState('100');
  const [newBagWeight, setNewBagWeight] = useState('50');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = Storage.getAdminPin();
    if (pinInput.trim() === correctPin || pinInput.trim() === '2024') {
      setIsAdminLoggedIn(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setPinInput('');
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    setOrders(updated);
    Storage.saveOrders(updated);
  };

  const handleUpdateServiceStatus = (reqId: string, status: ServiceRequest['status']) => {
    const updated = serviceRequests.map((r) => (r.id === reqId ? { ...r, status } : r));
    setServiceRequests(updated);
    Storage.saveServiceRequests(updated);
  };

  const handleUpdateAppointmentStatus = (appId: string, status: Appointment['status']) => {
    const updated = appointments.map((a) => (a.id === appId ? { ...a, status } : a));
    setAppointments(updated);
    Storage.saveAppointments(updated);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    const updated = products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
    setProducts(updated);
    Storage.saveProducts(updated);
    setEditingProduct(null);
  };

  const handleAddNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) return;

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: newProductName.trim(),
      category: 'autre',
      description: 'Aliment volailles certifié produit par NUTRIGOMA BUSINESS.',
      bagWeightKg: Number(newBagWeight) || 50,
      retailPriceUsd: Number(newRetailPrice) || 30,
      wholesalePriceUsd: Number(newWholesalePrice) || 26,
      wholesaleMinBags: 10,
      inStock: true,
      stockQuantity: Number(newStockQty) || 50,
      imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80',
      proteinPercent: '19.0% PB',
      targetAge: 'Poulets chair et ponte',
      benefits: ['Équilibré', 'Disponible à Goma']
    };

    const updated = [newProd, ...products];
    setProducts(updated);
    Storage.saveProducts(updated);
    setIsAddingProduct(false);
    setNewProductName('');
  };

  const handleDirectWhatsAppClient = (phone: string, text: string) => {
    const url = buildWhatsAppUrl(text, phone);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const totalRevenueOrders = orders.reduce((acc, curr) => acc + curr.totalPrice, 0);

  // If not logged in, show secure login box
  if (!isAdminLoggedIn) {
    return (
      <section className="py-14 sm:py-20 bg-gray-100 min-h-[60vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border-2 border-emerald-800/30 overflow-hidden p-6 sm:p-8 space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-amber-400 text-black rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-8 h-8 font-black" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900">
              ESPACE ADMINISTRATEUR
            </h2>
            <p className="text-xs text-gray-600">
              Réservé à <strong>Sinaï Buturu</strong> — Gestion des commandes, des stocks et du planning d'interventions.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Code PIN Administrateur :
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="password"
                  autoFocus
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="Entrez le code PIN (défaut : 2024)"
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-mono"
                />
              </div>
              {pinError && (
                <p className="text-xs text-red-600 font-bold mt-1">
                  Code PIN incorrect. Veuillez réessayer. (Indice : 2024)
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-black py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 text-sm"
            >
              <Unlock className="w-4 h-4" />
              <span>DÉVERROUILLER L'ACCÈS</span>
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-emerald-800 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Retour au site public</span>
            </button>
          </div>

        </div>
      </section>
    );
  }

  return (
    <section id="admin" className="py-8 sm:py-12 bg-gray-100 min-h-screen scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Top Control Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 px-3 py-2 rounded-xl transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>RETOUR À L'ACCUEIL</span>
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black bg-amber-400 text-black px-2 py-0.5 rounded-md">
                  ADMIN
                </span>
                <h2 className="text-lg sm:text-xl font-black text-gray-900">
                  Tableau de Bord NUTRIGOMA BUSINESS
                </h2>
              </div>
              <p className="text-xs text-gray-500">
                Connecté en tant que <strong>{NUTRIGOMA_OWNER}</strong> ({NUTRIGOMA_PHONE})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-center">
            <button
              onClick={handleLogout}
              className="text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-2 rounded-xl transition flex items-center gap-1"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>

        {/* Global KPI Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
              <span>Commandes</span>
              <ShoppingCart className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-gray-900">{orders.length}</div>
            <span className="text-[11px] text-emerald-700 font-semibold">
              ${totalRevenueOrders.toFixed(2)} USD total
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
              <span>Dépannages</span>
              <Wrench className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-gray-900">{serviceRequests.length}</div>
            <span className="text-[11px] text-amber-700 font-semibold">
              Demandes d'intervention
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
              <span>Rendez-vous</span>
              <Calendar className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-gray-900">{appointments.length}</div>
            <span className="text-[11px] text-purple-700 font-semibold">
              Avec Sinaï Buturu
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
              <span>Academy</span>
              <GraduationCap className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-gray-900">{registrations.length}</div>
            <span className="text-[11px] text-blue-700 font-semibold">
              Inscriptions reçues
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-1 col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
              <span>Catalogue</span>
              <Package className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-gray-900">{products.length}</div>
            <span className="text-[11px] text-emerald-700 font-semibold">
              Aliments actifs
            </span>
          </div>

        </div>

        {/* Tab Selection Navigation */}
        <div className="bg-white p-2 rounded-2xl border border-gray-200 shadow-sm flex flex-wrap gap-2">
          
          <button
            onClick={() => setActiveAdminTab('commandes')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeAdminTab === 'commandes'
                ? 'bg-emerald-800 text-white shadow'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Commandes d'Aliments ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('services')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeAdminTab === 'services'
                ? 'bg-emerald-800 text-white shadow'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Demandes Machines ({serviceRequests.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('rdv')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeAdminTab === 'rdv'
                ? 'bg-emerald-800 text-white shadow'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Rendez-vous Sinaï Buturu ({appointments.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('formations')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeAdminTab === 'formations'
                ? 'bg-emerald-800 text-white shadow'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Inscriptions Academy ({registrations.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('stocks')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeAdminTab === 'stocks'
                ? 'bg-emerald-800 text-white shadow'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Gestion des Prix & Stocks</span>
          </button>

        </div>

        {/* Tab 1: COMMANDES */}
        {activeAdminTab === 'commandes' && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-gray-900">
                Historique des Commandes d'Aliments ({orders.length})
              </h3>
              <span className="text-xs text-gray-500">
                Toutes les commandes reçues via l'application
              </span>
            </div>

            {orders.length === 0 ? (
              <p className="text-xs text-gray-500 py-8 text-center">Aucune commande pour le moment.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold">
                    <tr>
                      <th className="py-3 px-3">Réf / Date</th>
                      <th className="py-3 px-3">Client & Téléphone</th>
                      <th className="py-3 px-3">Aliment & Quantité</th>
                      <th className="py-3 px-3">Total ($)</th>
                      <th className="py-3 px-3">Livraison</th>
                      <th className="py-3 px-3">Statut</th>
                      <th className="py-3 px-3">Action WhatsApp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-gray-50/80">
                        <td className="py-3 px-3 font-mono font-bold text-gray-900">
                          {ord.id}<br />
                          <span className="text-[10px] text-gray-500 font-normal">
                            {new Date(ord.createdAt).toLocaleDateString('fr-FR')}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <strong className="text-gray-900 block">{ord.clientName}</strong>
                          <span className="text-emerald-700 font-mono">{ord.phone}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-semibold text-gray-800">{ord.productName}</span><br />
                          <span className="text-[11px] text-gray-600 font-bold">
                            {ord.quantity} sac(s) ({ord.priceType === 'gros' ? 'Gros' : 'Détail'})
                          </span>
                        </td>
                        <td className="py-3 px-3 font-black text-emerald-800 text-sm">
                          ${ord.totalPrice}
                        </td>
                        <td className="py-3 px-3 text-gray-600">
                          <span className="font-medium text-gray-900 block">{ord.deliveryMethod}</span>
                          <span className="text-[11px] text-gray-500">{ord.deliveryAddress}</span>
                        </td>
                        <td className="py-3 px-3">
                          <select
                            value={ord.status}
                            onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value as any)}
                            className={`text-[11px] font-bold px-2 py-1 rounded-lg border outline-none ${
                              ord.status === 'confirmee'
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                : ord.status === 'livree'
                                ? 'bg-blue-100 text-blue-800 border-blue-300'
                                : 'bg-amber-100 text-amber-800 border-amber-300'
                            }`}
                          >
                            <option value="en_attente">⏳ En attente</option>
                            <option value="confirmee">✅ Confirmée</option>
                            <option value="en_livraison">🚚 En livraison</option>
                            <option value="livree">📦 Livrée</option>
                            <option value="annulee">❌ Annulée</option>
                          </select>
                        </td>
                        <td className="py-3 px-3">
                          <button
                            onClick={() => handleDirectWhatsAppClient(
                              ord.phone,
                              `Bonjour ${ord.clientName}, c'est Sinaï Buturu de NUTRIGOMA BUSINESS. Je confirme la bonne réception de votre commande #${ord.id} de ${ord.quantity} sacs de ${ord.productName}.`
                            )}
                            className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-2.5 py-1.5 rounded-lg font-bold flex items-center gap-1 text-[11px] transition shadow-sm"
                            title="Répondre sur WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Contacter</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: SERVICES MACHINES */}
        {activeAdminTab === 'services' && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 space-y-4">
            <h3 className="font-extrabold text-base text-gray-900">
              Demandes d'Intervention & Pannes Machines ({serviceRequests.length})
            </h3>

            {serviceRequests.length === 0 ? (
              <p className="text-xs text-gray-500 py-8 text-center">Aucune demande enregistrée.</p>
            ) : (
              <div className="space-y-3">
                {serviceRequests.map((req) => (
                  <div key={req.id} className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-2">
                      <div>
                        <span className="font-mono text-xs font-bold text-gray-500 mr-2">{req.id}</span>
                        <strong className="text-sm text-gray-900">{req.serviceTitle}</strong>
                      </div>
                      <div className="flex items-center gap-2">
                        {req.urgency === 'urgent' && (
                          <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                            🔴 Urgent
                          </span>
                        )}
                        <select
                          value={req.status}
                          onChange={(e) => handleUpdateServiceStatus(req.id, e.target.value as any)}
                          className="text-xs font-bold px-2 py-1 bg-white border border-gray-300 rounded-lg outline-none"
                        >
                          <option value="en_attente">⏳ En attente</option>
                          <option value="confirmee">✅ Confirmée</option>
                          <option value="en_cours">⚙️ En cours</option>
                          <option value="terminee">🏁 Terminée</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-gray-700">
                      <div>
                        <span className="text-gray-500 block">Client & Contact :</span>
                        <strong>{req.clientName}</strong> ({req.phone})
                      </div>
                      <div>
                        <span className="text-gray-500 block">Lieu & Machine :</span>
                        <span>{req.location} • <em>{req.machineType}</em></span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Date souhaitée :</span>
                        <span className="font-bold text-emerald-800">{req.preferredDate}</span>
                      </div>
                    </div>

                    <div className="bg-white p-2.5 rounded-lg border border-gray-200 text-xs text-gray-800">
                      <span className="font-bold text-gray-900">Problème décrit : </span>
                      {req.problemDescription}
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => handleDirectWhatsAppClient(
                          req.phone,
                          `Bonjour ${req.clientName}, c'est le Technicien Sinaï Buturu (NUTRIGOMA BUSINESS). Je prends en charge votre demande de service #${req.id} pour votre ${req.machineType}.`
                        )}
                        className="bg-[#25D366] text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Répondre au client sur WhatsApp</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: RENDEZ-VOUS SINAÏ BUTURU */}
        {activeAdminTab === 'rdv' && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-gray-900">
                Planning des Rendez-vous Sinaï Buturu ({appointments.length})
              </h3>
              <span className="text-xs text-amber-700 font-semibold bg-amber-50 px-2 py-1 rounded">
                À confirmer obligatoirement par NUTRIGOMA
              </span>
            </div>

            {appointments.length === 0 ? (
              <p className="text-xs text-gray-500 py-8 text-center">Aucun rendez-vous en attente.</p>
            ) : (
              <div className="space-y-3">
                {appointments.map((app) => (
                  <div key={app.id} className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-2">
                      <div>
                        <span className="font-mono text-xs font-bold text-gray-500 mr-2">{app.id}</span>
                        <strong className="text-sm text-gray-900">{app.serviceTopic}</strong>
                      </div>
                      <select
                        value={app.status}
                        onChange={(e) => handleUpdateAppointmentStatus(app.id, e.target.value as any)}
                        className="text-xs font-bold px-2 py-1 bg-white border border-gray-300 rounded-lg outline-none"
                      >
                        <option value="en_attente_confirmation">⏳ En attente de confirmation</option>
                        <option value="confirme_par_nutrigoma">✅ Confirmé par Sinaï Buturu</option>
                        <option value="reprogramme">📅 Reprogrammé</option>
                        <option value="termine">🏁 Terminé</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-gray-500 block">Client :</span>
                        <strong className="text-gray-900">{app.clientName}</strong>
                        <span className="text-emerald-700 block">{app.phone}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Lieu du RDV :</span>
                        <span className="text-gray-800">{app.location}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Date & Créneau :</span>
                        <span className="font-bold text-emerald-800">{app.preferredDate} ({app.preferredTimeSlot})</span>
                      </div>
                    </div>

                    {app.notes && (
                      <div className="text-xs text-gray-600 bg-white p-2 rounded border border-gray-200">
                        {app.notes}
                      </div>
                    )}

                    <div className="flex justify-end">
                      <button
                        onClick={() => handleDirectWhatsAppClient(
                          app.phone,
                          `Bonjour ${app.clientName}, c'est Sinaï Buturu (NUTRIGOMA BUSINESS). Je vous contacte pour confirmer notre rendez-vous pour le : ${app.preferredDate} (${app.preferredTimeSlot}). Merci de me valider votre présence.`
                        )}
                        className="bg-[#25D366] text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Confirmer la date sur WhatsApp</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: FORMATIONS ACADEMY */}
        {activeAdminTab === 'formations' && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 space-y-4">
            <h3 className="font-extrabold text-base text-gray-900">
              Inscriptions NUTRIGOMA ACADEMY ({registrations.length})
            </h3>

            {registrations.length === 0 ? (
              <p className="text-xs text-gray-500 py-8 text-center">Aucune inscription pour le moment.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold">
                    <tr>
                      <th className="py-2.5 px-3">Participant</th>
                      <th className="py-2.5 px-3">Formation</th>
                      <th className="py-2.5 px-3">Ville / Format</th>
                      <th className="py-2.5 px-3">Profil</th>
                      <th className="py-2.5 px-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {registrations.map((reg) => (
                      <tr key={reg.id} className="hover:bg-gray-50">
                        <td className="py-3 px-3">
                          <strong className="text-gray-900 block">{reg.participantName}</strong>
                          <span className="text-emerald-700 font-mono">{reg.phone}</span>
                        </td>
                        <td className="py-3 px-3 font-semibold text-gray-800">
                          {reg.formationTitle}
                        </td>
                        <td className="py-3 px-3 text-gray-600">
                          {reg.city} • <span className="font-medium text-emerald-800">{reg.sessionType}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="bg-emerald-50 text-emerald-900 px-2 py-0.5 rounded font-semibold text-[11px]">
                            {reg.experienceLevel}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <button
                            onClick={() => handleDirectWhatsAppClient(
                              reg.phone,
                              `Bonjour ${reg.participantName}, c'est Sinaï Buturu de NUTRIGOMA ACADEMY. J'ai bien reçu votre demande d'inscription pour la formation : ${reg.formationTitle}.`
                            )}
                            className="bg-[#25D366] text-white px-2.5 py-1.5 rounded-lg font-bold flex items-center gap-1 text-[11px]"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Contacter</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 5: GESTION DES PRIX & STOCKS */}
        {activeAdminTab === 'stocks' && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-extrabold text-base text-gray-900">
                  Catalogue & Disponibilité des Stocks
                </h3>
                <p className="text-xs text-gray-500">
                  Modifiez les prix de détail, prix de gros et quantités de sacs en stock en direct.
                </p>
              </div>

              <button
                onClick={() => setIsAddingProduct(true)}
                className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs transition"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter un Nouvel Aliment</span>
              </button>
            </div>

            {/* Product Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold">
                  <tr>
                    <th className="py-3 px-3">Aliment</th>
                    <th className="py-3 px-3">Sac (kg)</th>
                    <th className="py-3 px-3">Prix Détail ($)</th>
                    <th className="py-3 px-3">Prix Gros ($)</th>
                    <th className="py-3 px-3">Stock (Sacs)</th>
                    <th className="py-3 px-3">Statut</th>
                    <th className="py-3 px-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="py-3 px-3 font-bold text-gray-900">
                        {p.name}
                      </td>
                      <td className="py-3 px-3">{p.bagWeightKg} kg</td>
                      <td className="py-3 px-3 font-extrabold text-gray-900">
                        ${p.retailPriceUsd}
                      </td>
                      <td className="py-3 px-3 font-extrabold text-emerald-800">
                        ${p.wholesalePriceUsd} (≥{p.wholesaleMinBags} sacs)
                      </td>
                      <td className="py-3 px-3 font-black text-gray-900">
                        {p.stockQuantity} sacs
                      </td>
                      <td className="py-3 px-3">
                        <button
                          onClick={() => {
                            const updated = products.map((item) =>
                              item.id === p.id ? { ...item, inStock: !item.inStock } : item
                            );
                            setProducts(updated);
                            Storage.saveProducts(updated);
                          }}
                          className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            p.inStock
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {p.inStock ? 'En Stock' : 'Rupture'}
                        </button>
                      </td>
                      <td className="py-3 px-3">
                        <button
                          onClick={() => setEditingProduct(p)}
                          className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
                          title="Modifier"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Quick Demo Data Reset Option */}
            <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
              <span>NUTRIGOMA BUSINESS • Espace Sinaï Buturu</span>
              <button
                onClick={() => {
                  if (confirm('Voulez-vous réinitialiser les données démo par défaut ?')) {
                    Storage.resetToDefaults();
                    window.location.reload();
                  }
                }}
                className="text-gray-500 hover:text-red-700 underline text-xs"
              >
                Réinitialiser les données de démonstration
              </button>
            </div>
          </div>
        )}

        {/* Modal: Edit Product */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
              <h4 className="font-extrabold text-base text-gray-900">
                Modifier : {editingProduct.name}
              </h4>
              
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Prix Détail (USD)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={editingProduct.retailPriceUsd}
                    onChange={(e) => setEditingProduct({ ...editingProduct, retailPriceUsd: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 border border-gray-300 rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Prix Gros (USD)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={editingProduct.wholesalePriceUsd}
                    onChange={(e) => setEditingProduct({ ...editingProduct, wholesalePriceUsd: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 border border-gray-300 rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Quantité en Stock</label>
                  <input
                    type="number"
                    value={editingProduct.stockQuantity}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stockQuantity: parseInt(e.target.value) || 0 })}
                    className="w-full p-2 border border-gray-300 rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Poids du sac (kg)</label>
                  <input
                    type="number"
                    value={editingProduct.bagWeightKg}
                    onChange={(e) => setEditingProduct({ ...editingProduct, bagWeightKg: parseInt(e.target.value) || 50 })}
                    className="w-full p-2 border border-gray-300 rounded-lg outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="stockCheck"
                  checked={editingProduct.inStock}
                  onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <label htmlFor="stockCheck" className="text-xs font-bold text-gray-800">
                  Marquer comme disponible en stock
                </label>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleUpdateProduct(editingProduct)}
                  className="flex-1 bg-emerald-800 text-white font-bold py-2.5 rounded-xl text-xs hover:bg-emerald-700"
                >
                  Enregistrer les modifications
                </button>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2.5 border border-gray-300 text-gray-700 font-bold rounded-xl text-xs"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Add New Product */}
        {isAddingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <form onSubmit={handleAddNewProduct} className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
              <h4 className="font-extrabold text-base text-gray-900">
                Ajouter un Nouvel Aliment Volaille
              </h4>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Nom de l'aliment *</label>
                <input
                  type="text"
                  required
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  placeholder="Ex: Aliment Pondeuse Spécial Élevage"
                  className="w-full p-2 text-xs border border-gray-300 rounded-lg outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Prix Détail (USD)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newRetailPrice}
                    onChange={(e) => setNewRetailPrice(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Prix Gros (USD)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newWholesalePrice}
                    onChange={(e) => setNewWholesalePrice(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Poids du sac (kg)</label>
                  <input
                    type="number"
                    value={newBagWeight}
                    onChange={(e) => setNewBagWeight(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Quantité initiale</label>
                  <input
                    type="number"
                    value={newStockQty}
                    onChange={(e) => setNewStockQty(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-emerald-800 text-white font-bold py-2.5 rounded-xl text-xs hover:bg-emerald-700"
                >
                  Ajouter au catalogue
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingProduct(false)}
                  className="px-4 py-2.5 border border-gray-300 text-gray-700 font-bold rounded-xl text-xs"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </section>
  );
};
