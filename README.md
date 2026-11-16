# TechInventory & CashFlow: Sistema de Gestión de Inventario TI y Cierre Mensual

> **Práctica de Laboratorio Guiada con IA:** Fundamentos de Sistemas de Información  
> **Stack:** Spring Boot 3.2.5 (Java 21/24) + React 18 + Tailwind CSS + H2 In-Memory Database + OpenAPI/Swagger

---

## 1. Descripción del Proyecto

**TechInventory & CashFlow** es un prototipo funcional empresarial diseñado para apoyar la toma de decisiones al cierre de cada mes en una distribuidora de suministros tecnológicos (computadores, portátiles corporativos, servidores, componentes, software empresarial, redes y energía/UPS).

El sistema resuelve cuatro desafíos críticos del negocio:
1. **Visibilidad del Capital Inmovilizado:** Detección de productos de baja rotación (>90 días en almacén) con riesgo de obsolescencia.
2. **Prevención de Quiebres de Stock:** Alerta inmediata de productos en estado crítico ($\le$ stock mínimo).
3. **Control de Flujo de Caja:** Conciliación entre saldo disponible en bancos, cuentas por pagar a proveedores y reserva operativa.
4. **Motor Inteligente de Reabastecimiento:** Generación automática de órdenes de compra sugeridas comparando el costo total contra la capacidad de reorden disponible.

---

## 2. Estructura del Repositorio

```
inventario-flujo-caja/
├── PRD.md                     # Documento de Requerimientos de Producto (Aprobado)
├── SPEC-TECNICA.md            # Especificación Técnica de Arquitectura, API y BD
├── design.md                  # Sistema de Diseño y Mockups (Google Stitch)
├── README.md                  # Manual de instalación, configuración y ejecución
├── Guia_Laboratorio_IA...pdf   # Guía oficial del laboratorio
├── backend/                   # Proyecto Spring Boot 3.2.5 (Java)
│   ├── pom.xml                # Configuración Maven
│   ├── mvnw.cmd               # Maven Wrapper para Windows
│   ├── run-backend.cmd        # Script de arranque directo del backend
│   └── src/
│       ├── main/java/com/almacen/it/
│       │   ├── config/        # CORS y Swagger / OpenAPI
│       │   ├── controller/    # Dashboard, Product, Supplier, Reorder
│       │   ├── dto/           # DTOs de transferencia
│       │   ├── model/         # Entidades JPA (Product, Supplier, FinancialSnapshot, etc.)
│       │   ├── repository/    # Repositorios Spring Data JPA
│       │   ├── service/       # Lógica de negocio y cálculo financiero
│       │   └── util/          # DataInitializer (20 productos, 5 proveedores)
│       └── test/              # Pruebas unitarias e integración (P01-P06)
├── frontend/                  # Aplicación SPA React 18 + Vite
│   ├── package.json           # Dependencias y scripts frontend
│   ├── vite.config.js         # Configuración Vite
│   ├── tailwind.config.js     # Configuración Tailwind CSS
│   ├── index.html             # Entrypoint HTML
│   ├── dist/                  # Build de producción compilado
│   └── src/                   # Código fuente modular en React
│       ├── api.js             # Cliente API REST
│       ├── App.jsx            # Enrutamiento de vistas y estado
│       └── components/        # Navbar, Dashboard, Inventory, Suppliers, Reorder
└── mockups/                   # Exportación y capturas visuales de Stitch
    └── mockups_stitch.html    # Prototipo visual interactivo
```

---

## 3. Requisitos Previos

- **Java JDK:** Versión 17, 21 (LTS) o 24.
- **Node.js:** Versión 18+ (probado con Node v24.15.0).
- **npm:** Versión 9+ (probado con npm 11.12.1).
- **Navegador Web:** Chrome, Edge o Firefox actualizado.

---

## 4. Instrucciones de Ejecución

### 4.1 Ejecutar el Backend (Spring Boot + H2)

Abra una terminal en la carpeta raíz del proyecto y ejecute:

```bash
cd backend
mvnw.cmd spring-boot:run
```

*Alternativa rápida en Windows:*
```bash
cd backend
run-backend.cmd
```

El servidor iniciará en el puerto **8080**:
- **API REST Base:** `http://localhost:8080/api/v1`
- **Documentación Swagger UI:** [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- **Consola H2 Database:** [http://localhost:8080/h2-console](http://localhost:8080/h2-console)
  - **JDBC URL:** `jdbc:h2:mem:inventariodb`
  - **Usuario:** `sa`
  - **Contraseña:** `password`

> **Nota sobre H2 en memoria:** La base de datos es 100% en memoria volátil. Al reiniciar el backend, se restablecen automáticamente los 20 productos de prueba y los 5 proveedores mayoristas iniciales.

---

### 4.2 Ejecutar el Frontend (React + Vite)

Abra otra terminal en la carpeta del proyecto:

```bash
cd frontend
npm install
npm run dev
```

Abra en su navegador la URL indicada en la consola (por defecto [http://localhost:5173](http://localhost:5173)).

*Si desea previsualizar la compilación optimizada de producción:*
```bash
cd frontend
npm run preview
```

---

## 5. Matriz de Pruebas Funcionales (P01 a P10)

Todas las pruebas especificadas en la guía fueron validadas y documentadas:

| ID | Prueba | Resultado Observado | Estado |
| :--- | :--- | :--- | :---: |
| **P01** | **Abrir el Dashboard de Cierre** | Muestra los 4 KPIs financieros consolidados, alertas y distribución de capital por categoría. | ✅ APROBADO |
| **P02** | **Consultar Catálogo de Productos** | Se despliega la tabla con los 20 productos tecnológicos, SKU, precios, costos y stock actual. | ✅ APROBADO |
| **P03** | **Filtrar Productos Críticos** | El filtro rápido devuelve exactamente los 4 productos con stock actual $\le$ stock mínimo. | ✅ APROBADO |
| **P04** | **Filtrar Productos con &gt;90 Días** | El filtro rápido devuelve exactamente los 5 productos con riesgo de obsolescencia. | ✅ APROBADO |
| **P05** | **Consultar Proveedores** | Se presentan las 5 tarjetas de proveedores mayoristas con Lead Time, rating y contacto. | ✅ APROBADO |
| **P06** | **Generar Sugerencia de Compra** | El motor calcula las cantidades a comprar, subtotales y compara el total contra la capacidad de reorden. | ✅ APROBADO |
| **P07** | **Probar Datos Vacíos o Error de API** | La interfaz muestra un banner claro de aviso con botón de reintento sin congelarse. | ✅ APROBADO |
| **P08** | **Validar Formularios** | Modal de actualización de stock valida que sean números válidos y actualiza el backend. | ✅ APROBADO |
| **P09** | **Recargar y Reiniciar** | Se verifica que H2 restablece los datos base limpios al reiniciar el backend. | ✅ APROBADO |
| **P10** | **Revisar Diseño Adaptable** | La interfaz mantiene total legibilidad en resoluciones móviles, tablets y monitores anchos. | ✅ APROBADO |

---

## 6. Endpoints Principales de la API REST

- `GET /api/v1/dashboard/summary` — Resumen ejecutivo financiero de cierre.
- `GET /api/v1/products` — Catálogo general con búsqueda y filtro de categoría.
- `GET /api/v1/products/critical` — Listado de productos con quiebre de stock.
- `GET /api/v1/products/over90days` — Listado de productos con más de 90 días en bodega.
- `PUT /api/v1/products/{id}/stock` — Actualización física de existencias.
- `GET /api/v1/suppliers` — Directorio de proveedores mayoristas.
- `GET /api/v1/reorder/suggestions` — Sugerencia algorítmica de órdenes de compra.
- `POST /api/v1/reorder/approve` — Aprobación y emisión formal de orden de compra.
- `GET /api/v1/reorder/orders` — Historial de órdenes generadas.

