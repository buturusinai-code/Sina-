import React, { useState } from 'react';
import { MachineService, ServiceRequest } from '../types';
import { buildWhatsAppUrl, formatServiceRequestMessage, NUTRIGOMA_PHONE } from '../utils/whatsapp';
import { Wrench, X, User, Phone, MapPin, Calendar, Camera, AlertTriangle, Send } from 'lucide-react';

interface ServiceRequestModalProps {
  service: MachineService | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestSubmitted: (req: ServiceRequest) => void;
}

export const ServiceRequestModal: React.FC<ServiceRequestModalProps> = ({
  service,
  isOpen,
  onClose,
  onRequestSubmitted,
}) => {
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [machineType, setMachineType] = useState('Presse à filière plate (moteur électrique)');
  const [customMachine, setCustomMachine] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [urgency, setUrgency] = useState<'normal' | 'urgent'>('normal');
  const [photoNote, setPhotoNote] = useState('');
  const [hasPhotos, setHasPhotos] = useState(false);

  if (!isOpen || !service) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientName.trim() || !phone.trim() || !location.trim() || !problemDescription.trim()) {
      alert('Veuillez remplir votre nom, téléphone, localisation et la description du problème.');
      return;
    }

    const finalMachine = machineType === 'Autre machine' && customMachine.trim()
      ? customMachine.trim()
      : machineType;

    const reqId = `SRV-${Date.now().toString().slice(-6)}`;
    const newRequest: ServiceRequest = {
      id: reqId,
      createdAt: new Date().toISOString(),
      serviceId: service.id,
      serviceTitle: service.title,
      clientName: clientName.trim(),
      phone: phone.trim(),
      location: location.trim(),
      machineType: finalMachine,
      problemDescription: problemDescription.trim(),
      preferredDate: preferredDate || 'Dès que possible',
      urgency,
      photoNote: hasPhotos ? (photoNote.trim() || 'Photos disponibles à transmettre sur WhatsApp') : undefined,
      status: 'en_attente',
    };

    onRequestSubmitted(newRequest);

    const message = formatServiceRequestMessage({
      requestId: reqId,
      serviceTitle: service.title,
      clientName: clientName.trim(),
      phone: phone.trim(),
      location: location.trim(),
      machineType: finalMachine,
      problemDescription: problemDescription.trim(),
      preferredDate: preferredDate || 'Dès que possible',
      urgency,
      photoNote: hasPhotos ? (photoNote.trim() || 'Photos jointes dans la discussion') : undefined,
    });

    const url = buildWhatsAppUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border-2 border-emerald-600/30 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-amber-400 text-black rounded-lg">
              <Wrench className="w-5 h-5 font-bold" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold">Intervention Technique</span>
              <h3 className="text-base sm:text-lg font-bold leading-tight line-clamp-1">{service.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-emerald-200 hover:text-white hover:bg-emerald-700/50 rounded-lg transition"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[82vh] overflow-y-auto">
          
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center gap-3">
            <img
              src={service.imageUrl}
              alt={service.title}
              className="w-14 h-14 rounded-lg object-cover border border-emerald-300 shrink-0"
            />
            <div className="text-xs">
              <span className="bg-emerald-200/80 text-emerald-900 font-bold px-2 py-0.5 rounded text-[11px]">
                {service.badge}
              </span>
              <p className="text-gray-700 mt-1 line-clamp-2">{service.description}</p>
            </div>
          </div>

          {/* Client Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Nom du client ou de l'entreprise *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ex: Justin K. / Provenderie Espoir"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Numéro de téléphone / WhatsApp *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ex: +243 997 000 000"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" /> Localisation de la machine *
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ex: Goma (Quartier Himbi), Sake, Rutshuru, Rubavu / Gisenyi..."
              className="w-full text-sm py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          {/* Machine Type */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Type de machine concernée *
            </label>
            <select
              value={machineType}
              onChange={(e) => setMachineType(e.target.value)}
              className="w-full text-sm py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white mb-2"
            >
              <option value="Presse à granulés matrice plate (Moteur électrique)">Presse à granulés matrice plate (Moteur électrique)</option>
              <option value="Presse à granulés matrice plate (Moteur diesel)">Presse à granulés matrice plate (Moteur diesel)</option>
              <option value="Presse à filière annulaire industrielle">Presse à filière annulaire industrielle</option>
              <option value="Broyeur à marteaux pour céréales">Broyeur à marteaux pour céréales</option>
              <option value="Mélangeur vertical ou horizontal">Mélangeur vertical ou horizontal</option>
              <option value="Ligne complète de provenderie">Ligne complète de provenderie</option>
              <option value="Autre machine">Autre équipement (préciser ci-dessous)</option>
            </select>
            {machineType === 'Autre machine' && (
              <input
                type="text"
                value={customMachine}
                onChange={(e) => setCustomMachine(e.target.value)}
                placeholder="Précisez le modèle ou la machine..."
                className="w-full text-sm py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            )}
          </div>

          {/* Problem description */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Description détaillée du problème / de la panne *
            </label>
            <textarea
              required
              rows={3}
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
              placeholder="Décrivez les symptômes : bourrage, granulé mou, vibrations, bruit de roulement, blocage de matrice, surchauffe moteur..."
              className="w-full text-sm py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
            />
          </div>

          {/* Photo handling */}
          <div className="bg-gray-50 border border-gray-200 p-3 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-800 flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasPhotos}
                  onChange={(e) => setHasPhotos(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <Camera className="w-4 h-4 text-emerald-700" />
                <span>J'ai des photos ou vidéos de la machine</span>
              </label>
            </div>
            {hasPhotos && (
              <div className="pt-1">
                <input
                  type="text"
                  value={photoNote}
                  onChange={(e) => setPhotoNote(e.target.value)}
                  placeholder="Ex: Photos de la matrice usée et de la plaque signalétique"
                  className="w-full text-xs py-1.5 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <p className="text-[11px] text-gray-500 mt-1 italic">
                  💡 Vous pourrez envoyer directement vos photos et vidéos dans la conversation WhatsApp avec Sinaï Buturu qui s'ouvrira après envoi.
                </p>
              </div>
            )}
          </div>

          {/* Date & Urgency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-700" /> Date souhaitée d'intervention
              </label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full text-sm py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Degré d'urgence
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as 'normal' | 'urgent')}
                className="w-full text-sm py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white font-medium"
              >
                <option value="normal">🟢 Normal (Planification courante)</option>
                <option value="urgent">🔴 URGENT (Arrêt complet d'usine / production)</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-black py-3.5 px-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-base active:scale-[0.98]"
            >
              <Send className="w-5 h-5" />
              <span>ENVOYER MA DEMANDE SUR WHATSAPP</span>
            </button>
            <p className="text-center text-[11px] text-gray-500 mt-1.5">
              Demande transmise directement au Technicien Supérieur Sinaï Buturu ({NUTRIGOMA_PHONE}).
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
