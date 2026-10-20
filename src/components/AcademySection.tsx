import React from 'react';
import { Formation } from '../types';
import { NUTRIGOMA_PHONE, buildWhatsAppUrl } from '../utils/whatsapp';
import { 
  GraduationCap, 
  HelpCircle, 
  ArrowLeft, 
  CheckCircle, 
  Award, 
  BookOpen, 
  Calendar, 
  Users, 
  Clock,
  Sparkles
} from 'lucide-react';

interface AcademySectionProps {
  formations: Formation[];
  onRegisterFormation: (formation: Formation) => void;
  onAskInformation: (formation: Formation) => void;
  onBackToHome: () => void;
}

export const AcademySection: React.FC<AcademySectionProps> = ({
  formations,
  onRegisterFormation,
  onAskInformation,
  onBackToHome,
}) => {
  const directAcademyUrl = buildWhatsAppUrl('Bonjour Sinaï Buturu, je souhaite des renseignements généraux sur le calendrier et les inscriptions à NUTRIGOMA ACADEMY.');

  return (
    <section id="formations" className="py-10 sm:py-14 bg-gray-50/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Navigation & Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            {/* Required "RETOUR À L'ACCUEIL" button */}
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-800 bg-white border border-emerald-300 hover:bg-emerald-50 px-3.5 py-1.5 rounded-xl shadow-sm transition mb-3 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-700" />
              <span>RETOUR À L'ACCUEIL</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl">🎓</span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                3. FORMATIONS NUTRIGOMA ACADEMY
              </h2>
            </div>
            <p className="text-sm text-gray-600 mt-1 max-w-2xl">
              Transmettre le savoir-faire pratique : apprenez à formuler vos aliments, conduire vos presses à granulés et rentabiliser votre élevage avec les méthodes approuvées de Sinaï Buturu.
            </p>
          </div>

          <div className="bg-amber-400 text-black p-3.5 rounded-2xl flex items-center gap-3 shrink-0 shadow-md">
            <div className="p-2 bg-emerald-950 text-amber-300 rounded-xl font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <p className="font-extrabold text-black">Certificat Délivré</p>
              <p className="text-emerald-950 font-semibold">Atelier pratique & suivi terrain</p>
            </div>
          </div>
        </div>

        {/* Formations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {formations.map((formation) => (
            <div
              key={formation.id}
              className="bg-white rounded-2xl border-2 border-gray-200 hover:border-amber-400/80 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col md:flex-row overflow-hidden group"
            >
              {/* Image banner on side */}
              <div className="relative md:w-5/12 h-52 md:h-auto bg-gray-100 overflow-hidden shrink-0">
                <img
                  src={formation.imageUrl}
                  alt={formation.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/70 via-black/20 to-transparent" />

                <div className="absolute top-3 left-3 bg-emerald-900/90 text-amber-300 font-extrabold text-xs px-2.5 py-1 rounded-lg border border-emerald-700 shadow-sm backdrop-blur-sm">
                  ${formation.priceUsd} USD
                </div>

                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white font-semibold bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{formation.duration}</span>
                </div>
              </div>

              {/* Information & Action Content */}
              <div className="p-5 md:w-7/12 flex-1 flex flex-col justify-between space-y-4">
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                      {formation.modulesCount} Modules Pratiques
                    </span>
                    {formation.certified && (
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                        <Award className="w-3 h-3 text-emerald-600" /> Certifié
                      </span>
                    )}
                  </div>

                  <h3 className="font-extrabold text-base sm:text-lg text-gray-900 leading-snug group-hover:text-emerald-800 transition">
                    {formation.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {formation.description}
                  </p>

                  {/* Target Audience */}
                  <div className="text-[11px] text-gray-700 bg-gray-50 p-2 rounded-lg border border-gray-100 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span><strong>Public :</strong> {formation.targetAudience}</span>
                  </div>

                  {/* Highlights from program */}
                  {formation.program && formation.program.length > 0 && (
                    <div className="space-y-1 pt-1">
                      <span className="text-[11px] font-bold text-gray-800 block">Extrait du programme :</span>
                      <ul className="text-[11px] text-gray-600 space-y-0.5">
                        {formation.program.slice(0, 2).map((prog, i) => (
                          <li key={i} className="flex items-start gap-1.5 line-clamp-1">
                            <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{prog}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <p className="text-[11px] text-amber-800 font-medium italic pt-0.5">
                    📅 {formation.nextSessionDate}
                  </p>
                </div>

                {/* TWO FUNCTIONAL BUTTONS AS SPECIFIED */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  
                  {/* Bouton 1: S'INSCRIRE À CETTE FORMATION */}
                  <button
                    type="button"
                    onClick={() => onRegisterFormation(formation)}
                    className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-extrabold py-3 px-4 rounded-xl shadow-md transition-all duration-150 flex items-center justify-center gap-2 text-xs sm:text-sm active:scale-[0.98] border border-emerald-900"
                  >
                    <GraduationCap className="w-4 h-4 text-amber-300 font-bold" />
                    <span>S’INSCRIRE À CETTE FORMATION</span>
                  </button>

                  {/* Bouton 2: DEMANDER DES INFORMATIONS */}
                  <button
                    type="button"
                    onClick={() => onAskInformation(formation)}
                    className="w-full bg-amber-400 hover:bg-amber-300 text-black font-extrabold py-2.5 px-4 rounded-xl shadow-sm transition-all duration-150 flex items-center justify-center gap-2 text-xs sm:text-sm active:scale-[0.98] border border-amber-500"
                  >
                    <HelpCircle className="w-4 h-4 font-bold text-emerald-950" />
                    <span>DEMANDER DES INFORMATIONS</span>
                  </button>

                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Section Bottom Return to Home */}
        <div className="mt-10 pt-6 border-t border-gray-200 flex justify-center">
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
