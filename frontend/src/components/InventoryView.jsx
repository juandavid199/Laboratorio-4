import React, { useState } from 'react';
import StatusBadge, { formatCOP } from './StatusBadge';
import { api } from '../api';
import { 
  Search, 
  Filter, 
  ShieldAlert, 
  Clock, 
  CheckCircle, 
  Edit3, 
  X,
  Package,
  Boxes
} from 'lucide-react';

export default function InventoryView({
  products,
  suppliers,
  filterMode,
  setFilterMode,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  onProductUpdated,
  loading
}) {
  const [editingProduct, setEditingProduct] = useState(null);
  const [newStockValue, setNewStockValue] = useState('');
  const [savingStock, setSavingStock] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  // Categorías únicas
  const categories = ['ALL', ...Array.from(new Set(products.map((p) => p.category).filter(Boolean)))];

  // Filtrado en cliente
  const filteredProducts = products.filter((p) => {
    // Filtro por término
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      !searchTerm ||
      p.name?.toLowerCase().includes(term) ||
      p.sku?.toLowerCase().includes(term) ||
      p.brand?.toLowerCase().includes(term);

    // Filtro por categoría
    const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;

    // Filtro de estado
    let matchesStatus = true;
    if (filterMode === 'critical') {
      matchesStatus = p.currentStock <= p.minStock;
    } else if (filterMode === 'over90') {
      matchesStatus = p.daysInInventory > 90;
    }

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleOpenStockModal = (product) => {
    setEditingProduct(product);
    setNewStockValue(product.currentStock);
    setUpdateError(null);
  };

  const handleSaveStock = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    try {
      setSavingStock(true);
      setUpdateError(null);
      await api.updateStock(editingProduct.id, Number(newStockValue));
      setEditingProduct(null);
      if (onProductUpdated) onProductUpdated();
    } catch (err) {
      setUpdateError(err.message || 'Error al actualizar el stock');
    } finally {
      setSavingStock(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Catálogo e Inventario Tecnológico
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Control de existencias, rotación, umbrales de reorden y riesgo de obsolescencia.
          </p>
        </div>
        <div className="text-xs text-slate-500 font-semibold bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto">
          Mostrando {filteredProducts.length} de {products.length} productos
        </div>
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Búsqueda */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por SKU, nombre del equipo, marca..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Selector de Categoría */}
          <div className="w-full md:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-3 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'ALL' ? 'Todas las Categorías' : c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Píldoras de Filtro Rápido */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Filtros Rápidos:</span>
          
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filterMode === 'all'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todos ({products.length})
          </button>

          <button
            onClick={() => setFilterMode('critical')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center transition ${
              filterMode === 'critical'
                ? 'bg-red-600 text-white shadow-sm'
                : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 mr-1" />
            Stock Crítico (≤ Mínimo)
          </button>

          <button
            onClick={() => setFilterMode('over90')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center transition ${
              filterMode === 'over90'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5 mr-1" />
            &gt; 90 Días en Almacén
          </button>
        </div>
      </div>

      {/* Tabla de Productos */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
              <tr>
                <th className="px-4 py-3">SKU / Producto</th>
                <th className="px-4 py-3">Categoría</th>
                <th className="px-4 py-3 text-right">Costo Unit.</th>
                <th className="px-4 py-3 text-right">Precio Venta</th>
                <th className="px-4 py-3 text-center">Stock Actual</th>
                <th className="px-4 py-3 text-center">Mín / Ideal</th>
                <th className="px-4 py-3 text-center">Antigüedad</th>
                <th className="px-4 py-3 text-center">Estado</th>
                <th className="px-4 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-12 text-center text-slate-400">
                    <Boxes className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    No se encontraron productos que coincidan con los filtros aplicados.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const isCritical = p.currentStock <= p.minStock;
                  const isOver90 = p.daysInInventory > 90;

                  return (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition">
                      <td className="px-4 py-3">
                        <div className="font-mono text-xs font-bold text-slate-500">{p.sku}</div>
                        <div className="font-semibold text-slate-900 mt-0.5">{p.name}</div>
                        <div className="text-[11px] text-slate-400">{p.brand}</div>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-600 font-medium">
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] text-slate-700">
                          {p.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-slate-600">
                        {formatCOP(p.unitCost)}
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-slate-900">
                        {formatCOP(p.salePrice)}
                      </td>
                      <td className="px-4 py-3 text-center font-bold">
                        <span className={isCritical ? 'text-red-600 font-black' : 'text-slate-800'}>
                          {p.currentStock} un.
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-xs text-slate-500">
                        {p.minStock} / {p.idealStock}
                      </td>
                      <td className="px-4 py-3 text-center font-mono text-xs">
                        <span className={isOver90 ? 'text-amber-800 font-bold' : 'text-slate-600'}>
                          {p.daysInInventory} días
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {isCritical ? (
                          <StatusBadge type="critical" label="Crítico" />
                        ) : isOver90 ? (
                          <StatusBadge type="warning" label="> 90 días" />
                        ) : (
                          <StatusBadge type="optimal" label="Óptimo" />
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleOpenStockModal(p)}
                          title="Actualizar Stock"
                          className="p-1.5 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-md transition"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para Actualizar Stock */}
      {editingProduct && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Actualizar Stock en Almacén</h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">{editingProduct.sku} - {editingProduct.name}</p>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStock} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nuevo Stock Actual (Unidades)
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={newStockValue}
                  onChange={(e) => setNewStockValue(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Mínimo definido: {editingProduct.minStock} un. | Ideal: {editingProduct.idealStock} un.
                </p>
              </div>

              {updateError && (
                <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs border border-red-200">
                  {updateError}
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={savingStock}
                  className="px-4 py-2 text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition disabled:opacity-50"
                >
                  {savingStock ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

