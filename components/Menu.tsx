import React, { useState } from 'react';
import { useAppContext } from '../services/AppContext';
import { Search, Plus, Star, MoreHorizontal, Edit2 } from 'lucide-react';

const CATEGORIES = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks'];

export const Menu: React.FC = () => {
  const { menu } = useAppContext();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMenu = menu.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
        <div className="flex gap-3 w-full sm:w-auto">
             <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Search item..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
            </div>
             <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors shadow-sm shadow-emerald-200 whitespace-nowrap">
                <Plus size={16} /> Add Item
             </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-6 overflow-x-auto pb-1">
            {CATEGORIES.map(cat => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`pb-3 text-sm font-medium transition-colors relative whitespace-nowrap ${
                        activeCategory === cat ? 'text-emerald-600' : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    {cat}
                    {activeCategory === cat && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 rounded-t-full" />
                    )}
                </button>
            ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
         {filteredMenu.map(item => (
             <div key={item.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                <div className="h-48 overflow-hidden relative">
                    <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3">
                         <span className={`px-2 py-1 rounded text-xs font-semibold shadow-sm backdrop-blur-md ${
                             item.available ? 'bg-emerald-500/90 text-white' : 'bg-gray-900/80 text-white'
                         }`}>
                             {item.available ? 'In Stock' : 'Sold Out'}
                         </span>
                    </div>
                </div>
                
                <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                        <span className="font-bold text-emerald-600">${item.price.toFixed(2)}</span>
                    </div>
                    
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10">
                        {item.description}
                    </p>

                    <div className="flex items-center gap-1 mb-4 text-xs font-medium text-gray-600">
                        <Star size={12} className="text-amber-400 fill-amber-400" />
                        <span>{item.rating}</span>
                        <span className="text-gray-400">({item.reviews} reviews)</span>
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-gray-50">
                        <button className="flex-1 py-2 bg-gray-50 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-100 border border-gray-200 transition-colors flex items-center justify-center gap-2">
                            <Edit2 size={14} /> Edit
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <MoreHorizontal size={18} />
                        </button>
                    </div>
                </div>
             </div>
         ))}
      </div>
    </div>
  );
};