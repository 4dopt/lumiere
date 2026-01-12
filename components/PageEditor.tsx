import React, { useState, useEffect } from 'react';
import { useAppContext } from '../services/AppContext';
import { BookingPage } from './BookingPage';
import { RestaurantSettings, DesignSettings } from '../types';
import { X, Save, Smartphone, Monitor, Palette, Type, Layout, Image as ImageIcon, CheckCircle, ExternalLink } from 'lucide-react';

export const PageEditor: React.FC = () => {
  const { settings, updateSettings } = useAppContext();
  // Local state for the preview, initialized from global settings
  const [localSettings, setLocalSettings] = useState<RestaurantSettings>(settings);
  const [activeTab, setActiveTab] = useState<'branding' | 'hero' | 'layout'>('branding');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isSaved, setIsSaved] = useState(false);

  // Sync if global settings change externally (unlikely but good practice)
  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleDesignChange = (key: keyof DesignSettings, value: any) => {
    setLocalSettings(prev => ({
      ...prev,
      design: {
        ...prev.design,
        [key]: value
      }
    }));
    setIsSaved(false);
  };

  const handleInfoChange = (key: keyof RestaurantSettings, value: any) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setIsSaved(false);
  };

  const saveChanges = () => {
    updateSettings(localSettings);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const fonts = ['Inter', 'Playfair Display', 'Lato', 'Montserrat'];

  return (
    <div className="h-screen flex flex-col bg-slate-950 overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b border-white/10 bg-slate-900/50 flex justify-between items-center px-6 z-20 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button onClick={() => window.history.back()} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
          <div className="h-6 w-px bg-white/10 mx-2"></div>
          <h1 className="text-lg font-semibold text-white">Booking Page Editor</h1>
          <span className="px-2 py-0.5 rounded text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Live Mode</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-slate-800 rounded-lg p-1 flex border border-slate-700">
            <button 
              onClick={() => setViewMode('desktop')}
              className={`p-2 rounded-md transition-all ${viewMode === 'desktop' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Monitor size={18} />
            </button>
            <button 
              onClick={() => setViewMode('mobile')}
               className={`p-2 rounded-md transition-all ${viewMode === 'mobile' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Smartphone size={18} />
            </button>
          </div>
          
           <a 
            href="#/book" 
            target="_blank"
            className="text-slate-400 hover:text-white flex items-center gap-1 text-sm px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
          >
             <ExternalLink size={16} /> View Live
          </a>

          <button 
            onClick={saveChanges}
            className="bg-white text-slate-950 px-6 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-colors flex items-center gap-2"
          >
            {isSaved ? <CheckCircle size={18} className="text-emerald-600"/> : <Save size={18} />}
            {isSaved ? 'Saved' : 'Save Changes'}
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Controls */}
        <aside className="w-80 border-r border-white/10 bg-slate-900 overflow-y-auto">
          {/* Tabs */}
          <div className="flex border-b border-white/5">
            <button 
              onClick={() => setActiveTab('branding')}
              className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors flex flex-col items-center gap-1 ${activeTab === 'branding' ? 'border-indigo-500 text-indigo-400 bg-white/5' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
            >
              <Palette size={18} /> Theme
            </button>
             <button 
              onClick={() => setActiveTab('hero')}
              className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors flex flex-col items-center gap-1 ${activeTab === 'hero' ? 'border-indigo-500 text-indigo-400 bg-white/5' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
            >
              <ImageIcon size={18} /> Hero
            </button>
             <button 
              onClick={() => setActiveTab('layout')}
              className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors flex flex-col items-center gap-1 ${activeTab === 'layout' ? 'border-indigo-500 text-indigo-400 bg-white/5' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
            >
              <Layout size={18} /> Details
            </button>
          </div>

          <div className="p-6 space-y-8 animate-in slide-in-from-left-4 duration-300">
            
            {activeTab === 'branding' && (
              <>
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                    <Palette size={14} /> Colors
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Primary Accent</label>
                      <div className="flex items-center gap-3">
                        <input 
                          type="color" 
                          value={localSettings.design.primaryColor}
                          onChange={(e) => handleDesignChange('primaryColor', e.target.value)}
                          className="h-9 w-9 rounded cursor-pointer bg-transparent border-none p-0"
                        />
                        <input 
                          type="text" 
                          value={localSettings.design.primaryColor}
                          onChange={(e) => handleDesignChange('primaryColor', e.target.value)}
                          className="bg-slate-800 border border-slate-700 text-white rounded px-2 py-1 text-sm w-24"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Secondary Gradient</label>
                      <div className="flex items-center gap-3">
                        <input 
                          type="color" 
                          value={localSettings.design.secondaryColor}
                          onChange={(e) => handleDesignChange('secondaryColor', e.target.value)}
                          className="h-9 w-9 rounded cursor-pointer bg-transparent border-none p-0"
                        />
                         <input 
                          type="text" 
                          value={localSettings.design.secondaryColor}
                          onChange={(e) => handleDesignChange('secondaryColor', e.target.value)}
                          className="bg-slate-800 border border-slate-700 text-white rounded px-2 py-1 text-sm w-24"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Background Base</label>
                      <div className="flex items-center gap-3">
                        <input 
                          type="color" 
                          value={localSettings.design.backgroundColor}
                          onChange={(e) => handleDesignChange('backgroundColor', e.target.value)}
                          className="h-9 w-9 rounded cursor-pointer bg-transparent border-none p-0"
                        />
                         <input 
                          type="text" 
                          value={localSettings.design.backgroundColor}
                          onChange={(e) => handleDesignChange('backgroundColor', e.target.value)}
                          className="bg-slate-800 border border-slate-700 text-white rounded px-2 py-1 text-sm w-24"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                   <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                    <Type size={14} /> Typography
                  </h3>
                  <div>
                    <label className="text-xs text-slate-400 block mb-2">Font Family</label>
                    <select 
                      value={localSettings.design.fontFamily}
                      onChange={(e) => handleDesignChange('fontFamily', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white text-sm"
                    >
                      {fonts.map(font => <option key={font} value={font}>{font}</option>)}
                    </select>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'hero' && (
              <>
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Cover Image</h3>
                  <input 
                    type="text" 
                    value={localSettings.coverUrl}
                    onChange={(e) => handleInfoChange('coverUrl', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white text-sm mb-2"
                    placeholder="Image URL"
                  />
                  <div className="aspect-video w-full rounded-lg overflow-hidden border border-slate-700 relative group">
                    <img src={localSettings.coverUrl} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-xs bg-white text-black px-3 py-1 rounded-full">Change</button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Appearance</h3>
                  
                  <div>
                    <label className="text-xs text-slate-400 block mb-2">Overlay Opacity: {Math.round(localSettings.design.heroOverlayOpacity * 100)}%</label>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.1"
                      value={localSettings.design.heroOverlayOpacity}
                      onChange={(e) => handleDesignChange('heroOverlayOpacity', parseFloat(e.target.value))}
                      className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-2">Section Height</label>
                    <div className="grid grid-cols-3 gap-2">
                        {['compact', 'standard', 'large'].map(h => (
                            <button
                                key={h}
                                onClick={() => handleDesignChange('heroHeight', h)}
                                className={`text-xs py-2 rounded-md border ${localSettings.design.heroHeight === h ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                            >
                                {h}
                            </button>
                        ))}
                    </div>
                  </div>
                  
                   <div>
                    <label className="text-xs text-slate-400 block mb-2">Text Alignment</label>
                    <div className="flex bg-slate-800 rounded-md p-1 border border-slate-700">
                         <button 
                            onClick={() => handleDesignChange('heroAlignment', 'left')}
                            className={`flex-1 py-1 rounded text-xs ${localSettings.design.heroAlignment === 'left' ? 'bg-slate-600 text-white' : 'text-slate-400'}`}
                        >
                            Left
                        </button>
                         <button 
                            onClick={() => handleDesignChange('heroAlignment', 'center')}
                            className={`flex-1 py-1 rounded text-xs ${localSettings.design.heroAlignment === 'center' ? 'bg-slate-600 text-white' : 'text-slate-400'}`}
                        >
                            Center
                        </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'layout' && (
               <>
                 <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Components</h3>
                  
                  <div>
                    <label className="text-xs text-slate-400 block mb-2">Corner Radius: {localSettings.design.cornerRadius}px</label>
                    <input 
                      type="range" 
                      min="0" 
                      max="32" 
                      step="2"
                      value={localSettings.design.cornerRadius}
                      onChange={(e) => handleDesignChange('cornerRadius', parseInt(e.target.value))}
                      className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                  </div>
                 </div>

                 <div className="space-y-4 pt-4 border-t border-white/10">
                    <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Restaurant Info</h3>
                    <div>
                        <label className="text-xs text-slate-400 block mb-1">Display Name</label>
                        <input 
                            type="text" 
                            value={localSettings.name}
                            onChange={(e) => handleInfoChange('name', e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white text-sm"
                        />
                    </div>
                     <div>
                        <label className="text-xs text-slate-400 block mb-1">Address</label>
                        <input 
                            type="text" 
                            value={localSettings.address}
                            onChange={(e) => handleInfoChange('address', e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white text-sm"
                        />
                    </div>
                 </div>
               </>
            )}

          </div>
        </aside>

        {/* Live Preview Area */}
        <main className="flex-1 bg-slate-950 relative flex items-center justify-center p-8 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
          <div 
            className={`
                transition-all duration-500 ease-in-out shadow-2xl relative overflow-hidden bg-black
                ${viewMode === 'mobile' ? 'w-[375px] h-[700px] rounded-[3rem] border-8 border-slate-800' : 'w-full h-full max-w-6xl rounded-lg border border-slate-800'}
            `}
          >
             {/* Notch for mobile view */}
             {viewMode === 'mobile' && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-xl z-50"></div>
             )}

             <div className="h-full w-full overflow-y-auto custom-scrollbar bg-white">
               <BookingPage customSettings={localSettings} previewMode={true} />
             </div>
          </div>
        </main>
      </div>
    </div>
  );
};