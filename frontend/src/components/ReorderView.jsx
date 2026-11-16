import React, { useState } from 'react';
import { formatCOP } from './StatusBadge';
import { api } from '../api';
import { 
  ShoppingCart, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Receipt, 
  Building2,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function ReorderView({
  suggestion,
  onRefreshSuggestions,
  onOrderApproved,
  historicalOrders,
  loading
}) {
  const [approving, setApproving] = useState(false);
  const [approvalSuccess, setApprovalSuccess] = useState(null);
  const [approvalError, setApprovalError] = useState(null);
  const [notes, setNotes] = useState('Aprobado para cierre de mes');

  const s = suggestion || {
    items: [],
    totalOrderCost: 0,
    availableReorderCapacity: 0,
    canAfford: true,
    message: 'No hay sugerencias calculadas.'
  };

  const handleApprove = async () => {
    try {
      setApproving(true);
      setApprovalError(null);
      setApprovalSuccess(null);
      const res = await api.approveOrderSuggestion(notes);
      setApprovalSuccess(`Orden de compra ${res.orderNumber} aprobada y registrada exitosamente.`);
      if (onOrderApproved) onOrderApproved();
      if (onRefreshSuggestions) onRefreshSuggestions();
    } catch (err) {
      setApprovalError(err.message || 'Error al aprobar la orden sugerida');
    } finally {
      setApproving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Motor de Reorden y Órdenes Sugeridas
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Recomendaciones inteligentes de compra basadas en quiebres de stock y capacidad de flujo de caja.
          </p>
        </div>
      </div>

      {/* Alertas y Feedback */}
      {approvalSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{approvalSuccess}</span>
          </div>
          <button
            onClick={() => setApprovalSuccess(null)}
            className="text-emerald-700 font-bold ml-4"
          >
            &times;
          </button>
        </div>
      )}

      {approvalError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span>{approvalError}</span>
          </div>
          <button
            onClick={() => setApprovalError(null)}
            className="text-red-700 font-bold ml-4"
          >
            &times;
          </button>
        </div>
      )}

      {/* Tarjeta de Resumen Financiero de la Sugerencia */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Costo Total del Pedido Sugerido
            </span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 block">
              {formatCOP(s.totalOrderCost)}
            </span>
            <span className="text-xs text-slate-500 mt-1 block">
              Calculado para reabastecer {s.items ? s.items.length : 0} productos críticos
            </span>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Capacidad de Liquidez del Cierre
            </span>
            <span className="text-2xl sm:text-3xl font-black text-indigo-600 mt-1 block">
              {formatCOP(s.availableReorderCapacity)}
            </span>
            <span className="text-xs text-slate-500 mt-1 block">
              Fondo libre tras cubrir pasivos fijos y compromisos
            </span>
          </div>

          <div className="flex flex-col justify-center">
            {s.canAfford ? (
              <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-2">
                <div className="flex items-center font-bold">
                  <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-600" />
                  Presupuesto Suficiente
                </div>
                <p className="text-[11px] leading-tight">
                  El flujo de caja actual permite autorizar la adquisición sin incurrir en déficit operativo.
                </p>
                <button
                  onClick={handleApprove}
                  disabled={approving || !s.items || s.items.length === 0}
                  className="w-full mt-2 py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow transition disabled:opacity-50"
                >
                  {approving ? 'Generando Orden...' : 'Aprobar Orden de Compra'}
                </button>
              </div>
            ) : (
              <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs space-y-2">
                <div className="flex items-center font-bold">
                  <AlertCircle className="w-4 h-4 mr-1.5 text-red-600" />
                  Alerta: Presupuesto Insuficiente
                </div>
                <p className="text-[11px] leading-tight">
                  El costo excede la capacidad de reorden estimada para este cierre de mes. Se sugiere renegociar plazos.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabla de Productos Sugeridos para Reabastecimiento */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Detalle de Productos a Reabastecer
          </h3>
          <span className="text-xs font-semibold text-slate-500">
            {s.items ? s.items.length : 0} ítems en recomendación
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
              <tr>
                <th className="px-4 py-3">SKU / Producto</th>
                <th className="px-4 py-3">Proveedor Sugerido</th>
                <th className="px-4 py-3 text-center">Stock Actual</th>
                <th className="px-4 py-3 text-center">Stock Mínimo</th>
                <th className="px-4 py-3 text-center">Stock Ideal</th>
                <th className="px-4 py-3 text-center font-bold text-indigo-700 bg-indigo-50/50">Cant. a Pedir</th>
                <th className="px-4 py-3 text-right">Costo Unit.</th>
                <th className="px-4 py-3 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(!s.items || s.items.length === 0) ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-400">
                    No hay productos críticos con necesidad de compra en este momento.
                  </td>
                </tr>
              ) : (
                s.items.map((item) => (
                  <tr key={item.productId} className="hover:bg-slate-50/80 transition">
                    <td className="px-4 py-3">
                      <div className="font-mono text-xs font-bold text-slate-500">{item.sku}</div>
                      <div className="font-semibold text-slate-900">{item.productName}</div>
                      <div className="text-[10px] text-slate-400">{item.category}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-800">{item.supplierName}</div>
                      <div className="text-[10px] text-slate-400">Despacho en ~{item.leadTimeDays} días</div>
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-red-600">
                      {item.currentStock} un.
                    </td>
                    <td className="px-4 py-3 text-center text-slate-500">
                      {item.minStock} un.
                    </td>
                    <td className="px-4 py-3 text-center text-slate-500">
                      {item.idealStock} un.
                    </td>
                    <td className="px-4 py-3 text-center font-black text-indigo-700 bg-indigo-50/40 text-sm">
                      +{item.suggestedQuantity} un.
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-slate-700">
                      {formatCOP(item.unitCost)}
                    </td>
                    <td className="px-4 py-3 text-right font-black text-slate-900">
                      {formatCOP(item.subtotal)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Historial de Órdenes Emitidas */}
      {historicalOrders && historicalOrders.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center">
            <Receipt className="w-4 h-4 mr-2 text-indigo-600" />
            Órdenes de Compra Emitidas Formalmente ({historicalOrders.length})
          </h3>
          <div className="divide-y divide-slate-100">
            {historicalOrders.map((o) => (
              <div key={o.id} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-mono font-bold text-slate-900 mr-2">{o.orderNumber}</span>
                  <span className="text-slate-500 font-medium">Fecha: {o.orderDate}</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">{o.notes}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-900 block">{formatCOP(o.totalAmount)}</span>
                  <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    {o.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

