import React, { useState } from 'react';
import { useAppContext } from '../services/AppContext';
import { Reservation, Customer } from '../types';
import { Search, ChevronDown, MoreVertical, Phone, Mail, User, Clock, Plus } from 'lucide-react';

// Helper component for Table graphics
const TableGraphic: React.FC<{ type: 'round' | 'square' | 'long'; seats: number }> = ({ type, seats }) => {
  const strokeColor = "#10B981"; // Emerald-500

  if (type === 'round') {
    return (
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="16" stroke={strokeColor} strokeWidth="1.5" />
        {/* Chairs */}
        <path d="M30 6C30 6 34 10 30 10C26 10 30 6 30 6Z" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round"/> 
        <circle cx="30" cy="8" r="4" stroke={strokeColor} strokeWidth="1.5" />
        <circle cx="52" cy="30" r="4" stroke={strokeColor} strokeWidth="1.5" />
        <circle cx="30" cy="52" r="4" stroke={strokeColor} strokeWidth="1.5" />
        <circle cx="8" cy="30" r="4" stroke={strokeColor} strokeWidth="1.5" />
        {seats > 4 && <circle cx="46" cy="14" r="4" stroke={strokeColor} strokeWidth="1.5" />}
      </svg>
    );
  }

  if (type === 'long') {
    return (
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
         <rect x="20" y="10" width="20" height="40" rx="2" stroke={strokeColor} strokeWidth="1.5" />
         {/* Chairs Left */}
         <path d="M14 16h-4a2 2 0 01-2-2v-2a2 2 0 012-2h4" stroke={strokeColor} strokeWidth="1.5"/>
         <path d="M14 32h-4a2 2 0 01-2-2v-2a2 2 0 012-2h4" stroke={strokeColor} strokeWidth="1.5"/>
         <path d="M14 48h-4a2 2 0 01-2-2v-2a2 2 0 012-2h4" stroke={strokeColor} strokeWidth="1.5"/>
         {/* Chairs Right */}
         <path d="M46 16h4a2 2 0 002-2v-2a2 2 0 00-2-2h-4" stroke={strokeColor} strokeWidth="1.5"/>
         <path d="M46 32h4a2 2 0 002-2v-2a2 2 0 00-2-2h-4" stroke={strokeColor} strokeWidth="1.5"/>
         <path d="M46 48h4a2 2 0 002-2v-2a2 2 0 00-2-2h-4" stroke={strokeColor} strokeWidth="1.5"/>
      </svg>
    );
  }

  // Square (Default)
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
       <rect x="18" y="18" width="24" height="24" rx="2" stroke={strokeColor} strokeWidth="1.5" />
       {/* Chairs */}
       <path d="M12 24v12" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round"/>
       <rect x="8" y="20" width="6" height="20" rx="3" stroke={strokeColor} strokeWidth="1.5" />
       
       <rect x="46" y="20" width="6" height="20" rx="3" stroke={strokeColor} strokeWidth="1.5" />
       
       <rect x="20" y="8" width="20" height="6" rx="3" stroke={strokeColor} strokeWidth="1.5" />
       
       <rect x="20" y="46" width="20" height="6" rx="3" stroke={strokeColor} strokeWidth="1.5" />
    </svg>
  );
};

export const Reservations: React.FC = () => {
  const { reservations, customers, updateReservation } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');

  // Helper to get customer details
  const getCustomer = (id: string) => customers.find(c => c.id === id) || customers.find(c => c.name === id); // Fallback to name match for mock data

  const filteredReservations = reservations.filter(res => 
    res.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-orange-50 text-orange-600';
      case 'confirmed': return 'bg-emerald-50 text-emerald-600';
      case 'completed': return 'bg-blue-50 text-blue-600';
      case 'cancelled': return 'bg-red-50 text-red-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const getStatusLabel = (status: string) => {
      if (status === 'pending') return 'Incoming';
      return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getTableType = (partySize: number, index: number): 'round' | 'square' | 'long' => {
      if (partySize > 5) return 'long';
      return index % 2 === 0 ? 'round' : 'square';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold text-gray-900">Reservation</h1>
            <div className="relative">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-200 transition-colors">
                    Sort by <ChevronDown size={14} />
                </button>
            </div>
        </div>
        
        <div className="relative w-full sm:w-64">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
             <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
             />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        
        {/* Create Reservation Card */}
        <div className="border-2 border-dashed border-emerald-500/30 bg-emerald-50/10 rounded-xl p-6 flex flex-col items-center justify-center min-h-[300px] hover:bg-emerald-50/30 transition-colors cursor-pointer group">
            <div className="mb-6 relative">
                 {/* Service Bell Illustration Placeholder */}
                 <div className="w-24 h-24 relative flex items-center justify-center">
                     <div className="w-20 h-10 bg-amber-400 rounded-t-full absolute top-6 z-10"></div>
                     <div className="w-4 h-4 bg-amber-300 rounded-full absolute top-4 z-0"></div>
                     <div className="w-24 h-4 bg-emerald-600 rounded-full absolute bottom-8 z-20"></div>
                 </div>
            </div>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-emerald-500 text-emerald-600 rounded-lg font-medium shadow-sm hover:bg-emerald-50 transition-all group-hover:scale-105">
                Create reservation <Plus size={18} />
            </button>
        </div>

        {/* Reservation Cards */}
        {filteredReservations.map((res, idx) => {
            const customer = getCustomer(res.customerId) || { 
                email: 'guest@example.com', 
                phone: '(555) 000-0000', 
                avatarColor: 'bg-emerald-100 text-emerald-600'
            };
            const isIncoming = res.status === 'pending';
            const isConfirmed = res.status === 'confirmed';
            const isCompleted = res.status === 'completed';

            return (
                <div key={res.id} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[300px]">
                    
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                        <span className={`px-3 py-1 rounded-md text-xs font-semibold ${getStatusColor(res.status)}`}>
                            {getStatusLabel(res.status)}
                        </span>
                        <div className="flex items-center gap-2">
                            <button className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded border border-gray-100 text-xs font-medium text-gray-600 hover:bg-gray-100">
                                {res.tableNumber ? `A-${res.tableNumber}` : 'TBD'} <ChevronDown size={12} />
                            </button>
                            <button className="text-gray-400 hover:text-gray-600">
                                <MoreVertical size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex gap-4 mb-6">
                        <div className="flex-1 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${customer.avatarColor}`}>
                                    {res.customerName.charAt(0)}
                                </div>
                                <h3 className="font-bold text-gray-900 line-clamp-1">{res.customerName}</h3>
                            </div>
                            
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                    <Phone size={14} />
                                    <span>{customer.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                    <Mail size={14} />
                                    <span className="truncate max-w-[140px]">{customer.email}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-3 border-l border-gray-50 pl-4">
                            <TableGraphic type={getTableType(res.partySize, idx)} seats={res.partySize} />
                            <div className="space-y-1 text-center">
                                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700">
                                    <User size={12} />
                                    <span>{res.partySize} persons</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700">
                                    <Clock size={12} />
                                    <span>{res.time}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex gap-3 mt-auto">
                        {isIncoming && (
                            <>
                                <button 
                                    onClick={() => updateReservation({...res, status: 'confirmed', tableNumber: '1'})}
                                    className="flex-1 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors shadow-sm shadow-emerald-200"
                                >
                                    Confirm
                                </button>
                                <button 
                                    onClick={() => updateReservation({...res, status: 'cancelled'})}
                                    className="flex-1 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                            </>
                        )}

                        {isConfirmed && (
                            <button className="w-full py-2 bg-white border border-emerald-500 text-emerald-600 rounded-lg text-sm font-medium hover:bg-emerald-50 transition-colors">
                                Create order
                            </button>
                        )}

                        {isCompleted && (
                            <button disabled className="w-full py-2 bg-gray-50 border border-gray-100 text-gray-400 rounded-lg text-sm font-medium cursor-default">
                                Paid
                            </button>
                        )}
                        
                        {res.status === 'cancelled' && (
                             <button disabled className="w-full py-2 bg-red-50 border border-red-100 text-red-400 rounded-lg text-sm font-medium cursor-default">
                                Cancelled
                            </button>
                        )}
                    </div>
                </div>
            );
        })}
      </div>
    </div>
  );
};