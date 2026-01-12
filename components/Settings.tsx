import React, { useState } from 'react';
import { useAppContext } from '../services/AppContext';
import { GlassCard } from './ui/GlassCard';
import { Save, ExternalLink, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Settings: React.FC = () => {
  const { settings, updateSettings } = useAppContext();
  const [formData, setFormData] = useState(settings);
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-3xl font-bold text-white">Settings</h1>
           <p className="text-slate-400 mt-1">Manage your restaurant details and booking page</p>
        </div>
      </div>

      {/* Editor Promo Card */}
      <div className="rounded-2xl p-8 relative overflow-hidden group">
         <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-90 transition-opacity"></div>
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-40"></div>
         
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
                <h2 className="text-2xl font-bold text-white mb-2">Customize Your Booking Page</h2>
                <p className="text-indigo-100 max-w-lg">
                    Use our visual editor to change colors, fonts, and layout to match your restaurant's brand identity. View changes in real-time.
                </p>
            </div>
            <Link to="/editor" className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-lg flex items-center gap-2 whitespace-nowrap">
                <Palette size={20} /> Open Visual Editor
            </Link>
         </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <GlassCard>
          <h2 className="text-xl font-semibold text-white mb-6 border-b border-white/10 pb-4">Restaurant Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Restaurant Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Email Contact</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div className="col-span-1 md:col-span-2 space-y-2">
              <label className="text-sm text-slate-400">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Address</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Phone</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="text-xl font-semibold text-white mb-6 border-b border-white/10 pb-4">Booking Configuration</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Opening Time</label>
              <input
                type="time"
                name="openingTime"
                value={formData.openingTime}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Closing Time</label>
              <input
                type="time"
                name="closingTime"
                value={formData.closingTime}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
             <div className="space-y-2">
              <label className="text-sm text-slate-400">Total Tables</label>
              <input
                type="number"
                name="tables"
                value={formData.tables}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
           </div>
        </GlassCard>

        <div className="flex justify-end gap-4 pb-12">
           {saved && (
             <span className="text-emerald-400 flex items-center animate-in fade-in">Saved successfully!</span>
           )}
          <button 
            type="submit"
            className="premium-gradient text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all transform hover:-translate-y-1 flex items-center gap-2"
          >
            <Save size={18} /> Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};