import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useAppContext } from '../services/AppContext';
import { GlassCard } from './ui/GlassCard';
import { Badge } from './ui/Badge';
import { CalendarRange, Users, Utensils, TrendingUp, MoreHorizontal } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { reservations, customers, getFormattedDate } = useAppContext();

  // Calculate Metrics
  const today = new Date().toISOString().split('T')[0];
  const todayReservations = reservations.filter(r => r.date === today);
  const upcomingReservations = reservations.filter(r => r.date >= today && r.status !== 'cancelled' && r.status !== 'completed');
  const utilization = Math.round((todayReservations.length / 20) * 100); // Assuming 20 tables max

  // Mock Chart Data
  const chartData = [
    { name: 'Mon', visits: 12 },
    { name: 'Tue', visits: 19 },
    { name: 'Wed', visits: 15 },
    { name: 'Thu', visits: 22 },
    { name: 'Fri', visits: 35 },
    { name: 'Sat', visits: 42 },
    { name: 'Sun', visits: 38 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
          <p className="text-slate-400 mt-1">{getFormattedDate()}</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-indigo-500/20 flex items-center gap-2">
           <Utensils size={18} /> Add Manual Reservation
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <CalendarRange size={80} />
          </div>
          <div className="flex items-center gap-3 text-indigo-400 mb-2">
            <CalendarRange size={20} />
            <span className="font-medium text-sm">Today's Bookings</span>
          </div>
          <p className="text-4xl font-bold text-white mb-1">{todayReservations.length}</p>
          <div className="flex items-center text-xs text-emerald-400 gap-1 bg-emerald-500/10 w-fit px-2 py-1 rounded-full">
            <TrendingUp size={12} /> +12% vs last week
          </div>
        </GlassCard>

        <GlassCard className="relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users size={80} />
          </div>
          <div className="flex items-center gap-3 text-pink-400 mb-2">
            <Users size={20} />
            <span className="font-medium text-sm">Total Guests</span>
          </div>
          <p className="text-4xl font-bold text-white mb-1">
            {todayReservations.reduce((acc, curr) => acc + curr.partySize, 0)}
          </p>
          <div className="text-slate-400 text-xs">Expected for dinner service</div>
        </GlassCard>

        <GlassCard className="relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <Utensils size={80} />
          </div>
          <div className="flex items-center gap-3 text-cyan-400 mb-2">
            <Utensils size={20} />
            <span className="font-medium text-sm">Table Utilization</span>
          </div>
          <p className="text-4xl font-bold text-white mb-1">{utilization}%</p>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${utilization}%` }}></div>
          </div>
        </GlassCard>

        <GlassCard className="relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users size={80} />
          </div>
           <div className="flex items-center gap-3 text-amber-400 mb-2">
            <Users size={20} />
            <span className="font-medium text-sm">Weekly Customers</span>
          </div>
          <p className="text-4xl font-bold text-white mb-1">{customers.length}</p>
          <div className="text-slate-400 text-xs">Active database size</div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2">
           <GlassCard className="h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">Reservation Trends</h3>
              <select className="bg-slate-800 text-slate-300 text-sm border border-slate-700 rounded-lg px-3 py-1 outline-none">
                <option>This Week</option>
                <option>Last Week</option>
              </select>
            </div>
            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis 
                    dataKey="name" 
                    stroke="#475569" 
                    tick={{ fill: '#94a3b8' }} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#475569" 
                    tick={{ fill: '#94a3b8' }} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }}
                  />
                  <Bar dataKey="visits" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="url(#colorGradient)" />
                    ))}
                  </Bar>
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#818cf8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#818cf8" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
           </GlassCard>
        </div>

        {/* Recent Activity / Upcoming */}
        <div className="lg:col-span-1">
          <GlassCard className="h-[400px] flex flex-col">
            <h3 className="text-lg font-semibold text-white mb-4">Upcoming Arrivals</h3>
            <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
              {upcomingReservations.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-500">
                  <p>No upcoming reservations</p>
                </div>
              ) : (
                upcomingReservations.slice(0, 5).map(res => (
                  <div key={res.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-violet-500/20 text-violet-300 flex items-center justify-center font-bold">
                        {res.customerName.substring(0,2).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{res.customerName}</p>
                        <p className="text-xs text-slate-400">{res.time} • {res.partySize} guests</p>
                      </div>
                    </div>
                    <Badge status={res.status} />
                  </div>
                ))
              )}
            </div>
            <button className="w-full mt-4 text-sm text-slate-400 hover:text-white transition-colors py-2 border-t border-white/10">
              View All Reservations
            </button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};