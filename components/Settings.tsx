import React, { useState } from 'react';
import { useAppContext } from '../services/AppContext';
import { GlassCard } from './ui/GlassCard';
import { Save, ExternalLink, Palette, Store, Clock, Layout } from 'lucide-react';
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
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
           <p className="text-gray-500 text-sm mt-1">Manage your restaurant details and booking page appearance.</p>
        </div>
      </div>

      {/* Editor Promo Card */}
      <div className="rounded-2xl p-8 relative overflow-hidden group border border-indigo-100 shadow-sm">
         <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-100 transition-opacity"></div>
         {/* Decorative circles */}
         <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-100/50 rounded-full blur-3xl"></div>
         <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-100/50 rounded-full blur-3xl"></div>
         
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
                <h2 className="text-xl font-bold text-indigo-900 mb-2">Customize Your Booking Page</h2>
                <p className="text-indigo-700/80 max-w-lg text-sm">
                    Use our visual editor to change colors, fonts, and layout to match your restaurant's brand identity. View changes in real-time.
                </p>
            </div>
            <Link to="/editor" className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200 flex items-center gap-2 whitespace-nowrap">
                <Palette size={18} /> Open Visual Editor
            </Link>
         </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Restaurant Profile */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
                <Store size={18} className="text-gray-400" />
                <h2 className="font-semibold text-gray-900">Restaurant Profile</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Restaurant Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Email Contact</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition-all"
                  />
                </div>
                <div className="col-span-1 md:col-span-2 space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition-all resize-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Address</label>
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Phone</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition-all"
                  />
                </div>
            </div>
        </div>

        {/* Booking Configuration */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
             <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
                <Clock size={18} className="text-gray-400" />
                <h2 className="font-semibold text-gray-900">Booking Configuration</h2>
            </div>
           <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">Opening Time</label>
              <input
                type="time"
                name="openingTime"
                value={formData.openingTime}
                onChange={handleChange}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">Closing Time</label>
              <input
                type="time"
                name="closingTime"
                value={formData.closingTime}
                onChange={handleChange}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition-all"
              />
            </div>
             <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">Total Tables</label>
              <input
                type="number"
                name="tables"
                value={formData.tables}
                onChange={handleChange}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition-all"
              />
            </div>
           </div>
        </div>

        <div className="flex justify-end gap-4">
           {saved && (
             <span className="text-emerald-600 flex items-center animate-in fade-in font-medium text-sm">Saved successfully!</span>
           )}
          <button 
            type="submit"
            className="bg-gray-900 text-white px-8 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-all flex items-center gap-2 shadow-lg shadow-gray-200"
          >
            <Save size={18} /> Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};