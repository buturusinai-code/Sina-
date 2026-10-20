import React, { useState } from 'react';
import { Formation, TrainingRegistration } from '../types';
import { buildWhatsAppUrl, formatTrainingRegistrationMessage, formatTrainingInfoMessage, NUTRIGOMA_PHONE } from '../utils/whatsapp';
import { GraduationCap, X, User, Phone, MapPin, Send, HelpCircle, BookOpen } from 'lucide-react';

interface TrainingModalProps {
  formation: Formation | null;
  mode: 'register' | 'info';
  isOpen: boolean;
  onClose: () => void;
  onRegistered: (reg: TrainingRegistration) => void;
}

export const TrainingRegistrationModal: React.FC<TrainingModalProps> = ({
  formation,
  mode,
  isOpen,
  onClose,
  onRegistered,
}) => {
  const [participantName, setParticipantName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Goma');
  const [sessionType, setSessionType] = useState<'presentiel_goma' | 'en_ligne' | 'pratique_ferme'>('presentiel_goma');
  const [experienceLevel, setExperienceLevel] = useState<'debutant' | 'eleveur_actif' | 'technicien'>('eleveur_actif');
  const [notes, setNotes] = useState('');

  if (!isOpen || !formation) return null;

  const handleSubmitRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!participantName.trim() || !phone.trim()) {
      alert('Veuillez renseigner votre nom et votre numéro de téléphone.');
      return;
    }

    const regId = `REG-${Date.now().toString().slice(-6)}`;
    const newReg: TrainingRegistration = {
      id: regId,
      createdAt: new Date().toISOString(),
      formationId: formation.id,
      formationTitle: formation.title,
      participantName: participantName.trim(),
      phone: phone.trim(),
      city: city.trim() || 'Goma',
      sessionType,
      experienceLevel,
      notes: notes.trim(),
      status: 'en_attente',
    };

    onRegistered(newReg);

    const message = formatTrainingRegistrationMessage({
      registrationId: regId,
      formationTitle: formation.title,
      participantName: participantName.trim(),
      phone: phone.trim(),
      city: city.trim() || 'Goma',
      sessionType,
      experienceLevel,
      notes: notes.trim(),
    });

    const url = buildWhatsAppUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleInfoDirect = (e: React.FormEvent) => {
    e.preventDefault();
    const message = formatTrainingInfoMessage(formation.title, participantName.trim() || undefined);
    const url = buildWhatsAppUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border-2 border-emerald-600/30 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className={`px-5 py-4 text-white flex items-center justify-between ${
          mode === 'register' 
            ? 'bg-gradient-to-r from-emerald-800 to-emerald-950' 
            : 'bg-gradient-to-r from-amber-600 to-amber-800'
        }`}>
          <div className="flex items-center space-x-2">
            <div className={`p-2 rounded-lg ${mode === 'register' ? 'bg-amber-400 text-black' : 'bg-emerald-900 text-amber-300'}`}>
              {mode === 'register' ? <GraduationCap className="w-5 h-5 font-bold" /> : <HelpCircle className="w-5 h-5 font-bold" />}
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold">NUTRIGOMA ACADEMY</span>
              <h3 className="text-base sm:text-lg font-bold leading-tight">
                {mode === 'register' ? 'S’Inscrire à cette Formation' : 'Demander des Informations'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-black/20 rounded-lg transition"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formation Header Preview */}
        <div className="bg-gray-50 border-b border-gray-200 p-3.5 flex items-start gap-3">
          <img
            src={formation.imageUrl}
            alt={formation.title}
            className="w-16 h-16 rounded-xl object-cover border border-gray-300 shrink-0"
          />
          <div className="text-xs min-w-0">
            <h4 className="font-bold text-gray-900 text-sm leading-snug">{formation.title}</h4>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-gray-600">
              <span className="font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                Tarif : ${formation.priceUsd} USD
              </span>
              <span>⏱️ {formation.duration}</span>
              {formation.certified && (
                <span className="bg-amber-100 text-amber-900 font-semibold px-2 py-0.5 rounded">
                  📜 Certifié NUTRIGOMA
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content depending on mode */}
        {mode === 'register' ? (
          <form onSubmit={handleSubmitRegister} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
            
            {/* Participant Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Nom complet du participant *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={participantName}
                  onChange={(e) => setParticipantName(e.target.value)}
                  placeholder="Ex: Alain Kambale"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            {/* Phone */}
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
                  placeholder="Ex: +243 998 000 000"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" /> Ville ou localité
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ex: Goma, Bukavu, Butembo, Rubavu / Rwanda..."
                className="w-full text-sm py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            {/* Session Type & Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Format de participation *
                </label>
                <select
                  value={sessionType}
                  onChange={(e) => setSessionType(e.target.value as any)}
                  className="w-full text-sm py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                >
                  <option value="presentiel_goma">🏫 Présentiel Atelier (Goma)</option>
                  <option value="pratique_ferme">🚜 Pratique en Ferme / Provenderie</option>
                  <option value="en_ligne">💻 En ligne (Visioconférence)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Niveau d'expérience
                </label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value as any)}
                  className="w-full text-sm py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                >
                  <option value="debutant">🌱 Débutant (Nouveau projet)</option>
                  <option value="eleveur_actif">🐔 Éleveur en activité</option>
                  <option value="technicien">⚙️ Technicien / Opérateur</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Attentes particulières ou questions (facultatif)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex: Je souhaite formuler des aliments poules pondeuses pour 2000 têtes..."
                className="w-full text-sm py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-black py-3.5 px-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-base active:scale-[0.98]"
              >
                <Send className="w-5 h-5" />
                <span>CONFIRMER MON INSCRIPTION SUR WHATSAPP</span>
              </button>
              <p className="text-center text-[11px] text-gray-500 mt-1.5">
                Demande envoyée directement à Sinaï Buturu ({NUTRIGOMA_PHONE}).
              </p>
            </div>
          </form>
        ) : (
          /* Info Request Mode */
          <form onSubmit={handleInfoDirect} className="p-5 space-y-4">
            
            <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-xs space-y-2 text-amber-900">
              <p className="font-bold text-amber-950 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-700" />
                Détails du programme disponibles :
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {formation.program.slice(0, 3).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <p className="pt-1 text-[11px] text-amber-800 italic">
                {formation.nextSessionDate}
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Votre nom (facultatif pour préremplir le message)
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={participantName}
                  onChange={(e) => setParticipantName(e.target.value)}
                  placeholder="Ex: Marc, Ferme de l'Est"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-black py-3.5 px-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-base active:scale-[0.98]"
              >
                <HelpCircle className="w-5 h-5" />
                <span>RECEVOIR LES INFOS COMPLÈTES SUR WHATSAPP</span>
              </button>
              <p className="text-center text-[11px] text-gray-500 mt-1.5">
                Vous recevrez la brochure, le syllabus détaillé et le calendrier des sessions.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
