import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';
import { useAppContext } from '../services/AppContext';
import { GlassCard } from './ui/GlassCard'; // Now renders as white card
import { ArrowUp, ArrowDown, MoreHorizontal, Check, Plus, Filter, Download } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { reservations, orders, settings } = useAppContext();

  // Metric Data
  const metrics = [
    { label: "Today's occupancy", value: "148", change: "20.5%", trend: "up", suffix: "" },
    { label: "Available tables", value: "34", change: "50", trend: "up", suffix: "", valueColor: "text-gray-900" }, // Custom logic for static vs %
    { label: "Reservations today", value: "120", change: "10.9%", trend: "up", suffix: "" },
    { label: "Total orders", value: "250", change: "12.3%", trend: "down", suffix: "" },
  ];

  // Chart Data
  const incomeData = [
    { name: 'Mon', income: 23000 },
    { name: 'Tue', income: 18000 },
    { name: 'Wed', income: 19500 },
    { name: 'Thu', income: 16000 },
    { name: 'Fri', income: 21650 },
    { name: 'Sat', income: 16500 },
    { name: 'Sun', income: 19800 },
  ];

  const distributionData = [
    { name: 'Dine-in', value: 36079, color: '#3B82F6' }, // Blue
    { name: 'Delivery', value: 13050, color: '#10B981' }, // Green
    { name: 'Takeaway', value: 11514, color: '#F59E0B' }, // Yellow/Orange
    { name: 'Online orders', value: 8444, color: '#FCD34D' }, // Light Yellow
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          Dashboard 
          <span className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">
            <SettingsIcon />
          </span>
        </h1>
        <div className="text-sm text-gray-500">Compared week to date (31 Aug - 06 Sep).</div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, idx) => (
          <GlassCard key={idx} className="flex flex-col justify-between h-32">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{m.label}</p>
              <h3 className="text-3xl font-bold text-gray-900">{m.value}</h3>
            </div>
            <div className={`flex items-center text-xs font-semibold ${m.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
              {m.trend === 'up' ? <ArrowUp size={12} strokeWidth={3} className="mr-1" /> : <ArrowDown size={12} strokeWidth={3} className="mr-1" />}
              {m.change}
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="lg:col-span-2">
           <GlassCard className="h-[400px] flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
               <div>
                  <div className="flex gap-4 text-sm font-medium text-gray-500 mb-2">
                     <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md cursor-pointer">Total income</span>
                     <span className="hover:text-gray-800 cursor-pointer">Dine in</span>
                     <span className="hover:text-gray-800 cursor-pointer">Takeaway</span>
                     <span className="hover:text-gray-800 cursor-pointer">Delivery</span>
                     <span className="hover:text-gray-800 cursor-pointer">Online orders</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">$76,765</h3>
               </div>
               <select className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-1.5 outline-none focus:ring-1 focus:ring-emerald-500">
                <option>Week</option>
                <option>Month</option>
              </select>
            </div>
            
            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={incomeData}>
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#E5E7EB" strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9CA3AF" 
                    tick={{ fill: '#6B7280', fontSize: 12 }} 
                    axisLine={false}
                    tickLine={false}
                    dy={10}
                  />
                  <YAxis 
                    stroke="#9CA3AF" 
                    tick={{ fill: '#6B7280', fontSize: 12 }} 
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `$${value/1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    itemStyle={{ color: '#111827' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="income" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorIncome)" 
                    activeDot={{ r: 6, fill: "#3B82F6", stroke: "#fff", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
           </GlassCard>
        </div>

        {/* Donut Chart */}
        <div className="lg:col-span-1">
          <GlassCard className="h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-semibold text-gray-900">Income distribution</h3>
               <select className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg px-2 py-1 outline-none">
                <option>Week</option>
              </select>
            </div>
            
            <div className="flex-1 relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={distributionData}
                            innerRadius={60}
                            outerRadius={85}
                            paddingAngle={0}
                            dataKey="value"
                        >
                            {distributionData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                         <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                {/* Center text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-8">
                    <span className="text-xl font-bold text-gray-900">$76,765</span>
                </div>
            </div>

            <div className="space-y-3 mt-4">
                {distributionData.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full ring-2 ring-white" style={{ backgroundColor: item.color }} />
                             <span className="text-gray-600">{item.name}</span>
                        </div>
                        <div className="flex gap-4">
                            <span className="font-medium text-gray-900 w-8 text-right">{Math.round((item.value / 76765) * 100)}%</span>
                            <span className="font-medium text-gray-900 w-16 text-right">${item.value.toLocaleString()}</span>
                        </div>
                    </div>
                ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Order List */}
      <GlassCard className="overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                Order list 
                <div className="relative w-64 ml-4">
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="w-full pl-8 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                    <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                </div>
            </h3>
            <div className="flex gap-3">
                 <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                    Sort by <ArrowDown size={14} />
                 </button>
                 <button className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-sm font-medium hover:bg-emerald-100">
                    <Plus size={16} /> Add new
                 </button>
            </div>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 font-medium">
                    <tr>
                        <th className="px-4 py-3 rounded-l-lg">ID</th>
                        <th className="px-4 py-3">Date <ArrowDown size={12} className="inline ml-1"/></th>
                        <th className="px-4 py-3">Time</th>
                        <th className="px-4 py-3">Server</th>
                        <th className="px-4 py-3">Amount</th>
                        <th className="px-4 py-3">Payment</th>
                        <th className="px-4 py-3">Type</th>
                        <th className="px-4 py-3">Status <ArrowDown size={12} className="inline ml-1"/></th>
                        <th className="px-4 py-3 rounded-r-lg text-center">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-4 py-4 font-medium text-gray-900">{order.id}</td>
                            <td className="px-4 py-4 text-gray-600">{order.date}</td>
                            <td className="px-4 py-4 text-gray-600">{order.time}</td>
                            <td className="px-4 py-4 text-gray-900 font-medium">{order.server}</td>
                            <td className="px-4 py-4 text-gray-900 font-medium">${order.amount.toFixed(2)}</td>
                            <td className="px-4 py-4">
                                <span className={`px-2.5 py-1 rounded text-xs font-semibold ${
                                    order.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 
                                    order.paymentStatus === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                                }`}>
                                    {order.paymentStatus}
                                </span>
                            </td>
                            <td className="px-4 py-4 text-gray-600">{order.type}</td>
                            <td className="px-4 py-4">
                                 <span className={`px-2.5 py-1 rounded text-xs font-semibold ${
                                    order.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 
                                    (order.status === 'Cooking' || order.status === 'In progress') ? 'bg-blue-100 text-blue-700' : 
                                    order.status === 'Ready' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'
                                }`}>
                                    {order.status}
                                </span>
                            </td>
                            <td className="px-4 py-4 text-center">
                                <button className="text-gray-400 hover:text-gray-600">
                                    <MoreHorizontal size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </GlassCard>
    </div>
  );
};

// Helper for Settings Icon in Header
const SettingsIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);
