import React from 'react';

export default function StatusBadge({ type, label }) {
  if (type === 'critical') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
        <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-red-500"></span>
        {label || 'Crítico'}
      </span>
    );
  }
  if (type === 'warning') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
        <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-amber-500"></span>
        {label || '> 90 días'}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
      <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-emerald-500"></span>
      {label || 'Óptimo'}
    </span>
  );
}

export function formatCOP(val) {
  if (val === null || val === undefined) return '$ 0';
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(val);
}

