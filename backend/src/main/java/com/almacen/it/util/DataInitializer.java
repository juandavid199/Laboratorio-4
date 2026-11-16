package com.almacen.it.util;

import com.almacen.it.model.FinancialSnapshot;
import com.almacen.it.model.Product;
import com.almacen.it.model.Supplier;
import com.almacen.it.repository.FinancialSnapshotRepository;
import com.almacen.it.repository.ProductRepository;
import com.almacen.it.repository.SupplierRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final SupplierRepository supplierRepository;
    private final ProductRepository productRepository;
    private final FinancialSnapshotRepository financialSnapshotRepository;

    public DataInitializer(SupplierRepository supplierRepository,
                           ProductRepository productRepository,
                           FinancialSnapshotRepository financialSnapshotRepository) {
        this.supplierRepository = supplierRepository;
        this.productRepository = productRepository;
        this.financialSnapshotRepository = financialSnapshotRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (supplierRepository.count() > 0) {
            return; // Ya inicializado
        }

        // 1. Inicialización de 5 Proveedores Mayoristas del sector tecnológico
        Supplier sup1 = new Supplier("PRV-01", "Ingram Micro Colombia", "Carlos Mendoza", "ventas@ingrammicro.co", "+57 601 744 1000", 4.8, 3, "Portátiles y Servidores");
        Supplier sup2 = new Supplier("PRV-02", "Nexsys de Colombia", "Marcela Gómez", "comercial@nexsys.com.co", "+57 601 800 2345", 4.6, 2, "Software y Ciberseguridad");
        Supplier sup3 = new Supplier("PRV-03", "MPS Mayorista de Colombia", "Andrés Felipe Torres", "contacto@mps.com.co", "+57 601 593 4000", 4.5, 4, "Componentes y Redes");
        Supplier sup4 = new Supplier("PRV-04", "Makro Cómputo", "Diana Marcela Silva", "corporativo@makrocomputo.com", "+57 601 419 9000", 4.3, 3, "Periféricos y Monitores");
        Supplier sup5 = new Supplier("PRV-05", "TD SYNNEX Colombia", "Javier Ricaurte", "pedidos@tdsynnex.com", "+57 601 650 8800", 4.7, 5, "Infraestructura y Energía");

        supplierRepository.saveAll(List.of(sup1, sup2, sup3, sup4, sup5));

        // 2. Inicialización de 20 Productos Tecnológicos (incluye 4 críticos y 5 con > 90 días)
        List<Product> products = List.of(
                // 1. CRÍTICO: Stock 2 <= Min 5
                new Product("PORT-001", "Portátil Dell Latitude 5440 Core i7 16GB 512GB SSD", "Dell", "Portátiles", "Corporativo",
                        3800000.0, 4600000.0, 2, 5, 15, 18, sup1),

                // 2. >90 DÍAS: 114 días
                new Product("SRV-002", "Servidor HP ProLiant DL380 Gen10 Xeon Silver 32GB", "HP Enterprise", "Servidores", "Rack 2U",
                        12500000.0, 15200000.0, 3, 1, 4, 114, sup1),

                // 3. Normal
                new Product("SSD-003", "SSD Kingston NV2 1TB NVMe PCIe 4.0 M.2", "Kingston", "Componentes", "Almacenamiento",
                        240000.0, 320000.0, 24, 8, 30, 22, sup3),

                // 4. CRÍTICO: Stock 1 <= Min 3
                new Product("NET-004", "Switch Cisco Catalyst 1000 24 Puertos Gigabit PoE+", "Cisco", "Redes", "Switches",
                        1650000.0, 2150000.0, 1, 3, 8, 35, sup3),

                // 5. >90 DÍAS: 130 días
                new Product("SFT-005", "Licencia Microsoft SQL Server 2019 Standard Edition 4 Cores", "Microsoft", "Software", "Bases de Datos",
                        5200000.0, 6400000.0, 2, 1, 3, 130, sup2),

                // 6. Normal
                new Product("MON-006", "Monitor Profesional LG UltraFine 27 Pulgadas 4K IPS", "LG", "Monitores", "Pantallas",
                        1100000.0, 1450000.0, 12, 4, 15, 45, sup4),

                // 7. CRÍTICO: Stock 3 <= Min 6
                new Product("MEM-007", "Kit Memoria RAM Corsair Vengeance 32GB (2x16GB) DDR5 5600MHz", "Corsair", "Componentes", "Memorias",
                        390000.0, 520000.0, 3, 6, 20, 28, sup3),

                // 8. Normal
                new Product("PORT-008", "Portátil Lenovo ThinkPad E14 Gen 5 Ryzen 7 16GB", "Lenovo", "Portátiles", "Ultrabook",
                        3100000.0, 3750000.0, 8, 3, 10, 30, sup1),

                // 9. >90 DÍAS: 105 días
                new Product("STR-009", "Cabina NAS Synology DiskStation DS1821+ 8 Bahías", "Synology", "Servidores", "Almacenamiento Red",
                        4300000.0, 5300000.0, 2, 1, 3, 105, sup5),

                // 10. CRÍTICO: Stock 1 <= Min 2
                new Product("UPS-010", "UPS APC Smart-UPS 1500VA LCD Torre 120V", "APC", "Energía", "UPS Corporativa",
                        1850000.0, 2390000.0, 1, 2, 6, 42, sup5),

                // 11. Normal
                new Product("CPU-011", "Procesador Intel Core i7-14700K 20 Núcleos Socket LGA1700", "Intel", "Componentes", "Procesadores",
                        1550000.0, 1950000.0, 10, 4, 12, 15, sup3),

                // 12. Normal
                new Product("PER-012", "Teclado y Mouse Inalámbrico Logitech MX Keys Combo Enterprise", "Logitech", "Periféricos", "Combos",
                        420000.0, 580000.0, 16, 5, 20, 38, sup4),

                // 13. >90 DÍAS: 125 días
                new Product("NET-013", "Router Modular Cisco ISR 4331/K9 Seguridad Gigabit", "Cisco", "Redes", "Enrutadores",
                        6100000.0, 7800000.0, 2, 1, 3, 125, sup3),

                // 14. Normal
                new Product("SFT-014", "Suscripción Microsoft 365 Business Premium Anual (10 usuarios)", "Microsoft", "Software", "Productividad",
                        2800000.0, 3350000.0, 6, 2, 8, 50, sup2),

                // 15. Normal
                new Product("SEC-015", "Firewall Fortinet FortiGate 60F con 1 Año UTM Protection", "Fortinet", "Redes", "Ciberseguridad",
                        2700000.0, 3450000.0, 4, 2, 5, 60, sup2),

                // 16. Normal
                new Product("DSK-016", "Estación de Trabajo HP Z2 Tower G9 Core i9 32GB RTX A2000", "HP Enterprise", "Workstations", "Torre",
                        7200000.0, 8900000.0, 3, 2, 4, 34, sup1),

                // 17. >90 DÍAS: 98 días
                new Product("PRN-017", "Impresora Láser Multifuncional HP LaserJet Enterprise M528dn", "HP", "Periféricos", "Impresión",
                        3400000.0, 4150000.0, 2, 1, 4, 98, sup4),

                // 18. Normal
                new Product("CAB-018", "Bobina Cable UTP Siemon Categoría 6A F/UTP 305 Metros", "Siemon", "Redes", "Cableado",
                        650000.0, 850000.0, 14, 5, 18, 20, sup3),

                // 19. Normal
                new Product("ACC-019", "Docking Station Dell Thunderbolt 4 WD22TB4 180W", "Dell", "Periféricos", "Docks",
                        920000.0, 1200000.0, 9, 3, 10, 40, sup1),

                // 20. Normal
                new Product("SFT-020", "Antivirus ESET Protect Advanced Cloud 25 Nodos Anual", "ESET", "Software", "Seguridad Endpoint",
                        1400000.0, 1850000.0, 5, 2, 6, 25, sup2)
        );

        productRepository.saveAll(products);

        // 3. Inicialización del Balance Financiero para el Cierre de Mes (Noviembre 2026)
        FinancialSnapshot snapshot = new FinancialSnapshot(
                "Noviembre 2026",
                38500000.0, // Saldo disponible en bancos
                16800000.0, // Facturas y pasivos con proveedores
                7500000.0   // Reserva gastos operativos fijos
        );
        financialSnapshotRepository.save(snapshot);
    }
}
