import React from 'react';
import { useAppContext } from '../services/AppContext';
import { GlassCard } from './ui/GlassCard';
import { Search, Mail, Phone, Calendar, Star } from 'lucide-react';

export const Customers: React.FC = () => {
  const { customers } = useAppContext();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Customers</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search database..." 
            className="bg-slate-900/50 border border-slate-700 text-white pl-9 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map(customer => (
          <GlassCard key={customer.id} hoverEffect className="group flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${customer.avatarColor || 'bg-slate-700'} flex items-center justify-center text-white font-bold text-lg shadow-inner`}>
                  {customer.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">{customer.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-amber-400 bg-amber-500/10 w-fit px-2 py-0.5 rounded-full mt-1">
                    <Star size={10} fill="currentColor" />
                    <span>{customer.visits} visits</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Mail size={14} />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Phone size={14} />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Calendar size={14} />
                <span>Last visit: {customer.lastVisit}</span>
              </div>
            </div>

            {customer.notes && (
              <div className="bg-slate-900/50 p-3 rounded-lg text-xs text-slate-400 italic mt-auto border border-white/5">
                "{customer.notes}"
              </div>
            )}

            <button className="w-full mt-2 py-2 text-sm font-medium text-indigo-300 hover:text-white hover:bg-indigo-500/20 rounded-lg transition-colors border border-dashed border-indigo-500/30 hover:border-transparent">
              View History
            </button>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};