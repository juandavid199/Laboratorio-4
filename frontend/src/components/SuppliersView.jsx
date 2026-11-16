import React from 'react';
import { Users, Truck, Star, Phone, Mail, PackageCheck, Layers } from 'lucide-react';

export default function SuppliersView({ suppliers, products, onFilterSupplier, loading }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Directorio de Proveedores Mayoristas
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Gestión de aliados estratégicos, tiempos de entrega (Lead Time), calificación y catálogo asociado.
          </p>
        </div>
        <div className="text-xs text-slate-500 font-semibold bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto">
          {suppliers.length} Proveedores Mayoristas Activos
        </div>
      </div>

      {/* Grid de Proveedores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {suppliers.map((s) => {
          // Contar productos asociados a este proveedor
          const associatedProducts = products.filter(
            (p) => p.supplier && p.supplier.id === s.id
          );

          return (
            <div
              key={s.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      {s.code}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1.5">{s.name}</h3>
                    <p className="text-xs text-slate-500 font-medium">{s.specialty || 'Distribución de TI'}</p>
                  </div>
                  <div className="flex items-center text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-200">
                    <Star className="w-3.5 h-3.5 mr-1 fill-amber-500 text-amber-500" />
                    {s.rating ? s.rating.toFixed(1) : '4.5'}
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <div className="flex items-center text-slate-500">
                    <Truck className="w-4 h-4 mr-2 text-slate-400 shrink-0" />
                    <span>Tiempo de Entrega: <strong className="text-slate-800">{s.leadTimeDays || 3} días</strong></span>
                  </div>
                  <div className="flex items-center text-slate-500">
                    <Mail className="w-4 h-4 mr-2 text-slate-400 shrink-0" />
                    <span className="truncate">{s.contactEmail || 'contacto@proveedor.com'}</span>
                  </div>
                  <div className="flex items-center text-slate-500">
                    <Phone className="w-4 h-4 mr-2 text-slate-400 shrink-0" />
                    <span>{s.contactPhone || '+57 601 000 0000'}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  {associatedProducts.length} productos suministrados
                </span>
                <button
                  onClick={() => onFilterSupplier(s)}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition"
                >
                  Ver Catálogo &rarr;
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

