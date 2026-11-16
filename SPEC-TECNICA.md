# ESPECIFICACIÓN TÉCNICA DE ARQUITECTURA E IMPLEMENTACIÓN
## Proyecto: TechInventory & CashFlow (Almacén de Suministros IT)

---

### 1. Visión General de la Arquitectura
El sistema adopta una arquitectura desacoplada Cliente-Servidor estructurada en capas limpias (*Layered Architecture*), asegurando la separación rigurosa de responsabilidades:
- **Capa de Presentación (Frontend SPA):** React 18 con Vite, Tailwind CSS y componentes modulares basados en el sistema de diseño Google Stitch.
- **Capa de Controladores (REST Controllers):** Endpoints HTTP versionados en `/api/v1/*` con DTOs de entrada/salida y validaciones mediante Jakarta Validation.
- **Capa de Negocio (Service Layer):** Lógica del dominio, cálculo de métricas financieras de cierre mensual, evaluación algorítmica de reorden y reglas de negocio.
- **Capa de Persistencia (Spring Data JPA):** Repositorios con consultas tipadas y personalizadas mediante JPQL / derivadas por convención.
- **Base de Datos (H2 In-Memory):** Almacenamiento relacional en memoria volátil, configurado con inicialización automática de 20 productos de prueba y 5 proveedores.

---

### 2. Stack Tecnológico y Versiones Verificadas

| Componente | Tecnología | Versión | Propósito / Responsabilidad |
| :--- | :--- | :--- | :--- |
| **Lenguaje Backend** | Java OpenJDK | 21 (LTS) / 24 | Entorno de ejecución y compilación del backend. |
| **Framework Backend** | Spring Boot | 3.2.5 | Núcleo de la API REST, inyección de dependencias y configuración. |
| **Acceso a Datos** | Spring Data JPA / Hibernate | 6.4.4.Final | ORM y mapeo objeto-relacional. |
| **Base de Datos** | H2 Database | 2.2.224 | Motor relacional en memoria (`jdbc:h2:mem:inventariodb`). |
| **Documentación API**| SpringDoc OpenAPI / Swagger | 2.5.0 | Especificación OpenAPI 3 y consola web interactiva `/swagger-ui.html`. |
| **Herramienta Construcción** | Apache Maven / mvnw | 3.10.0 / 3.9 | Empaquetado y gestión de dependencias del backend. |
| **Framework Frontend** | React | 18.3.1 | Interfaz de usuario reactiva orientada a componentes. |
| **Bundler / DevServer** | Vite | 5.2.11 | Compilador ultra-rápido y servidor de desarrollo HMR. |
| **Diseño y Estilos** | Tailwind CSS | 3.4.3 | Sistema de diseño utilitario alineado con `design.md`. |
| **Iconografía** | Lucide React | 0.378.0 | Iconos limpios, consistentes y de baja huella. |

---

### 3. Modelo de Datos y Entidades JPA

```
┌─────────────────────────┐           1:N           ┌──────────────────────────────┐
│        Supplier         │ ◄───────────────────────┤           Product            │
├─────────────────────────┤                         ├──────────────────────────────┤
│ id: Long (PK)           │                         │ id: Long (PK)                │
│ code: String (UK)       │                         │ sku: String (UK)             │
│ name: String            │                         │ name: String                 │
│ contactName: String     │                         │ brand: String                │
│ contactEmail: String    │                         │ category: String             │
│ contactPhone: String    │                         │ subCategory: String          │
│ rating: Double          │                         │ unitCost: Double             │
│ leadTimeDays: Integer   │                         │ salePrice: Double            │
│ specialty: String       │                         │ currentStock: Integer        │
└─────────────────────────┘                         │ minStock: Integer            │
                                                    │ idealStock: Integer          │
┌─────────────────────────┐                         │ daysInInventory: Integer     │
│    FinancialSnapshot    │                         │ supplier: Supplier (FK)      │
├─────────────────────────┤                         └──────────────┬───────────────┘
│ id: Long (PK)           │                                        │
│ periodName: String      │                                        │ 1:N
│ cashBalance: Double     │                                        ▼
│ pendingLiabilities: Dbl │                         ┌──────────────────────────────┐
│ operatingReserve: Double│                         │      PurchaseOrderItem       │
└─────────────────────────┘                         ├──────────────────────────────┤
                                                    │ id: Long (PK)                │
┌─────────────────────────┐           1:N           │ purchaseOrder: PurchaseOrder │
│      PurchaseOrder      │ ◄───────────────────────┤ product: Product             │
├─────────────────────────┤                         │ quantity: Integer            │
│ id: Long (PK)           │                         │ unitCost: Double             │
│ orderNumber: String(UK) │                         │ subtotal: Double             │
│ orderDate: LocalDate    │                         └──────────────────────────────┘
│ totalAmount: Double     │
│ status: String          │
│ notes: String           │
└─────────────────────────┘
```

#### Restricciones e Índices
- `Product.sku`: Clave única para evitar códigos duplicados en inventario.
- `Supplier.code`: Clave única de proveedor (`PRV-01`, `PRV-02`, etc.).
- `PurchaseOrder.orderNumber`: Clave única generada formalmente (`OC-YYYYMMDD-XXXX`).
- Relación `Product` ➔ `Supplier`: `@ManyToOne(fetch = FetchType.EAGER)`.
- Relación `PurchaseOrder` ➔ `PurchaseOrderItem`: `@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)`.

---

### 4. Catálogo de Rutas API REST

| Módulo | Método | Endpoint | Descripción | Códigos HTTP |
| :--- | :--- | :--- | :--- | :--- |
| **Dashboard** | `GET` | `/api/v1/dashboard/summary` | Retorna los 4 KPIs financieros de cierre, conteo de críticos y desglose de capital por categoría. | 200 OK |
| **Productos** | `GET` | `/api/v1/products` | Lista catálogo tecnológico. Soporta parámetros opcionales `?search=` y `?category=`. | 200 OK |
| **Productos** | `GET` | `/api/v1/products/critical` | Filtra productos con quiebre de stock (`currentStock <= minStock`). | 200 OK |
| **Productos** | `GET` | `/api/v1/products/over90days` | Filtra productos en riesgo de obsolescencia (`daysInInventory > 90`). | 200 OK |
| **Productos** | `GET` | `/api/v1/products/{id}` | Retorna el detalle completo de un producto por su ID. | 200 OK, 404 Not Found |
| **Productos** | `POST`| `/api/v1/products` | Crea un nuevo producto validado en catálogo. | 201 Created, 400 Bad Request |
| **Productos** | `PUT` | `/api/v1/products/{id}/stock` | Actualiza la cantidad física de existencias de un producto. | 200 OK, 400 Bad Request |
| **Proveedores**| `GET` | `/api/v1/suppliers` | Directorio de proveedores mayoristas con Lead Time y rating. | 200 OK |
| **Proveedores**| `GET` | `/api/v1/suppliers/{id}` | Retorna información de contacto y términos de un proveedor. | 200 OK, 404 Not Found |
| **Reorden** | `GET` | `/api/v1/reorder/suggestions`| Calcula algorítmicamente la lista de compras sugeridas y valida suficiencia de liquidez. | 200 OK |
| **Reorden** | `POST`| `/api/v1/reorder/approve` | Formaliza la sugerencia aprobada, registrando una nueva `PurchaseOrder`. | 201 Created, 400 Bad Request |
| **Reorden** | `GET` | `/api/v1/reorder/orders` | Historial de órdenes de compra emitidas en el sistema. | 200 OK |

---

### 5. Algoritmo del Motor de Reorden y Capacidad Financiera
1. **Detección:** Se consultan los productos donde `currentStock <= minStock`.
2. **Cálculo de Cantidad a Pedir:**
   $$\text{Cantidad a Pedir} = \text{idealStock} - \text{currentStock}$$
3. **Cálculo de Inversión por Producto:**
   $$\text{Subtotal} = \text{Cantidad a Pedir} \times \text{unitCost}$$
4. **Costo Total del Pedido:**
   $$\text{Costo Total} = \sum \text{Subtotal}$$
5. **Evaluación de Flujo de Caja (Capacidad de Reorden):**
   $$\text{Capacidad Reorden} = \text{Saldo Bancos} - \text{Pasivos Exigibles} - \text{Reserva Operativa}$$
   $$\text{canAfford} = (\text{Costo Total} \le \text{Capacidad Reorden})$$

---

### 6. Configuración de Base de Datos H2 In-Memory
Configuración en `application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:h2:mem:inventariodb;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE
    driverClassName: org.h2.Driver
    username: sa
    password: password
  jpa:
    database-platform: org.hibernate.dialect.H2Dialect
    hibernate:
      ddl-auto: create-drop
  h2:
    console:
      enabled: true
      path: /h2-console
```
- **Datos Iniciales (`DataInitializer.java`):**
  - **5 Proveedores:** Ingram Micro, Nexsys, MPS, Makro Cómputo, TD SYNNEX.
  - **20 Productos Tecnológicos:** Exactamente 4 críticos (`<= minStock`), 5 en riesgo de obsolescencia (`> 90 días`) y 11 en rotación regular.
  - **Balance de Cierre Noviembre 2026:**
    - Saldo Disponible en Bancos: \$38,500,000 COP
    - Pasivos / Facturas Pendientes: \$16,800,000 COP
    - Reserva Operativa Fija: \$7,500,000 COP
    - Capacidad Neta de Reorden: \$14,200,000 COP

---

### 7. Plan de Pruebas y Matriz de Verificación (P01 - P10)

| ID | Prueba Funcional | Endpoint / Componente Evaluado | Resultado Esperado | Estado de Verificación |
| :--- | :--- | :--- | :--- | :--- |
| **P01** | Abrir Dashboard de Cierre | `GET /api/v1/dashboard/summary` | Se muestran los 4 KPIs maestros con valores consolidados. | **APROBADO** |
| **P02** | Consultar Catálogo de Productos | `GET /api/v1/products` | Listado completo de 20 productos con SKU, costos y existencias legibles. | **APROBADO** |
| **P03** | Filtrar Productos Críticos | `GET /api/v1/products/critical` | Retorna exactamente los 4 productos con `stockActual <= minStock`. | **APROBADO** |
| **P04** | Filtrar Productos &gt; 90 Días | `GET /api/v1/products/over90days` | Retorna exactamente los 5 productos con antigüedad superior a 90 días. | **APROBADO** |
| **P05** | Consultar Directorio de Proveedores | `GET /api/v1/suppliers` | Muestra 5 proveedores con Lead Time, rating y contacto directo. | **APROBADO** |
| **P06** | Generar Sugerencia de Reorden | `GET /api/v1/reorder/suggestions` | Cálculo algorítmico de 4 ítems con subtotal y validación de liquidez. | **APROBADO** |
| **P07** | Manejo de Error o Estado Vacío | Fallo simulado / búsqueda sin coincidencia | Interfaz muestra banner de reintento y estado vacío sin bloquearse. | **APROBADO** |
| **P08** | Validación de Formularios | `PUT /api/v1/products/{id}/stock` | Campos numéricos obligatorios y restricciones de stock validadas. | **APROBADO** |
| **P09** | Recarga y Reinicialización H2 | Reinicio de la aplicación | Comportamiento in-memory: se restablecen los 20 datos iniciales limpios. | **APROBADO** |
| **P10** | Diseño Adaptable (Responsive) | Tailwind Breakpoints (sm, md, lg, xl) | Navegación, tablas con scroll horizontal y tarjetas apilables. | **APROBADO** |

