import React from 'react';
import { 
  NUTRIGOMA_PHONE, 
  buildWhatsAppUrl, 
  NUTRIGOMA_OWNER, 
  NUTRIGOMA_TITLE 
} from '../utils/whatsapp';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ArrowLeft, 
  Calendar, 
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';

interface ContactSectionProps {
  onBackToHome: () => void;
  onBookAppointment: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onBackToHome,
  onBookAppointment,
}) => {
  const [copied, setCopied] = React.useState(false);
  const generalWhatsAppUrl = buildWhatsAppUrl('Bonjour Technicien Supérieur Sinaï Buturu, je vous contacte au sujet de NUTRIGOMA BUSINESS.');

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+250 796 342 024');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-10 sm:py-16 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Navigation & Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 px-3.5 py-1.5 rounded-xl shadow-sm transition mb-3 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-700" />
              <span>RETOUR À L'ACCUEIL</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl">📲</span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                4. CONTACT WHATSAPP OFFICIEL & COORDONNÉES
              </h2>
            </div>
            <p className="text-sm text-gray-600 mt-1 max-w-2xl">
              Tous vos messages, commandes d’aliments, demandes d’intervention sur machines et inscriptions aux formations sont centralisés directement auprès de Sinaï Buturu.
            </p>
          </div>
        </div>

        {/* Official Contact Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main ID Card */}
          <div className="lg:col-span-7 bg-gradient-to-br from-emerald-950 via-emerald-900 to-black text-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-emerald-700/60 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative space-y-6">
              
              {/* Brand Header */}
              <div className="flex items-center justify-between border-b border-emerald-800/80 pb-4">
                <div>
                  <span className="text-amber-400 font-black text-xl sm:text-2xl tracking-tight block">
                    NUTRIGOMA BUSINESS
                  </span>
                  <span className="text-xs text-emerald-200">
                    Aliments Volailles • Maintenance Provenderie • Academy
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-400 text-black font-black text-xl flex items-center justify-center shadow-md">
                  NB
                </div>
              </div>

              {/* Owner Profile */}
              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                  Responsable Technique & Direction
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {NUTRIGOMA_OWNER}
                </h3>
                <p className="text-sm text-emerald-200 font-medium">
                  {NUTRIGOMA_TITLE} en Mécanique de Provenderie & Nutrition Animale
                </p>
              </div>

              {/* Official Phone Number Highlight */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/20 space-y-3">
                <span className="text-xs text-emerald-200 font-semibold block">
                  Numéro Professionnel & Ligne WhatsApp Officielle :
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-2xl sm:text-3xl font-mono font-black text-amber-300 tracking-wider">
                    {NUTRIGOMA_PHONE}
                  </div>
                  <button
                    onClick={handleCopyPhone}
                    className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/15 hover:bg-white/25 px-3 py-2 rounded-xl transition text-white"
                  >
                    {copied ? <Check className="w-4 h-4 text-amber-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copié !' : 'Copier le numéro'}</span>
                  </button>
                </div>
                <p className="text-xs text-emerald-200/90">
                  Lien direct WhatsApp : <code className="bg-black/30 px-1.5 py-0.5 rounded text-amber-300 font-mono">https://wa.me/250796342024</code>
                </p>
              </div>

              {/* Direct Buttons on Contact card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href={generalWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold py-3.5 px-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm active:scale-95"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Démarrer un Chat WhatsApp</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <a
                  href="tel:+250796342024"
                  className="bg-amber-400 hover:bg-amber-300 text-black font-extrabold py-3.5 px-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm active:scale-95"
                >
                  <Phone className="w-5 h-5" />
                  <span>Appeler Directement</span>
                </a>
              </div>

              {/* Trust statement */}
              <div className="flex items-center gap-2 text-xs text-emerald-300 pt-1">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  Tous les prix, disponibilités et rendez-vous sont formellement confirmés par NUTRIGOMA BUSINESS.
                </span>
              </div>

            </div>
          </div>

          {/* Practical Info & Operational Hub */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Location & Depot */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <MapPin className="w-5 h-5 text-emerald-700" />
                <span>Localisation du Dépôt & Atelier</span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                <strong>Ville de Goma, Nord-Kivu, RD Congo</strong><br />
                Proximité immédiate avec les axes de transport vers Sake, Masisi, Rutshuru et la frontière de Gisenyi / Rubavu (Rwanda).
              </p>
              <div className="text-xs text-gray-600 bg-white p-3 rounded-xl border border-gray-200 space-y-1">
                <p>📍 <strong>Retrait direct :</strong> Possible à notre dépôt pour économiser les frais de transport.</p>
                <p>🚚 <strong>Livraisons :</strong> Flotte de motos et camionnettes pour livraison rapide à votre ferme.</p>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <Clock className="w-5 h-5 text-emerald-700" />
                <span>Horaires d'Ouverture & Assistance</span>
              </div>
              <div className="text-xs text-gray-700 space-y-2">
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="font-medium">Lundi – Samedi :</span>
                  <span className="font-bold text-gray-900">07h30 – 18h30</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="font-medium">Dimanche :</span>
                  <span className="font-bold text-emerald-800">Permanence technique & Urgences</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium">Support WhatsApp :</span>
                  <span className="font-bold text-[#25D366]">7j / 7 (Réactif)</span>
                </div>
              </div>
            </div>

            {/* Book Appointment CTA */}
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-5 space-y-2">
              <h4 className="font-bold text-sm text-emerald-950 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-700" />
                Prendre Rendez-vous sur Place
              </h4>
              <p className="text-xs text-emerald-800">
                Vous souhaitez faire examiner votre installation de provenderie ou discuter d'un contrat de fourniture en gros ?
              </p>
              <button
                onClick={onBookAppointment}
                className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition shadow-sm"
              >
                Demander un rendez-vous avec Sinaï Buturu
              </button>
            </div>

          </div>

        </div>

        {/* Return to Home */}
        <div className="mt-12 pt-6 border-t border-gray-200 flex justify-center">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 font-bold text-sm text-emerald-800 bg-white hover:bg-emerald-50 border border-emerald-400 px-5 py-2.5 rounded-xl shadow-sm transition active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETOUR À L'ACCUEIL</span>
          </button>
        </div>

      </div>
    </section>
  );
};
