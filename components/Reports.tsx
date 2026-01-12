import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Legend, PieChart, Pie, Cell, ComposedChart 
} from 'recharts';
import { GlassCard } from './ui/GlassCard';
import { Download, Calendar, TrendingUp, DollarSign, Users, Clock, ChevronDown, FileText } from 'lucide-react';

// Mock Data for Reports
const MONTHLY_PERFORMANCE = [
  { name: 'Jan', revenue: 42000, target: 45000, expenses: 28000 },
  { name: 'Feb', revenue: 38000, target: 45000, expenses: 26000 },
  { name: 'Mar', revenue: 45000, target: 45000, expenses: 29000 },
  { name: 'Apr', revenue: 51000, target: 48000, expenses: 31000 },
  { name: 'May', revenue: 49000, target: 48000, expenses: 30000 },
  { name: 'Jun', revenue: 58000, target: 50000, expenses: 34000 },
  { name: 'Jul', revenue: 62000, target: 55000, expenses: 36000 },
];

const SALES_BY_CATEGORY = [
  { name: 'Starters', value: 18500, color: '#10B981' }, // Emerald
  { name: 'Mains', value: 42000, color: '#3B82F6' },   // Blue
  { name: 'Desserts', value: 12500, color: '#F59E0B' }, // Amber
  { name: 'Beverages', value: 24000, color: '#8B5CF6' }, // Violet
];

const PEAK_HOURS = [
  { time: '17:00', guests: 24 },
  { time: '18:00', guests: 45 },
  { time: '19:00', guests: 82 },
  { time: '20:00', guests: 95 },
  { time: '21:00', guests: 60 },
  { time: '22:00', guests: 35 },
];

const STAFF_PERFORMANCE = [
  { id: 1, name: 'Mark Davis', role: 'Server', tables: 142, revenue: 12500, rating: 4.9 },
  { id: 2, name: 'Sarah Smith', role: 'Server', tables: 128, revenue: 11200, rating: 4.8 },
  { id: 3, name: 'John Doe', role: 'Senior Server', tables: 115, revenue: 14800, rating: 5.0 },
  { id: 4, name: 'Emily Chen', role: 'Bartender', tables: 85, revenue: 8900, rating: 4.7 },
];

export const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState('Last 30 Days');

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
           <p className="text-gray-500 text-sm mt-1">Deep dive into your restaurant's performance metrics.</p>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm">
                <Calendar size={16} className="text-gray-400" />
                {dateRange}
                <ChevronDown size={14} className="text-gray-400" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm">
                <Download size={16} /> Export CSV
            </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Gross Revenue', value: '$286,400', change: '+12.5%', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Total Guests', value: '3,420', change: '+8.2%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Avg. Order Value', value: '$84.50', change: '-2.1%', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Avg. Table Time', value: '55m', change: 'On Target', icon: Clock, color: 'text-violet-600', bg: 'bg-violet-50' },
        ].map((kpi, idx) => (
          <GlassCard key={idx} className="p-6">
            <div className="flex justify-between items-start mb-4">
               <div className={`p-3 rounded-xl ${kpi.bg}`}>
                  <kpi.icon size={20} className={kpi.color} />
               </div>
               <span className={`text-xs font-semibold px-2 py-1 rounded-full ${kpi.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : kpi.change.startsWith('-') ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-600'}`}>
                 {kpi.change}
               </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
            <p className="text-sm text-gray-500">{kpi.label}</p>
          </GlassCard>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Revenue & Expenses */}
         <div className="lg:col-span-2">
            <GlassCard className="h-[400px] flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div>
                   <h3 className="text-lg font-bold text-gray-900">Financial Performance</h3>
                   <p className="text-sm text-gray-500">Revenue vs Target vs Expenses</p>
                </div>
                <div className="flex gap-2">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Revenue
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                         <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span> Expenses
                    </div>
                     <div className="flex items-center gap-1.5 text-xs text-gray-600">
                         <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span> Target
                    </div>
                </div>
              </div>

              <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={MONTHLY_PERFORMANCE} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={(value) => `$${value/1000}k`} />
                    <Tooltip 
                         cursor={{ fill: '#F3F4F6' }}
                         contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} 
                    />
                    <Bar dataKey="revenue" barSize={20} fill="#10B981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expenses" barSize={20} fill="#F87171" radius={[4, 4, 0, 0]} />
                    <Line type="monotone" dataKey="target" stroke="#6366F1" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
         </div>

         {/* Sales by Category */}
         <div className="lg:col-span-1">
            <GlassCard className="h-[400px] flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Sales by Category</h3>
              <div className="flex-1 relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={SALES_BY_CATEGORY}
                        innerRadius={80}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {SALES_BY_CATEGORY.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <div className="text-center">
                         <span className="block text-3xl font-bold text-gray-900">42%</span>
                         <span className="text-xs text-gray-500 uppercase tracking-wide">Mains</span>
                     </div>
                 </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                  {SALES_BY_CATEGORY.map((cat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></span>
                          <span className="flex-1">{cat.name}</span>
                          <span className="font-semibold text-gray-900">${(cat.value / 1000).toFixed(1)}k</span>
                      </div>
                  ))}
              </div>
            </GlassCard>
         </div>
      </div>

      {/* Secondary Analysis Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Peak Hours */}
          <GlassCard className="h-80 flex flex-col">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Peak Hours (Avg. Daily)</h3>
             </div>
             <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={PEAK_HOURS}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                        <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                        <Bar dataKey="guests" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
             </div>
          </GlassCard>

          {/* Staff Performance */}
          <GlassCard className="h-80 overflow-hidden flex flex-col">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Top Performing Staff</h3>
                <button className="text-emerald-600 text-sm font-medium hover:underline">View All</button>
             </div>
             
             <div className="flex-1 overflow-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500 font-medium sticky top-0">
                        <tr>
                            <th className="px-4 py-3">Staff Member</th>
                            <th className="px-4 py-3 text-right">Tables</th>
                            <th className="px-4 py-3 text-right">Revenue</th>
                            <th className="px-4 py-3 text-right">Rating</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {STAFF_PERFORMANCE.map(staff => (
                            <tr key={staff.id} className="hover:bg-gray-50/50">
                                <td className="px-4 py-3">
                                    <div className="font-medium text-gray-900">{staff.name}</div>
                                    <div className="text-xs text-gray-500">{staff.role}</div>
                                </td>
                                <td className="px-4 py-3 text-right text-gray-600">{staff.tables}</td>
                                <td className="px-4 py-3 text-right font-medium text-emerald-600">${staff.revenue.toLocaleString()}</td>
                                <td className="px-4 py-3 text-right">
                                    <div className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded text-xs font-bold">
                                        {staff.rating} ★
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
          </GlassCard>
      </div>
    </div>
  );
};