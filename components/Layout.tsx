import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, ShoppingCart, Users, FileText, Settings, Bell, Search, ChevronDown, UtensilsCrossed } from 'lucide-react';
import { useAppContext } from '../services/AppContext';

export const Layout: React.FC = () => {
  const { settings } = useAppContext();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: CalendarDays, label: 'Reservation', path: '/reservations' },
    { icon: ShoppingCart, label: 'Orders', path: '/orders' }, // Added placeholder
    { icon: Users, label: 'Customers', path: '/customers' },
    { icon: UtensilsCrossed, label: 'Menu', path: '/menu' }, // Added placeholder
    { icon: FileText, label: 'Reports', path: '/reports' }, // Added placeholder
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col hidden md:flex shadow-sm z-10">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-emerald-500 tracking-tight">Malinessa</h1>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group font-medium
                ${isActive 
                  ? 'bg-emerald-50 text-emerald-600' 
                  : 'text-gray-500 hover:text-emerald-600 hover:bg-gray-50'}
              `}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
           {/* Placeholder for future footer items if needed */}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex justify-between items-center px-8 shadow-sm">
           <div className="relative w-96">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
             <input 
                type="text" 
                placeholder="Search" 
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-gray-700"
             />
           </div>

           <div className="flex items-center gap-6">
              <button className="relative p-2 text-gray-400 hover:text-emerald-600 transition-colors">
                 <Bell size={20} />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              
              <div className="flex items-center gap-3 cursor-pointer">
                 <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-semibold text-sm">
                   JJ
                 </div>
                 <div className="hidden lg:block text-sm">
                    <p className="font-semibold text-gray-900">Jacob Jones</p>
                 </div>
                 <ChevronDown size={16} className="text-gray-400" />
              </div>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
           <Outlet />
        </div>
      </main>
    </div>
  );
};