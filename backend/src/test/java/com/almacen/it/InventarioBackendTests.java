package com.almacen.it;

import com.almacen.it.dto.DashboardSummaryDTO;
import com.almacen.it.model.Product;
import com.almacen.it.service.DashboardService;
import com.almacen.it.service.ProductService;
import com.almacen.it.service.ReorderService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class InventarioBackendTests {

    @Autowired
    private ProductService productService;

    @Autowired
    private DashboardService dashboardService;

    @Autowired
    private ReorderService reorderService;

    @Test
    @DisplayName("Contexto Spring Boot carga correctamente")
    void contextLoads() {
        assertNotNull(productService);
        assertNotNull(dashboardService);
        assertNotNull(reorderService);
    }

    @Test
    @DisplayName("P01 & P02: Catálogo inicial cargado con al menos 20 productos tecnológicos")
    void testInitialProductsCount() {
        List<Product> products = productService.getAllProducts(null, null);
        assertTrue(products.size() >= 20, "Deben existir al menos 20 productos en memoria");
    }

    @Test
    @DisplayName("P03: Detección correcta de productos con stock crítico (<= stock mínimo)")
    void testCriticalProducts() {
        List<Product> critical = productService.getCriticalProducts();
        assertFalse(critical.isEmpty(), "Deben detectarse productos en estado crítico");
        assertEquals(4, critical.size(), "Se definieron exactamente 4 productos críticos de prueba");
        for (Product p : critical) {
            assertTrue(p.getCurrentStock() <= p.getMinStock(), "El stock actual debe ser menor o igual al mínimo");
        }
    }

    @Test
    @DisplayName("P04: Detección de productos con más de 90 días en almacén")
    void testOver90DaysProducts() {
        List<Product> over90 = productService.getProductsOver90Days();
        assertEquals(5, over90.size(), "Se definieron 5 productos con más de 90 días");
        for (Product p : over90) {
            assertTrue(p.getDaysInInventory() > 90, "Los días en inventario deben superar 90");
        }
    }

    @Test
    @DisplayName("P06: El motor de reabastecimiento calcula sugerencias para productos críticos")
    void testReorderSuggestions() {
        var suggestion = reorderService.generateReorderSuggestions();
        assertNotNull(suggestion);
        assertFalse(suggestion.getItems().isEmpty());
        assertEquals(4, suggestion.getItems().size());
        assertTrue(suggestion.getTotalOrderCost() > 0);
    }

    @Test
    @DisplayName("Dashboard financiero calcula métricas de cierre y capacidad de reorden")
    void testDashboardMetrics() {
        DashboardSummaryDTO summary = dashboardService.getDashboardSummary();
        assertNotNull(summary);
        assertTrue(summary.getInventoryCapital() > 0, "Capital inmovilizado debe ser mayor a 0");
        assertTrue(summary.getCashBalance() > 0, "Saldo de caja debe ser mayor a 0");
        assertTrue(summary.getReorderCapacity() > 0, "Capacidad de reorden calculada");
        assertEquals(4, summary.getCriticalProductsCount());
        assertEquals(5, summary.getOver90DaysProductsCount());
    }
}

