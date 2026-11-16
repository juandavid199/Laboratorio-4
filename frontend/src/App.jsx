import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import DashboardView from './components/DashboardView';
import InventoryView from './components/InventoryView';
import SuppliersView from './components/SuppliersView';
import ReorderView from './components/ReorderView';
import { api } from './api';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  // Estados de datos cargados de la API
  const [dashboardSummary, setDashboardSummary] = useState(null);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [reorderSuggestions, setReorderSuggestions] = useState(null);
  const [historicalOrders, setHistoricalOrders] = useState([]);

  // Filtros de inventario
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'critical' | 'over90'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);
      setApiError(null);

      const [summaryRes, productsRes, suppliersRes, suggestionsRes, ordersRes] = await Promise.allSettled([
        api.getDashboardSummary(),
        api.getProducts(),
        api.getSuppliers(),
        api.getReorderSuggestions(),
        api.getHistoricalOrders()
      ]);

      if (summaryRes.status === 'fulfilled') setDashboardSummary(summaryRes.value);
      if (productsRes.status === 'fulfilled') setProducts(productsRes.value);
      if (suppliersRes.status === 'fulfilled') setSuppliers(suppliersRes.value);
      if (suggestionsRes.status === 'fulfilled') setReorderSuggestions(suggestionsRes.value);
      if (ordersRes.status === 'fulfilled') setHistoricalOrders(ordersRes.value);

      // Si falla tanto dashboard como productos, avisar al usuario
      if (summaryRes.status === 'rejected' && productsRes.status === 'rejected') {
        setApiError('No se pudo conectar con el backend Spring Boot en http://localhost:8080. Verifique que la aplicación backend esté iniciada.');
      }
    } catch (err) {
      setApiError(err.message || 'Error cargando datos del sistema');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const handleNavigate = (tab, filter = null) => {
    setActiveTab(tab);
    if (tab === 'inventory' && filter) {
      setFilterMode(filter);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Navegación Superior */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRefresh={fetchAllData}
        loading={loading}
      />

      {/* Alerta de Error de Conexión si el backend no responde */}
      {apiError && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-amber-800">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{apiError}</span>
            </div>
            <button
              onClick={fetchAllData}
              className="bg-amber-200/80 hover:bg-amber-300 px-3 py-1 rounded-md font-semibold transition flex items-center"
            >
              <RefreshCw className="w-3 h-3 mr-1" /> Reintentar
            </button>
          </div>
        </div>
      )}

      {/* Contenido Principal por Vistas */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {activeTab === 'dashboard' && (
          <DashboardView
            summary={dashboardSummary}
            onNavigate={handleNavigate}
            loading={loading}
          />
        )}

        {activeTab === 'inventory' && (
          <InventoryView
            products={products}
            suppliers={suppliers}
            filterMode={filterMode}
            setFilterMode={setFilterMode}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onProductUpdated={fetchAllData}
            loading={loading}
          />
        )}

        {activeTab === 'suppliers' && (
          <SuppliersView
            suppliers={suppliers}
            products={products}
            onFilterSupplier={(sup) => {
              setActiveTab('inventory');
            }}
            loading={loading}
          />
        )}

        {activeTab === 'reorder' && (
          <ReorderView
            suggestion={reorderSuggestions}
            onRefreshSuggestions={fetchAllData}
            onOrderApproved={fetchAllData}
            historicalOrders={historicalOrders}
            loading={loading}
          />
        )}
      </main>

      {/* Pie de Página */}
      <footer className="bg-white border-t border-slate-200 py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-2">
          <span>TechInventory &amp; CashFlow • Fundamentos de Sistemas de Información</span>
          <span className="font-mono text-[11px] text-slate-400">
            Spring Boot 3.2.5 + React 18 + H2 In-Memory
          </span>
        </div>
      </footer>
    </div>
  );
}

