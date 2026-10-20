import React from 'react';
import { NUTRIGOMA_PHONE, buildWhatsAppUrl, NUTRIGOMA_OWNER, NUTRIGOMA_TITLE } from '../utils/whatsapp';
import { 
  Package, 
  Wrench, 
  GraduationCap, 
  MessageCircle, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Clock,
  PhoneCall
} from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (tab: string) => void;
  onBookAppointment: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onBookAppointment,
}) => {
  const whatsappUrl = buildWhatsAppUrl('Bonjour Sinaï Buturu, je souhaite des informations sur vos aliments volailles et services techniques.');

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white">
      {/* Decorative background grid and glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-12 sm:pb-20">
        
        {/* Sinaï Buturu Verified Badge */}
        <div className="inline-flex items-center gap-2 bg-emerald-800/80 border border-amber-400/40 rounded-full px-3.5 py-1.5 shadow-lg backdrop-blur-sm mb-6">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-semibold text-amber-200">
            {NUTRIGOMA_OWNER} — {NUTRIGOMA_TITLE}
          </span>
          <span className="text-emerald-300 text-xs hidden sm:inline">• Goma, Nord-Kivu</span>
        </div>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-none">
              NUTRIGOMA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">
                BUSINESS
              </span>
            </h1>

            <p className="text-base sm:text-lg text-emerald-100 max-w-2xl font-normal leading-relaxed">
              Le partenaire de référence des éleveurs et provendiers à Goma et dans la région des Grands Lacs. 
              <strong> Vente d’aliments volailles complets</strong>, 
              <strong> entretien & réparation experte de machines à granulés</strong>, et 
              <strong> formations pratiques NUTRIGOMA ACADEMY</strong>.
            </p>

            {/* Core Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('aliments')}
                className="inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black px-5 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition text-sm sm:text-base active:scale-95"
              >
                <Package className="w-5 h-5 font-bold" />
                <span>COMMANDER DES ALIMENTS</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('services')}
                className="inline-flex items-center gap-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold px-5 py-3.5 rounded-xl border border-emerald-600/60 shadow-lg transition text-sm sm:text-base active:scale-95"
              >
                <Wrench className="w-5 h-5 text-amber-300" />
                <span>SERVICES MACHINES</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-4 py-3.5 rounded-xl shadow-md transition text-sm sm:text-base active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>WhatsApp : {NUTRIGOMA_PHONE}</span>
              </a>
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 text-xs text-emerald-200">
              <div className="flex items-center gap-2 bg-emerald-900/60 border border-emerald-800/80 rounded-lg p-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Aliments 100% calibrés pour chair & ponte</span>
              </div>
              <div className="flex items-center gap-2 bg-emerald-900/60 border border-emerald-800/80 rounded-lg p-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Dépannage d'urgence 7j/7 sur site</span>
              </div>
              <div className="flex items-center gap-2 bg-emerald-900/60 border border-emerald-800/80 rounded-lg p-2.5 col-span-2 sm:col-span-1">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Validation directe par Sinaï Buturu</span>
              </div>
            </div>
          </div>

          {/* Right Highlights Visual Column */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="bg-gradient-to-br from-emerald-900/90 to-emerald-950/95 border-2 border-emerald-700/50 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-emerald-800/80 pb-3 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Accès Rapide aux 3 Pôles
                </span>
                <span className="text-[11px] bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded font-mono">
                  +250 796 342 024
                </span>
              </div>

              {/* 3 Interactive Quick Cards */}
              <div className="space-y-2.5">
                
                {/* 1. Aliments */}
                <div 
                  onClick={() => onNavigate('aliments')}
                  className="group cursor-pointer bg-emerald-950/80 hover:bg-emerald-800/90 border border-emerald-800 rounded-xl p-3 flex items-center justify-between transition duration-150"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-400 text-emerald-950 flex items-center justify-center font-bold shrink-0">
                      🐔
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition">
                        Aliments Volailles
                      </h4>
                      <p className="text-[11px] text-emerald-300">
                        Démarrage, Croissance, Finition, Pondeuse, Concentrés
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-amber-300 bg-emerald-900 px-2 py-1 rounded">
                      Dès $24.5
                    </span>
                  </div>
                </div>

                {/* 2. Machines */}
                <div 
                  onClick={() => onNavigate('services')}
                  className="group cursor-pointer bg-emerald-950/80 hover:bg-emerald-800/90 border border-emerald-800 rounded-xl p-3 flex items-center justify-between transition duration-150"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-700 text-amber-300 flex items-center justify-center font-bold shrink-0">
                      ⚙️
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition">
                        Maintenance Machines à Granulés
                      </h4>
                      <p className="text-[11px] text-emerald-300">
                        7 services spécialisés par Sinaï Buturu
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-300 bg-emerald-900 px-2 py-1 rounded">
                      Expertise
                    </span>
                  </div>
                </div>

                {/* 3. Formations */}
                <div 
                  onClick={() => onNavigate('formations')}
                  className="group cursor-pointer bg-emerald-950/80 hover:bg-emerald-800/90 border border-emerald-800 rounded-xl p-3 flex items-center justify-between transition duration-150"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-500 text-black flex items-center justify-center font-bold shrink-0">
                      🎓
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition">
                        NUTRIGOMA ACADEMY
                      </h4>
                      <p className="text-[11px] text-emerald-300">
                        Formulations, presses, conduite d'élevage rentable
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-amber-300 bg-emerald-900 px-2 py-1 rounded">
                      Certifié
                    </span>
                  </div>
                </div>
              </div>

              {/* Special Appointment Trigger Box */}
              <div className="mt-3 pt-3 border-t border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 bg-black/30 p-2.5 rounded-xl">
                <div className="text-xs text-left">
                  <span className="font-bold text-amber-300 block">Besoin d'un audit de vos machines ?</span>
                  <span className="text-[11px] text-gray-300">Prenez RDV direct avec le Technicien Sinaï Buturu.</span>
                </div>
                <button
                  onClick={onBookAppointment}
                  className="w-full sm:w-auto text-xs font-bold bg-amber-400 hover:bg-amber-300 text-black px-3 py-2 rounded-lg transition shrink-0 flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Prendre RDV</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
