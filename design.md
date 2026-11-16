# GUÍA DE DISEÑO DE INTERFAZ (DESIGN SYSTEM)
## Proyecto: TechInventory & CashFlow (Almacén de Suministros IT)

Inspirado en los principios de diseño limpio, profesional y accesible de **Google Stitch**.

---

## 1. Paleta de Colores

### 1.1 Colores Principales (Brand & Base)
- **Primary / Slate Blue:** `#1E293B` (Slate-800) - Barra de navegación, encabezados y texto principal.
- **Brand Accent / Electric Indigo:** `#4F46E5` (Indigo-600) - Botones primarios, enlaces activos y foco de elementos.
- **Brand Accent Hover:** `#4338CA` (Indigo-700).
- **Background App:** `#F8FAFC` (Slate-50) - Fondo general de la aplicación.
- **Card / Surface Background:** `#FFFFFF` - Contenedores de KPIs, tablas y modales.
- **Border / Divider:** `#E2E8F0` (Slate-200) - Separadores sutiles y bordes de tarjetas.

### 1.2 Colores Semánticos y de Estado (Feedback & Alerts)
- **Success / Salud Financiera Favorable:** 
  - Fondo: `#ECFDF5` (Emerald-50)
  - Borde: `#A7F3D0` (Emerald-200)
  - Texto: `#065F46` (Emerald-800)
  - Indicador: `#10B981` (Emerald-500)
- **Warning / Obsolescencia y Atención (>90 días):** 
  - Fondo: `#FFFBEB` (Amber-50)
  - Borde: `#FDE68A` (Amber-200)
  - Texto: `#92400E` (Amber-800)
  - Indicador: `#F59E0B` (Amber-500)
- **Danger / Quiebre de Stock Crítico (<= Stock Mínimo) o Flujo Negativo:** 
  - Fondo: `#FEF2F2` (Red-50)
  - Borde: `#FECACA` (Red-200)
  - Texto: `#991B1B` (Red-800)
  - Indicador: `#EF4444` (Red-500)
- **Info / Estado Neutral o Sugerido:** 
  - Fondo: `#EFF6FF` (Blue-50)
  - Borde: `#BFDBFE` (Blue-200)
  - Texto: `#1E40AF` (Blue-800)

---

## 2. Tipografía y Escala de Texto

- **Fuente Principal:** Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif.
- **H1 (Títulos de Módulo):** `text-2xl` (24px) / `font-bold` / `#0F172A`
- **H2 (Secciones y Títulos de Tarjeta):** `text-lg` (18px) / `font-semibold` / `#1E293B`
- **KPI Number (Números Clave):** `text-3xl` (30px) / `font-extrabold` / `#0F172A`
- **Body Regular:** `text-sm` (14px) / `font-normal` / `#334155`
- **Caption / Meta / Badges:** `text-xs` (12px) / `font-medium` / `#64748B`

---

## 3. Componentes Visuales

### 3.1 Tarjetas de KPI (Dashboard Cards)
- Borde sutil `1px solid #E2E8F0`, esquina redondeada `rounded-xl` (12px).
- Sombra suave `shadow-sm` con transición al hover.
- Icono temático con contenedor circular en color pastel contrastante.
- Tendencia o comparador porcentual en píldora (*badge*).

### 3.2 Tablas de Datos
- Cabecera en gris tenue `#F8FAFC` con texto en mayúsculas pequeñas `uppercase tracking-wider text-xs font-semibold`.
- Filas alternas o con efecto hover `#F1F5F9`.
- Columnas numéricas (costos, precios, stock) alineadas a la derecha con formato monetario estandarizado (`$ COP / USD`).
- Etiquetas de estado tipo Pill (`rounded-full px-2.5 py-0.5 text-xs font-semibold`).

### 3.3 Botones y Formularios
- **Botón Primario:** Fondo Indigo `#4F46E5`, texto blanco, esquinas `rounded-lg`, padding `px-4 py-2 text-sm font-medium`, sombra sutil.
- **Botón Secundario / Filtro:** Fondo blanco `#FFFFFF`, borde `#D1D5DB`, texto `#374151`, hover `#F9FAFB`.
- **Botón de Filtro Activo:** Fondo Indigo-50 `#EEF2FF`, texto e icono Indigo-700 `#4338CA`, borde Indigo-300.
- **Inputs de Formulario:** Altura 40px, borde `#D1D5DB`, foco en `#6366F1` con anillo suave `ring-2 ring-indigo-100`.

---

## 4. Vistas Diseñadas (Mockups Stitch)

1. **Dashboard de Cierre Mensual:** Resumen general de 4 métricas financieras maestras, alerta de flujo de caja, distribución de capital inmovilizado por categoría de TI y accesos directos.
2. **Catálogo de Inventario Tecnológico:** Barra de búsqueda, selector de categoría, conmutadores de filtros rápidos (`Todos`, `Críticos <= Mínimo`, `> 90 Días en Almacén`) y tabla enriquecida.
3. **Directorio de Proveedores Mayoristas:** Tarjetas y tabla comparativa con Lead Time (días), rating de cumplimiento, catálogo asociado y contacto directo.
4. **Módulo de Órdenes Sugeridas:** Vista de cálculo inteligente de reorden, comparador de costo de compra frente a capacidad de liquidez, y acción de aprobación en un clic.

