import React, { useState } from 'react';
import { useAppContext } from '../services/AppContext';
import { GlassCard } from './ui/GlassCard';
import { Badge } from './ui/Badge';
import { Search, Filter, MoreVertical, Edit2, Trash2, CheckSquare } from 'lucide-react';
import { Reservation } from '../types';

export const Reservations: React.FC = () => {
  const { reservations, updateReservation } = useAppContext();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReservations = reservations.filter(res => {
    const matchesStatus = filterStatus === 'all' || res.status === filterStatus;
    const matchesSearch = res.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = (id: string, newStatus: Reservation['status']) => {
    const res = reservations.find(r => r.id === id);
    if (res) updateReservation({ ...res, status: newStatus });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Reservations</h1>
          <p className="text-slate-400 mt-1">Manage bookings and table assignments</p>
        </div>
      </div>

      <GlassCard className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Search by name..."
            className="w-full bg-slate-900/50 border border-slate-700 text-white pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          {['all', 'confirmed', 'pending', 'cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                filterStatus === status 
                  ? 'bg-white/10 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </GlassCard>

      <div className="glass-panel rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/5 text-slate-400 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Date & Time</th>
              <th className="px-6 py-4">Party Size</th>
              <th className="px-6 py-4">Table</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredReservations.length === 0 ? (
               <tr>
                 <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                   No reservations found matching your criteria.
                 </td>
               </tr>
            ) : (
              filteredReservations.map((res) => (
                <tr key={res.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-sm">
                        {res.customerName.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="font-medium text-slate-200">{res.customerName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    <div className="flex flex-col">
                      <span className="text-slate-200">{res.date}</span>
                      <span className="text-xs">{res.time}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{res.partySize} ppl</td>
                  <td className="px-6 py-4">
                     {res.tableNumber ? (
                       <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-xs font-mono">T-{res.tableNumber}</span>
                     ) : (
                       <span className="text-slate-600 text-xs italic">Unassigned</span>
                     )}
                  </td>
                  <td className="px-6 py-4">
                    <Badge status={res.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {res.status !== 'completed' && res.status !== 'cancelled' && (
                        <button 
                          title="Mark Complete"
                          onClick={() => handleStatusChange(res.id, 'completed')}
                          className="p-2 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-400 rounded-lg transition-colors"
                        >
                          <CheckSquare size={16} />
                        </button>
                      )}
                      <button className="p-2 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button 
                         title="Cancel"
                         onClick={() => handleStatusChange(res.id, 'cancelled')}
                         className="p-2 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};