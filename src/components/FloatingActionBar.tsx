import React from 'react';
import { buildWhatsAppUrl, NUTRIGOMA_PHONE } from '../utils/whatsapp';
import { 
  MessageCircle, 
  Phone, 
  Package, 
  Wrench, 
  GraduationCap 
} from 'lucide-react';

interface FloatingActionBarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
}

export const FloatingActionBar: React.FC<FloatingActionBarProps> = ({
  activeTab,
  onNavigate,
}) => {
  const whatsappUrl = buildWhatsAppUrl('Bonjour Sinaï Buturu, je souhaite commander des aliments ou solliciter une intervention technique.');

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl px-2 py-1.5 sm:hidden">
      <div className="grid grid-cols-5 gap-1 items-center">
        
        {/* WhatsApp Fast Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-[#25D366] text-white active:scale-95 transition"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          <span className="text-[10px] font-black mt-0.5 leading-none">WhatsApp</span>
        </a>

        {/* 1. Aliments */}
        <button
          onClick={() => onNavigate('aliments')}
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition ${
            activeTab === 'aliments'
              ? 'bg-emerald-800 text-white font-bold'
              : 'text-gray-600 hover:text-emerald-800'
          }`}
        >
          <Package className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 leading-none">Aliments</span>
        </button>

        {/* 2. Machines */}
        <button
          onClick={() => onNavigate('services')}
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition ${
            activeTab === 'services'
              ? 'bg-emerald-800 text-white font-bold'
              : 'text-gray-600 hover:text-emerald-800'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 leading-none">Machines</span>
        </button>

        {/* 3. Academy */}
        <button
          onClick={() => onNavigate('formations')}
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition ${
            activeTab === 'formations'
              ? 'bg-emerald-800 text-white font-bold'
              : 'text-gray-600 hover:text-emerald-800'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 leading-none">Academy</span>
        </button>

        {/* 4. Appeler */}
        <a
          href="tel:+250796342024"
          className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-amber-400 text-black active:scale-95 transition"
        >
          <Phone className="w-4 h-4" />
          <span className="text-[10px] font-bold mt-0.5 leading-none">Appeler</span>
        </a>

      </div>
    </div>
  );
};
