import React from 'react';
import { useAppContext } from '../services/AppContext';
import { GlassCard } from './ui/GlassCard';
import { Search, Mail, Phone, Calendar, Star, MoreVertical, Filter, Download } from 'lucide-react';

export const Customers: React.FC = () => {
  const { customers } = useAppContext();

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        
        <div className="flex gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Search customers..." 
                    className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
            </div>
            <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                <Filter size={18} />
            </button>
            <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                <Download size={18} />
            </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map(customer => (
          <GlassCard key={customer.id} hoverEffect className="group flex flex-col h-full border-gray-100">
            <div className="flex justify-between items-start mb-4">
                <div className={`w-14 h-14 rounded-full ${customer.avatarColor || 'bg-gray-100 text-gray-500'} flex items-center justify-center font-bold text-xl shadow-sm`}>
                  {customer.name.substring(0, 1).toUpperCase()}
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical size={16} />
                </button>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{customer.name}</h3>
                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                        <Star size={10} fill="currentColor" /> {customer.visits} visits
                    </span>
                    <span className="text-xs text-gray-400">• Customer since 2023</span>
                </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                    <Mail size={14} />
                </div>
                <span className="truncate">{customer.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                    <Phone size={14} />
                </div>
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                    <Calendar size={14} />
                </div>
                <span>Last visit: {customer.lastVisit}</span>
              </div>
            </div>

            {customer.notes && (
              <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-500 italic mb-6 border border-gray-100">
                "{customer.notes}"
              </div>
            )}

            <div className="mt-auto pt-4 border-t border-gray-50">
                <button className="w-full py-2 text-sm font-medium text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors border border-gray-200 hover:border-emerald-200">
                View History
                </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};