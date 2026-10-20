import React, { useState } from 'react';
import { NUTRIGOMA_PHONE, buildWhatsAppUrl } from '../utils/whatsapp';
import { 
  Phone, 
  Menu, 
  X, 
  Lock, 
  MessageCircle, 
  Wrench, 
  GraduationCap, 
  Sparkles,
  Home,
  CheckCircle2,
  Package
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdminLoggedIn: boolean;
  onOpenAdmin: () => void;
  ordersCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isAdminLoggedIn,
  onOpenAdmin,
  ordersCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'accueil', label: 'Accueil', icon: Home },
    { id: 'aliments', label: 'Aliments Volailles', icon: Package, badge: 'Stock dispo' },
    { id: 'services', label: 'Machines & Entretien', icon: Wrench, badge: '7 services' },
    { id: 'formations', label: 'NUTRIGOMA Academy', icon: GraduationCap },
    { id: 'contact', label: 'Contact WhatsApp', icon: Phone },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const directWhatsAppUrl = buildWhatsAppUrl('Bonjour Sinaï Buturu, je vous contacte depuis le site NUTRIGOMA BUSINESS.');

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-900/10 shadow-sm">
      {/* Top Notification Strip */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-black text-white text-xs py-1.5 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="inline-flex items-center gap-1 bg-amber-400 text-black font-extrabold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3 h-3" /> NUTRIGOMA BUSINESS
            </span>
            <span className="text-gray-200 text-[11px] sm:text-xs">
              Propriétaire & Technicien Supérieur : <strong>Sinaï Buturu</strong> | Dépôt & Atelier à Goma
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:+250796342024"
              className="inline-flex items-center gap-1 text-emerald-200 hover:text-white transition font-medium"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>{NUTRIGOMA_PHONE}</span>
            </a>
            <span className="text-emerald-700 hidden sm:inline">|</span>
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 font-bold"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & Title */}
          <button
            onClick={() => handleNavClick('accueil')}
            className="flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-950 p-0.5 shadow-md flex items-center justify-center shrink-0 border-2 border-amber-400 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-emerald-900 rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <span className="text-amber-400 font-black text-xl tracking-tighter">NB</span>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center text-[8px] font-black text-black">
                  ⚙️
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-xl font-black tracking-tight text-gray-900 group-hover:text-emerald-800 transition">
                  NUTRIGOMA <span className="text-amber-600">BUSINESS</span>
                </span>
                <span className="hidden md:inline-flex items-center gap-0.5 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                  <CheckCircle2 className="w-2.5 h-2.5" /> Goma
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-500 font-medium line-clamp-1">
                Aliments Volailles • Machines à Granulés • Formations
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'text-gray-700 hover:text-emerald-800 hover:bg-emerald-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-emerald-700'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                      isActive ? 'bg-amber-400 text-black' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* WhatsApp CTA Button */}
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-md hover:shadow-lg transition active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span className="hidden sm:inline">WhatsApp</span>
              <span className="text-[11px] opacity-90 hidden xl:inline">+250 796 342 024</span>
            </a>

            {/* Admin Access Button */}
            <button
              onClick={onOpenAdmin}
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-bold border transition ${
                activeTab === 'admin'
                  ? 'bg-amber-500 text-black border-amber-600 shadow'
                  : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
              }`}
              title="Espace Administrateur Sinaï Buturu"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Admin</span>
              {ordersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {ordersCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-emerald-50 hover:text-emerald-900 focus:outline-none"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 py-3 space-y-1 shadow-xl animate-in slide-in-from-top-3 duration-200">
          <div className="p-2 mb-2 bg-emerald-50 rounded-lg text-xs text-emerald-900 flex items-center justify-between">
            <span>Sinaï Buturu (Technicien Supérieur)</span>
            <a href="tel:+250796342024" className="font-bold text-emerald-800 underline">
              Appeler
            </a>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold ${
                  isActive ? 'bg-emerald-800 text-white' : 'text-gray-800 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-emerald-700'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-amber-400 text-black' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-gray-100">
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200"
            >
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-700" />
                <span>🔐 Espace Administrateur Sinaï Buturu</span>
              </div>
              {ordersCount > 0 && (
                <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {ordersCount}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
