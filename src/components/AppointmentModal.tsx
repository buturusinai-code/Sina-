import React, { useState } from 'react';
import { Appointment } from '../types';
import { buildWhatsAppUrl, formatAppointmentMessage, NUTRIGOMA_PHONE } from '../utils/whatsapp';
import { Calendar, X, User, Phone, MapPin, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTopic?: string;
  onAppointmentBooked: (app: Appointment) => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  serviceTopic = 'Entretien et diagnostic général de machine à granulés',
  onAppointmentBooked,
}) => {
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [topic, setTopic] = useState(serviceTopic);
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState<'matin' | 'apres_midi' | 'journee_entiere'>('matin');
  const [notes, setNotes] = useState('');

  // Update topic when serviceTopic prop changes
  React.useEffect(() => {
    if (serviceTopic) {
      setTopic(serviceTopic);
    }
  }, [serviceTopic]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientName.trim() || !phone.trim() || !location.trim()) {
      alert('Veuillez renseigner votre nom, téléphone et localisation.');
      return;
    }

    const appId = `RDV-${Date.now().toString().slice(-6)}`;
    const newApp: Appointment = {
      id: appId,
      createdAt: new Date().toISOString(),
      clientName: clientName.trim(),
      phone: phone.trim(),
      location: location.trim(),
      serviceTopic: topic.trim(),
      preferredDate: preferredDate || 'Dès que possible selon disponibilité',
      preferredTimeSlot,
      notes: notes.trim(),
      status: 'en_attente_confirmation',
    };

    onAppointmentBooked(newApp);

    const message = formatAppointmentMessage({
      appointmentId: appId,
      clientName: clientName.trim(),
      phone: phone.trim(),
      location: location.trim(),
      serviceTopic: topic.trim(),
      preferredDate: preferredDate || 'Dès que possible',
      preferredTimeSlot,
      notes: notes.trim(),
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
              <Calendar className="w-5 h-5 font-bold" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold">Consultation & Visite</span>
              <h3 className="text-lg font-bold leading-tight">Prendre Rendez-vous avec Sinaï Buturu</h3>
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

        {/* Technician Badge */}
        <div className="bg-amber-50 border-b border-amber-200 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-emerald-800 text-amber-300 flex items-center justify-center font-black text-sm">
              SB
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">Sinaï Buturu</p>
              <p className="text-[11px] text-gray-600">Technicien Supérieur en provenderie & machines</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
            NUTRIGOMA BUSINESS
          </span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Important Notice requested by prompt */}
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Confirmation obligatoire :</p>
              <p className="mt-0.5 text-amber-800">
                La date et l'heure finale du rendez-vous vous seront confirmées par NUTRIGOMA BUSINESS après échange sur WhatsApp ou appel téléphonique.
              </p>
            </div>
          </div>

          {/* Client Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Votre nom complet *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ex: David Safari"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Numéro WhatsApp / Téléphone *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ex: +243 850 000 000"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" /> Lieu du rendez-vous ou de la provenderie *
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ex: Quartier Katindo (Goma), ou Ferme de Sake..."
              className="w-full text-sm py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          {/* Service Topic */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Objet ou motif principal du rendez-vous *
            </label>
            <input
              type="text"
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ex: Diagnostic de la presse, révision complète, conseil atelier..."
              className="w-full text-sm py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          {/* Preferred Date & Slot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-700" /> Date souhaitée
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
                <Clock className="w-3.5 h-3.5 text-emerald-700" /> Créneau préféré
              </label>
              <select
                value={preferredTimeSlot}
                onChange={(e) => setPreferredTimeSlot(e.target.value as 'matin' | 'apres_midi' | 'journee_entiere')}
                className="w-full text-sm py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
              >
                <option value="matin">Matinée (08h00 - 12h00)</option>
                <option value="apres_midi">Après-midi (13h00 - 17h00)</option>
                <option value="journee_entiere">Journée entière (Gros chantier)</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Précisions supplémentaires
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: La machine est arrêtée depuis hier, nous avons besoin d'un redémarrage rapide..."
              className="w-full text-sm py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-black py-3.5 px-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-base active:scale-[0.98]"
            >
              <CheckCircle2 className="w-5 h-5 font-bold" />
              <span>SOLLICITER CE RENDEZ-VOUS SUR WHATSAPP</span>
            </button>
            <p className="text-center text-[11px] text-gray-500 mt-1.5">
              Envoi direct sur le compte WhatsApp officiel de Sinaï Buturu ({NUTRIGOMA_PHONE}).
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
