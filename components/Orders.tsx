import React from 'react';
import { useAppContext } from '../services/AppContext';
import { Search, Plus, ChevronDown, List, LayoutGrid, Maximize2, MoveUpRight } from 'lucide-react';

export const Orders: React.FC = () => {
  const { orders } = useAppContext();

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold text-gray-900">Order list</h1>
          
          <div className="flex bg-gray-100 rounded-lg p-1">
             <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded">
                <List size={18} />
             </button>
             <button className="p-1.5 bg-white text-gray-800 shadow-sm rounded">
                <LayoutGrid size={18} />
             </button>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
             <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                Sort by <ChevronDown size={14} />
             </button>
             <button className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-sm font-medium hover:bg-emerald-100 transition-colors whitespace-nowrap">
                <Plus size={16} /> Add new
             </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {orders.map((order) => {
            const isCompleted = order.status === 'Completed';
            
            return (
                <div key={order.id} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    
                    {/* Card Header */}
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center font-bold text-sm">
                                {order.tableNumber}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">{order.customerName}</h3>
                                <p className="text-xs text-gray-500 mt-0.5">Order {order.id}</p>
                            </div>
                        </div>
                        <span className={`px-3 py-1 rounded-md text-xs font-medium ${
                            isCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-50 text-orange-600'
                        }`}>
                            {order.status}
                        </span>
                    </div>

                    {/* Date Time */}
                    <div className="flex justify-between items-center text-xs text-gray-500 mb-6 border-b border-gray-50 pb-4">
                        <span>{order.date}</span>
                        <span>{order.time}</span>
                    </div>

                    {/* Items List */}
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-xs text-gray-400 mb-2">
                             <span>items</span>
                             <div className="flex gap-8">
                                <span>Qty</span>
                                <span className="w-12 text-right">Price</span>
                             </div>
                        </div>
                        {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm text-gray-700">
                                <span>{item.name}</span>
                                <div className="flex gap-10">
                                    <span className="w-4 text-center">{item.quantity}</span>
                                    <span className="w-12 text-right font-medium">${item.price.toFixed(2)}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Total */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100 mb-6">
                        <span className="text-sm font-medium text-gray-500">Total <span className="text-gray-400 text-xs font-normal">(before tax)</span></span>
                        <span className="text-lg font-bold text-gray-900">${order.amount.toFixed(2)}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button className="flex-1 py-2.5 px-4 bg-gray-50 rounded-lg text-sm text-gray-600 font-medium hover:bg-gray-100 transition-colors flex items-center justify-between group">
                            {order.items.length} items
                            <MoveUpRight size={14} className="text-gray-400 group-hover:text-gray-600" />
                        </button>
                        
                        {isCompleted ? (
                             <button disabled className="flex-1 py-2.5 px-4 bg-white border border-gray-100 rounded-lg text-sm text-gray-400 font-medium cursor-default">
                                Paid
                             </button>
                        ) : (
                             <button className="flex-1 py-2.5 px-4 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors shadow-sm shadow-emerald-200">
                                Pay bill
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