import React from 'react';
import { formatCOP } from './StatusBadge';
import { 
  DollarSign, 
  Wallet, 
  AlertTriangle, 
  Clock, 
  TrendingUp, 
  Layers, 
  ArrowRight,
  ShieldAlert,
  CalendarCheck2
} from 'lucide-react';

export default function DashboardView({ summary, onNavigate, loading }) {
  if (loading && !summary) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-400">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-sm font-medium">Consolidando indicadores de cierre mensual y flujo de caja...</p>
      </div>
    );
  }

  const s = summary || {
    period: 'Noviembre 2026',
    inventoryCapital: 84350000,
    cashBalance: 38500000,
    pendingLiabilities: 16800000,
    reorderCapacity: 14200000,
    totalProducts: 20,
    criticalProductsCount: 4,
    over90DaysProductsCount: 5,
    capitalByCategory: {}
  };

  return (
    <div className="space-y-6">
      {/* Header Sección */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Tablero de Cierre Mensual y Salud Financiera
            </h2>
            <span className="bg-indigo-100 text-indigo-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {s.period || 'Cierre Mensual'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Resumen consolidado para la evaluación de existencias, liquidez y toma de decisiones de compras a proveedores.
          </p>
        </div>
        <div className="flex items-center">
          <span className="inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CalendarCheck2 className="w-4 h-4 mr-1.5 text-emerald-600" />
            Cierre Fiscal Activo
          </span>
        </div>
      </div>

      {/* 4 KPIs Financieros Maestros */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Capital Inmovilizado */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Capital en Inventario</span>
            <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 tracking-tight">{formatCOP(s.inventoryCapital)}</div>
            <div className="mt-1 flex items-center text-xs text-slate-500 font-medium">
              <span>{s.totalProducts || 20} productos valorizados al costo</span>
            </div>
          </div>
        </div>

        {/* KPI 2: Saldo en Bancos */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Saldo Disponible (Bancos)</span>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-emerald-600 tracking-tight">{formatCOP(s.cashBalance)}</div>
            <div className="mt-1 flex items-center text-xs text-emerald-700 font-medium">
              <TrendingUp className="w-3.5 h-3.5 mr-1" />
              <span>Liquidez inmediata para compras</span>
            </div>
          </div>
        </div>

        {/* KPI 3: Compromisos con Proveedores */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Cuentas por Pagar</span>
            <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-red-600 tracking-tight">{formatCOP(s.pendingLiabilities)}</div>
            <div className="mt-1 text-xs text-slate-500 font-medium">
              <span>Pasivo exigible este mes</span>
            </div>
          </div>
        </div>

        {/* KPI 4: Capacidad de Reorden */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Capacidad de Reorden</span>
            <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-indigo-600 tracking-tight">{formatCOP(s.reorderCapacity)}</div>
            <div className="mt-1 text-xs text-slate-500 font-medium">
              <span>Fondo neto disponible para stock</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tarjetas de Alerta de Inventario Crítico y Obsolescencia */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Alerta 1: Quiebre de Stock Crítico */}
        <div 
          onClick={() => onNavigate('inventory', 'critical')}
          className="bg-white rounded-xl border border-red-200 p-5 shadow-sm hover:border-red-300 transition cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-700">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition">
                  Productos con Stock Crítico (≤ Mínimo)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Riesgo inmediato de pérdida de ventas por quiebre de existencias.
                </p>
              </div>
            </div>
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-700 font-extrabold text-sm border border-red-200">
              {s.criticalProductsCount || 4}
            </span>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-red-700">
            <span>Ver productos en catálogo crítico</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
          </div>
        </div>

        {/* Alerta 2: Capital Inmovilizado > 90 Días */}
        <div 
          onClick={() => onNavigate('inventory', 'over90')}
          className="bg-white rounded-xl border border-amber-200 p-5 shadow-sm hover:border-amber-300 transition cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition">
                  Capital en Riesgo (&gt; 90 Días en Almacén)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Productos con baja rotación o riesgo de obsolescencia tecnológica.
                </p>
              </div>
            </div>
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-50 text-amber-800 font-extrabold text-sm border border-amber-200">
              {s.over90DaysProductsCount || 5}
            </span>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-800">
            <span>Ver productos con más de 90 días</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
          </div>
        </div>
      </div>

      {/* Distribución de Capital por Categoría Tecnológica */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
          Distribución de Capital Inmovilizado por Categoría TI
        </h3>
        {s.capitalByCategory && Object.keys(s.capitalByCategory).length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(s.capitalByCategory).map(([cat, amount]) => (
              <div key={cat} className="p-3.5 rounded-lg border border-slate-100 bg-slate-50/70 flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-700">{cat}</span>
                <span className="text-xs font-bold text-slate-900 font-mono">{formatCOP(amount)}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-slate-400">
            No se han registrado categorías de productos.
          </div>
        )}
      </div>
    </div>
  );
}

