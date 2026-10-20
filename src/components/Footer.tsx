import React from 'react';
import { NUTRIGOMA_PHONE, buildWhatsAppUrl, NUTRIGOMA_OWNER, NUTRIGOMA_TITLE } from '../utils/whatsapp';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  ShieldCheck, 
  Wrench, 
  Package, 
  GraduationCap, 
  Lock,
  ArrowUp
} from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  const whatsappUrl = buildWhatsAppUrl('Bonjour Sinaï Buturu, je vous contacte depuis NUTRIGOMA BUSINESS.');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white pt-12 pb-24 sm:pb-12 border-t-4 border-amber-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-gray-800">
          
          {/* Col 1: Brand & Sinaï Buturu */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-900 border-2 border-amber-400 flex items-center justify-center font-black text-amber-300">
                NB
              </div>
              <div>
                <span className="font-black text-lg tracking-tight block">
                  NUTRIGOMA <span className="text-amber-400">BUSINESS</span>
                </span>
                <span className="text-xs text-emerald-300">Goma • Nord-Kivu • RDC</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              Entreprise spécialisée dans la provenderie moderne : vente d'aliments volailles de haute densité nutritive, dépannage mécanique de presses à granulés et formations professionnelles.
            </p>

            <div className="bg-gray-900/80 p-3 rounded-xl border border-gray-800 text-xs">
              <span className="text-amber-400 font-bold block">{NUTRIGOMA_OWNER}</span>
              <span className="text-gray-400">{NUTRIGOMA_TITLE}</span>
            </div>
          </div>

          {/* Col 2: Aliments & Produits */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-white uppercase tracking-wider flex items-center gap-2 border-b border-gray-800 pb-2">
              <Package className="w-4 h-4 text-emerald-400" />
              <span>Aliments Volailles</span>
            </h4>
            <ul className="text-xs text-gray-400 space-y-2">
              <li>
                <button onClick={() => onNavigate('aliments')} className="hover:text-amber-400 transition text-left">
                  • Aliment Démarrage & Pré-démarrage (Miettes)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('aliments')} className="hover:text-amber-400 transition text-left">
                  • Aliment Croissance Poulet de Chair (2.5mm)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('aliments')} className="hover:text-amber-400 transition text-left">
                  • Aliment Finition Haute Énergie
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('aliments')} className="hover:text-amber-400 transition text-left">
                  • Aliment Pondeuse Calci-Plus
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('aliments')} className="hover:text-amber-400 transition text-left">
                  • Concentré Protéique Volaille 5% & 10%
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Formations */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-white uppercase tracking-wider flex items-center gap-2 border-b border-gray-800 pb-2">
              <Wrench className="w-4 h-4 text-amber-400" />
              <span>Machines & Academy</span>
            </h4>
            <ul className="text-xs text-gray-400 space-y-2">
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-amber-400 transition text-left">
                  • Entretien préventif des machines à granulés
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-amber-400 transition text-left">
                  • Réparation des presses & diagnostic de panne
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-amber-400 transition text-left">
                  • Réglage de matrice & galets compresseurs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('formations')} className="hover:text-amber-400 transition text-left">
                  • NUTRIGOMA ACADEMY (Formulation & Fabrication)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('formations')} className="hover:text-amber-400 transition text-left">
                  • Formation Élevage rentable chair & pondeuses
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & WhatsApp */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-white uppercase tracking-wider flex items-center gap-2 border-b border-gray-800 pb-2">
              <Phone className="w-4 h-4 text-[#25D366]" />
              <span>Contact Officiel</span>
            </h4>

            <div className="text-xs text-gray-300 space-y-2">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+250796342024" className="font-mono hover:text-amber-300 font-bold">
                  {NUTRIGOMA_PHONE}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#25D366] font-medium"
                >
                  WhatsApp : wa.me/250796342024
                </a>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Dépôt & Atelier à Goma, Nord-Kivu, RD Congo</span>
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="w-full text-xs font-bold text-gray-400 hover:text-amber-400 bg-gray-900 border border-gray-800 p-2.5 rounded-xl transition flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Accès Espace Administrateur</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} <strong>NUTRIGOMA BUSINESS</strong> — Tous droits réservés. Dirigé par <strong>Sinaï Buturu</strong>.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400 flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> Aliments & Machines Vérifiés
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white transition"
              title="Retour en haut"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
