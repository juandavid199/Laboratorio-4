import React from 'react';
import { LayoutDashboard, Boxes, Users, ShoppingCart, RefreshCw, Layers } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onRefresh, loading }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard Cierre', icon: LayoutDashboard },
    { id: 'inventory', label: 'Catálogo Tecnológico', icon: Boxes },
    { id: 'suppliers', label: 'Proveedores Mayoristas', icon: Users },
    { id: 'reorder', label: 'Órdenes Sugeridas', icon: ShoppingCart },
  ];

  return (
    <header className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div 
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => setActiveTab('dashboard')}
        >
          <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold">Laboratorio IA</div>
            <h1 className="text-base font-bold leading-tight">TechInventory &amp; CashFlow</h1>
          </div>
        </div>

        <nav className="flex items-center space-x-1 sm:space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4 mr-1.5" />
                <span className="hidden md:inline">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="flex items-center space-x-2">
          <button
            onClick={onRefresh}
            disabled={loading}
            title="Recargar datos de la API"
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg text-xs flex items-center transition disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-indigo-400' : ''}`} />
          </button>
          <div className="hidden sm:flex items-center text-xs text-slate-400 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
            H2 In-Memory
          </div>
        </div>
      </div>
    </header>
  );
}

