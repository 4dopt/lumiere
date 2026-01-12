import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Users, Settings, LogOut, ExternalLink, Palette } from 'lucide-react';
import { useAppContext } from '../services/AppContext';

export const Layout: React.FC = () => {
  const { settings } = useAppContext();
  const navigate = useNavigate();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: CalendarDays, label: 'Reservations', path: '/reservations' },
    { icon: Users, label: 'Customers', path: '/customers' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-slate-900/50 backdrop-blur-xl flex flex-col hidden md:flex">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg premium-gradient flex items-center justify-center text-white font-bold text-lg">
              L
            </div>
            <span className="font-bold text-xl tracking-tight text-white">Lumière</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                ${isActive 
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'}
              `}
            >
              <item.icon size={20} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
          
           <div className="pt-4 mt-2 border-t border-white/5">
             <NavLink
              to="/editor"
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                ${isActive 
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'}
              `}
            >
              <Palette size={20} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium">Page Editor</span>
            </NavLink>
           </div>
        </nav>

        <div className="p-4 border-t border-white/5">
           <a 
            href="#/book" 
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors mb-2"
          >
             <ExternalLink size={18} />
             <span className="text-sm">View Public Page</span>
          </a>
          <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-red-400 transition-colors rounded-xl hover:bg-red-500/10">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Background Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Mobile Nav Header */}
        <div className="md:hidden p-4 border-b border-white/5 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 flex justify-between items-center">
             <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg premium-gradient flex items-center justify-center text-white font-bold text-lg">L</div>
              <span className="font-bold text-lg text-white">Lumière</span>
            </div>
             <div className="flex gap-4">
                {navItems.map(item => (
                    <NavLink key={item.path} to={item.path} className={({isActive}) => isActive ? 'text-indigo-400' : 'text-slate-400'}>
                        <item.icon size={24} />
                    </NavLink>
                ))}
            </div>
        </div>

        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};