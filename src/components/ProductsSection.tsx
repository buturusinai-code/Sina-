import React, { useState } from 'react';
import { Product, FeedCategory } from '../types';
import { 
  ShoppingCart, 
  PhoneCall, 
  Home, 
  Search, 
  CheckCircle, 
  AlertCircle, 
  Tag, 
  Package, 
  Layers,
  ArrowLeft
} from 'lucide-react';

interface ProductsSectionProps {
  products: Product[];
  onOrderProduct: (product: Product) => void;
  onInquirePrice: (product: Product) => void;
  onBackToHome: () => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  products,
  onOrderProduct,
  onInquirePrice,
  onBackToHome,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<FeedCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: FeedCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'Tous les Aliments' },
    { id: 'demarrage', label: 'Démarrage & Pré-démarrage' },
    { id: 'croissance', label: 'Croissance Chair' },
    { id: 'finition', label: 'Finition Chair' },
    { id: 'pondeuse', label: 'Pondeuses' },
    { id: 'concentre', label: 'Concentrés & Prémix' },
  ];

  const filteredProducts = products.filter((prod) => {
    const matchesCategory = selectedCategory === 'all' || prod.category === selectedCategory;
    const matchesSearch = 
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prod.proteinPercent && prod.proteinPercent.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="aliments" className="py-10 sm:py-14 bg-gray-50/80 scroll-mt-20">
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
              <span className="text-2xl sm:text-3xl">🐔</span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                1. VENTE DES ALIMENTS POUR POULETS
              </h2>
            </div>
            <p className="text-sm text-gray-600 mt-1 max-w-2xl">
              Aliments complets formulés et ensachés pour une croissance rapide, une ponte régulière et une santé optimale de votre cheptel. Sacs de 25 kg et 50 kg disponibles à Goma.
            </p>
          </div>

          <div className="bg-emerald-900 text-white p-3 rounded-2xl flex items-center gap-3 shrink-0 shadow-md">
            <div className="p-2 bg-amber-400 text-black rounded-xl font-black text-sm">
              <Package className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-amber-300">Prix de Gros & Détail</p>
              <p className="text-emerald-100">Remise automatique dès 10 sacs</p>
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un aliment (démarrage, pondeuse, 21% protéines...)"
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            {/* Quick Count Badge */}
            <div className="text-xs font-semibold text-gray-500 self-center">
              {filteredProducts.length} aliment(s) disponible(s)
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-1 border-t border-gray-100">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs px-3.5 py-2 rounded-xl font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-800 text-white shadow'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border-2 border-gray-200 hover:border-emerald-500/60 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col overflow-hidden group"
            >
              
              {/* Product Photo & Stock Badge */}
              <div className="relative h-48 sm:h-52 w-full bg-gray-100 overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                {/* Stock Status Pill */}
                <div className="absolute top-3 left-3">
                  {product.inStock ? (
                    <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md">
                      <CheckCircle className="w-3 h-3 text-emerald-200" />
                      <span>En Stock ({product.stockQuantity} sacs)</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md">
                      <AlertCircle className="w-3 h-3 text-red-200" />
                      <span>Rupture temporaire</span>
                    </span>
                  )}
                </div>

                {/* Bag Weight Pill */}
                <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-sm text-amber-300 font-extrabold text-xs px-2.5 py-1 rounded-lg border border-amber-400/40 shadow-sm">
                  Sac de {product.bagWeightKg} kg
                </div>

                {/* Protein / Age Pill if available */}
                {product.proteinPercent && (
                  <div className="absolute bottom-3 left-3 bg-emerald-950/80 text-white text-[11px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                    {product.proteinPercent}
                  </div>
                )}
              </div>

              {/* Product Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-extrabold text-base sm:text-lg text-gray-900 leading-snug group-hover:text-emerald-800 transition">
                      {product.name}
                    </h3>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {product.description}
                  </p>

                  {/* Target Age / Composition Summary */}
                  {product.targetAge && (
                    <div className="text-[11px] font-semibold text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-lg">
                      🎯 Cible : {product.targetAge}
                    </div>
                  )}

                  {/* Key Benefits List */}
                  {product.benefits && product.benefits.length > 0 && (
                    <ul className="text-[11px] text-gray-600 space-y-1 pt-1">
                      {product.benefits.slice(0, 2).map((benefit, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span className="line-clamp-1">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Price Matrix Box (Prix du sac, Détail & Gros) */}
                <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 font-medium">Prix de détail (1 sac) :</span>
                    <span className="text-base font-extrabold text-gray-900">
                      ${product.retailPriceUsd} <span className="text-[11px] font-normal text-gray-500">USD</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs border-t border-amber-200/80 pt-1.5">
                    <span className="text-amber-900 font-bold flex items-center gap-1">
                      <Tag className="w-3 h-3 text-amber-600" /> Prix de gros (≥{product.wholesaleMinBags} sacs) :
                    </span>
                    <span className="text-base font-black text-emerald-800">
                      ${product.wholesalePriceUsd} <span className="text-[11px] font-normal text-gray-500">USD/sac</span>
                    </span>
                  </div>
                </div>

                {/* TWO FUNCTIONAL BUTTONS AS REQUESTED */}
                <div className="space-y-2 pt-1">
                  
                  {/* Bouton 1: COMMANDER CET ALIMENT */}
                  <button
                    type="button"
                    onClick={() => onOrderProduct(product)}
                    className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-extrabold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center gap-2 text-sm active:scale-[0.98] border border-emerald-900"
                  >
                    <ShoppingCart className="w-4 h-4 text-amber-400 font-bold" />
                    <span>COMMANDER CET ALIMENT</span>
                  </button>

                  {/* Bouton 2: DEMANDER LE PRIX / NÉGOCIER */}
                  <button
                    type="button"
                    onClick={() => onInquirePrice(product)}
                    className="w-full bg-amber-400 hover:bg-amber-300 text-black font-extrabold py-2.5 px-4 rounded-xl shadow-sm transition-all duration-150 flex items-center justify-center gap-2 text-xs sm:text-sm active:scale-[0.98] border border-amber-500"
                  >
                    <PhoneCall className="w-4 h-4 font-bold text-emerald-950" />
                    <span>DEMANDER LE PRIX (WHATSAPP)</span>
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
