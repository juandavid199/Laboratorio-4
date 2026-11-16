# PRODUCT REQUIREMENT DOCUMENT (PRD)
## TechInventory & CashFlow: Sistema de Gestión de Inventario TI y Cierre Mensual de Flujo de Caja

---

### 1. Información General del Proyecto
- **Nombre del Producto:** TechInventory & CashFlow
- **Organización / Negocio:** Almacén y Distribuidor de Suministros Informáticos y Soluciones TI (computadores, portátiles corporativos, servidores, componentes, software empresarial, redes y energía/UPS).
- **Asignatura / Contexto:** Fundamentos de Sistemas de Información – Práctica Guiada Asistida por IA.
- **Versión del Documento:** 1.0 (Definitivo MVP)
- **Estado:** Aprobado para Implementación

---

### 2. Definición del Problema de Negocio
Como dueño y director de operaciones de un negocio comercializador de soluciones y suministros informáticos, al llegar el cierre de cada mes el equipo directivo enfrenta una grave falta de visibilidad integrada entre:
1. **Capital inmovilizado en bodega:** Altos volúmenes de inventario acumulado en productos con más de 90 días de rotación (riesgo inminente de obsolescencia y devaluación tecnológica).
2. **Quiebres de stock en productos de alta demanda:** Pérdida de oportunidades comerciales y ventas frustradas en equipos críticos por carecer de alertas tempranas cuando el stock cae por debajo del umbral mínimo.
3. **Incertidumbre en la liquidez disponible para reabastecimiento:** Dificultad para saber con precisión cuánta liquidez neta queda disponible tras deducir los compromisos exigibles con proveedores (pasivos a corto plazo) y reservas operativas fijas.
4. **Falta de asistencia cuantitativa para emitir órdenes de compra:** Las sugerencias de reabastecimiento se hacen manualmente, sin cruzar los tiempos de entrega (*lead times*) de los proveedores ni verificar si el costo de la compra supera la capacidad financiera real del almacén.

---

### 3. Objetivos del Producto y Métricas de Éxito

#### 3.1 Objetivos de Negocio
- Consolidar en un único tablero ejecutivo los indicadores maestros de salud financiera y existencias para el cierre fiscal mensual.
- Automatizar la detección y categorización del inventario en estado crítico (≤ stock mínimo) y de baja rotación (> 90 días).
- Proveer un motor de cálculo inteligente que genere órdenes de compra sugeridas basadas en stock ideal y capacidad de pago.

#### 3.2 Métricas de Éxito de Referencia (KPIs de Evaluación)
- **Reducción del tiempo de cierre mensual:** Disminuir en un 70% el tiempo requerido para conciliar stock, pasivos y presupuesto de compras de fin de mes.
- **Reducción de quiebres de inventario:** Disminuir en un 80% los incidentes de inventario agotado en productos corporativos clave.
- **Precisión del flujo de caja:** 100% de órdenes de compra emitidas dentro de la capacidad de pago real disponible, evitando mora financiera.
- **Adopción de recomendaciones del sistema:** Lograr que al menos el 75% de las órdenes de compra formalizadas provengan de sugerencias del motor de reorden.

---

### 4. Usuarios y Arquetipos (Personas)

| Rol de Usuario | Responsabilidades Principales | Necesidades Clave en la Aplicación |
| :--- | :--- | :--- |
| **Dueño / Gerente General** | Toma decisiones estratégicas, aprueba desembolsos y revisa el balance general de mes. | Dashboard sintético, saldo en bancos, cuentas por pagar y capacidad neta de reorden. |
| **Jefe de Compras y Proveedores** | Negocia con proveedores mayoristas, analiza tiempos de entrega y cotizaciones. | Directorio con Lead Time, rating de cumplimiento y costo comparativo de reabastecimiento. |
| **Administrador de Almacén e Inventario** | Controla entradas/salidas, audita existencias y verifica rotación y obsolescencia. | Catálogo filtrable por SKU/marca/categoría, alerta de stock crítico y actualización ágil de existencias. |

---

### 5. Alcance de la Solución (Scope)

#### 5.1 En el Alcance (MVP Prototipo)
- **Módulo 1: Tablero de Cierre Mensual y Salud Financiera:**
  - Capital inmovilizado en inventario (al costo).
  - Saldo disponible en cuentas bancarias.
  - Compromisos pendientes de pago con proveedores (pasivos).
  - Capacidad neta calculada de reorden: `Capacidad = Saldo Bancos - Pasivos Pendientes - Reserva Operativa`.
  - Distribución del capital inmovilizado por categoría tecnológica.
  - Accesos directos a inventario crítico y en obsolescencia.
- **Módulo 2: Catálogo e Inventario Tecnológico:**
  - Búsqueda en tiempo real por SKU, nombre del equipo y marca.
  - Filtro por categorías tecnológicas (Portátiles, Servidores, Componentes, Redes, Software, Monitores, Periféricos, Energía).
  - Filtros rápidos de estado: Todos, Críticos (Stock ≤ Mínimo), >90 Días en Almacén.
  - Vista en tabla con costo unitario, precio de venta, margen, días de inventario y stock mínimo/ideal.
  - Operación de ajuste/actualización de existencias de almacén.
- **Módulo 3: Directorio de Proveedores Mayoristas:**
  - Registro de proveedores especializados del sector IT (Ingram Micro, Nexsys, MPS, Makro Cómputo, TD SYNNEX).
  - Tiempos promedio de despacho (*lead time* en días), calificación de cumplimiento (1 a 5 estrellas), contactos y catálogo abastecido.
- **Módulo 4: Motor de Reorden y Órdenes Sugeridas:**
  - Identificación automática de productos que requieren pedido urgente.
  - Cálculo de cantidad a sugerir: `Cant. Sugerida = Stock Ideal - Stock Actual`.
  - Comparador financiero en vivo: Costo total del pedido frente a la capacidad de reorden.
  - Flujo de aprobación formal y registro histórico de órdenes emitidas.

#### 5.2 Fuera del Alcance Inicial (Exclusiones Deliberadas)
- Facturación electrónica con la DIAN u organismos tributarios.
- Módulo contable completo o sustitución del ERP contable de la empresa.
- Pasarelas de pago y comercio electrónico B2C / venta online minorista.
- Módulo de nómina, prestaciones sociales y liquidaciones laborales.
- Sistema multiusuario con autenticación (login/JWT/roles) en la fase inicial del prototipo.

---

### 6. Requisitos Funcionales (RF)

| ID | Módulo | Requisito Funcional | Criterio de Aceptación |
| :--- | :--- | :--- | :--- |
| **RF-01** | Dashboard | Cálculo consolidado de indicadores de cierre mensual. | Muestra capital de inventario, saldo disponible, pasivos y capacidad de reorden desde la API. |
| **RF-02** | Dashboard | Distribución de capital por categoría tecnológica. | Desglosa la inversión en portátiles, servidores, redes, software, etc. |
| **RF-03** | Catálogo | Consulta y listado del catálogo de productos. | Retorna el listado completo (mínimo 20 registros iniciales) con datos legibles. |
| **RF-04** | Catálogo | Búsqueda por texto libre y filtrado por categoría. | La tabla se actualiza de inmediato al escribir o seleccionar categoría. |
| **RF-05** | Catálogo | Filtro especializado de productos críticos. | Retorna únicamente productos con `stockActual <= stockMinimo`. |
| **RF-06** | Catálogo | Filtro de productos con > 90 días en almacén. | Retorna únicamente productos con `diasInventario > 90`. |
| **RF-07** | Catálogo | Modificación de existencias de un producto. | Permite actualizar el stock actual y refleja el nuevo balance inmediatamente. |
| **RF-08** | Proveedores | Directorio de proveedores mayoristas. | Muestra código, nombre, contacto, lead time en días, rating y especialidad. |
| **RF-09** | Reorden | Generación algorítmica de sugerencia de compra. | Calcula ítems a pedir, proveedor sugerido, cantidad (`ideal - actual`) y costo total. |
| **RF-10** | Reorden | Validación de suficiencia de flujo de caja. | Indica visualmente si el pedido puede costearse con la liquidez neta del cierre. |
| **RF-11** | Reorden | Aprobación y generación formal de orden. | Crea una orden de compra persistente con número único, fecha y estado APROBADA. |

---

### 7. Requisitos No Funcionales (RNF)
- **RNF-01 (Rendimiento):** Tiempos de respuesta de las peticiones REST inferiores a 200 ms bajo entorno local.
- **RNF-02 (Persistencia Efímera):** Base de datos relacional H2 en memoria (`jdbc:h2:mem:inventariodb`) que se autoinicializa con al menos 20 registros al arrancar y se reinicializa limpiamente al reiniciar.
- **RNF-03 (Usabilidad y Accesibilidad):** Interfaz responsive adaptada a resoluciones de escritorio y tabletas, basada en la paleta formal Slate/Indigo/Emerald/Amber/Red de Google Stitch.
- **RNF-04 (Manejo de Errores):** Estados vacíos explícitos, manejo de fallas de red sin bloqueo de la aplicación y retroalimentación mediante banners legibles.
- **RNF-05 (Documentación Viva):** Documentación OpenAPI 3.0 / Swagger UI accesible directamente en `/swagger-ui.html`.

---

### 8. Flujos Principales de Usuario

```
[Inicio de Sesión / Acceso]
          │
          ▼
[1. Dashboard Cierre Mensual] ──► Revisa KPIs de Liquidez, Pasivos y Capital
          │
          ├──────────────────────────┐
          ▼                          ▼
[2. Inventario y Catálogo]   [4. Motor de Reorden Sugerida]
  - Filtro Críticos (<= Min)   - Evalúa costo vs liquidez
  - Filtro >90 Días             - Aprueba Orden de Compra
  - Ajuste de Stock                     │
          │                             ▼
          ▼                     [Orden Registrada]
[3. Consulta Proveedores]
  - Lead time y contacto
```

---

### 9. Priorización de Características (Matriz MVP)
- **Must Have (Imprescindible para el MVP):**
  - Carga de los 20 datos de prueba en H2 in-memory.
  - Tablero de Cierre con los 4 KPIs maestros.
  - Filtros de productos críticos y productos >90 días.
  - Sugerencia de compra automatizada y verificación de liquidez.
  - Directorio de proveedores con Lead Time.
- **Should Have (Deseable para esta versión):**
  - Modal interactivo para actualizar stock.
  - Documentación Swagger interactiva.
  - Historial de órdenes de compra emitidas.
- **Could Have (Mejoras Futuras):**
  - Exportación de reportes de cierre en formato PDF/Excel.
  - Integración de órdenes de compra mediante correo electrónico directo al proveedor.
- **Won't Have (Descartado para esta versión):**
  - Autenticación multi-tenant o pasarelas de pago B2C.

