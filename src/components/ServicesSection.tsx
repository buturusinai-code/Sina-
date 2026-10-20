import React from 'react';
import { MachineService } from '../types';
import { NUTRIGOMA_PHONE, buildWhatsAppUrl, NUTRIGOMA_OWNER } from '../utils/whatsapp';
import { 
  Wrench, 
  Calendar, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Cpu, 
  PhoneCall, 
  MessageCircle,
  ShieldCheck,
  Hammer
} from 'lucide-react';

interface ServicesSectionProps {
  services: MachineService[];
  onRequestService: (service: MachineService) => void;
  onBookAppointment: (serviceTitle?: string) => void;
  onBackToHome: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onRequestService,
  onBookAppointment,
  onBackToHome,
}) => {
  const directEmergencyUrl = buildWhatsAppUrl('URGENCE MACHINE : Bonjour Sinaï Buturu, j\'ai une panne bloquante sur ma presse à granulés à Goma. Pouvez-vous intervenir rapidement ?');

  return (
    <section id="services" className="py-10 sm:py-14 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Navigation & Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            {/* Required "RETOUR À L'ACCUEIL" button */}
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 px-3.5 py-1.5 rounded-xl shadow-sm transition mb-3 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-700" />
              <span>RETOUR À L'ACCUEIL</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl">⚙️</span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                2. ENTRETIEN ET RÉPARATION DES MACHINES À GRANULÉS
              </h2>
            </div>
            <p className="text-sm text-gray-600 mt-1 max-w-2xl">
              Interventions de pointe menées par le <strong>Technicien Supérieur Sinaï Buturu</strong>. Révision, dépannage, usinage, pièces de rechange et optimisation de rendement pour provenderies.
            </p>
          </div>

          {/* Emergency Hotline Box */}
          <div className="bg-red-50 border border-red-200 p-3.5 rounded-2xl flex items-center gap-3 shrink-0 shadow-sm">
            <div className="p-2 bg-red-600 text-white rounded-xl font-bold animate-pulse">
              <Hammer className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <p className="font-extrabold text-red-900">Urgence Arrêt de Presse</p>
              <a
                href={directEmergencyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-700 font-bold hover:underline flex items-center gap-1"
              >
                <span>Dépannage prioritaire</span>
                <MessageCircle className="w-3 h-3 text-[#25D366]" />
              </a>
            </div>
          </div>
        </div>

        {/* Technician Guarantee Card */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-black text-white p-5 rounded-2xl mb-8 flex flex-col md:flex-row items-center justify-between gap-4 border border-emerald-700/60 shadow-lg">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-400 text-black font-black text-lg flex items-center justify-center shrink-0 border-2 border-white">
              SB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg text-white">
                  {NUTRIGOMA_OWNER} — Technicien Supérieur
                </h3>
                <span className="bg-amber-400 text-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Expert Provenderie
                </span>
              </div>
              <p className="text-xs text-emerald-200 mt-0.5">
                Spécialiste agréé des filières plates et annulaires • Diagnostic au millième • Interventions à Goma et environs.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={() => onBookAppointment()}
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-black font-extrabold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Prendre RDV avec Sinaï Buturu</span>
            </button>
            <a
              href="tel:+250796342024"
              className="inline-flex items-center justify-center p-2.5 bg-emerald-800 hover:bg-emerald-700 text-emerald-100 rounded-xl transition border border-emerald-600"
              title="Appeler"
            >
              <PhoneCall className="w-4 h-4 text-amber-300" />
            </a>
          </div>
        </div>

        {/* 7 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border-2 border-gray-200 hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col overflow-hidden group"
            >
              {/* Service Image Banner */}
              <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Badge Number & Name */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-lg bg-amber-400 text-black text-xs font-black flex items-center justify-center shadow-md">
                    {index + 1}
                  </span>
                  <span className="bg-emerald-900/90 text-amber-300 font-bold text-[11px] px-2.5 py-0.5 rounded-md backdrop-blur-sm border border-emerald-700">
                    {service.badge}
                  </span>
                </div>

                {/* Delay Pill */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] text-emerald-200 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>{service.estimatedDelay}</span>
                </div>
              </div>

              {/* Service Info Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                
                <div className="space-y-2.5">
                  <h3 className="font-extrabold text-base sm:text-lg text-gray-900 group-hover:text-emerald-800 transition leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Included Work Details */}
                  {service.details && service.details.length > 0 && (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 space-y-1.5 text-[11px]">
                      <span className="font-bold text-gray-800 block text-[11px] flex items-center gap-1">
                        <Cpu className="w-3 h-3 text-emerald-700" /> Ce qui est inclus :
                      </span>
                      <ul className="space-y-1 text-gray-600">
                        {service.details.slice(0, 3).map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Machine applicability */}
                  {service.commonMachines && service.commonMachines.length > 0 && (
                    <div className="text-[11px] text-gray-500">
                      <span className="font-semibold text-gray-700">Machines : </span>
                      {service.commonMachines.join(' • ')}
                    </div>
                  )}
                </div>

                {/* TWO FUNCTIONAL BUTTONS AS SPECIFIED */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  
                  {/* Bouton 1: DEMANDER CE SERVICE */}
                  <button
                    type="button"
                    onClick={() => onRequestService(service)}
                    className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-extrabold py-3 px-4 rounded-xl shadow-md transition-all duration-150 flex items-center justify-center gap-2 text-xs sm:text-sm active:scale-[0.98] border border-emerald-900"
                  >
                    <Wrench className="w-4 h-4 text-amber-300 font-bold" />
                    <span>DEMANDER CE SERVICE</span>
                  </button>

                  {/* Bouton 2: PRENDRE RENDEZ-VOUS AVEC SINAÏ BUTURU */}
                  <button
                    type="button"
                    onClick={() => onBookAppointment(service.title)}
                    className="w-full bg-amber-400 hover:bg-amber-300 text-black font-extrabold py-2.5 px-4 rounded-xl shadow-sm transition-all duration-150 flex items-center justify-center gap-2 text-xs sm:text-sm active:scale-[0.98] border border-amber-500"
                  >
                    <Calendar className="w-4 h-4 font-bold text-emerald-950" />
                    <span>PRENDRE RENDEZ-VOUS (RDV)</span>
                  </button>

                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Bottom Return to Home */}
        <div className="mt-10 pt-6 border-t border-gray-200 flex justify-center">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 font-bold text-sm text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-400 px-5 py-2.5 rounded-xl shadow-sm transition active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETOUR À L'ACCUEIL</span>
          </button>
        </div>

      </div>
    </section>
  );
};
