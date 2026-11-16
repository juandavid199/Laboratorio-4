package com.almacen.it.service;

import com.almacen.it.dto.DashboardSummaryDTO;
import com.almacen.it.model.FinancialSnapshot;
import com.almacen.it.model.Product;
import com.almacen.it.repository.FinancialSnapshotRepository;
import com.almacen.it.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final ProductRepository productRepository;
    private final FinancialSnapshotRepository financialSnapshotRepository;

    public DashboardService(ProductRepository productRepository, FinancialSnapshotRepository financialSnapshotRepository) {
        this.productRepository = productRepository;
        this.financialSnapshotRepository = financialSnapshotRepository;
    }

    public DashboardSummaryDTO getDashboardSummary() {
        List<Product> allProducts = productRepository.findAll();
        List<Product> criticalProducts = productRepository.findCriticalStockProducts();
        List<Product> over90DaysProducts = productRepository.findProductsWithDaysInInventoryGreaterThan(90);

        FinancialSnapshot snapshot = financialSnapshotRepository.findFirstByOrderBySnapshotDateDesc()
                .orElse(new FinancialSnapshot("Periodo Actual", 35000000.0, 15000000.0, 6000000.0));

        double totalCapital = allProducts.stream()
                .mapToDouble(p -> (p.getCurrentStock() != null && p.getCostPrice() != null) ? p.getCurrentStock() * p.getCostPrice() : 0.0)
                .sum();

        double totalPotentialSales = allProducts.stream()
                .mapToDouble(p -> (p.getCurrentStock() != null && p.getSellingPrice() != null) ? p.getCurrentStock() * p.getSellingPrice() : 0.0)
                .sum();

        double grossMargin = totalPotentialSales - totalCapital;

        double cashBalance = snapshot.getCashBalance() != null ? snapshot.getCashBalance() : 0.0;
        double liabilities = snapshot.getPendingLiabilities() != null ? snapshot.getPendingLiabilities() : 0.0;
        double buffer = snapshot.getFixedExpensesBuffer() != null ? snapshot.getFixedExpensesBuffer() : 0.0;

        // Capacidad segura de reorden: Saldo en caja - (Pasivos pendientes + Fondo gastos fijos)
        double reorderCapacity = Math.max(0.0, cashBalance - (liabilities + buffer));

        // Capital por categoría
        Map<String, Double> capitalByCategory = allProducts.stream()
                .collect(Collectors.groupingBy(
                        p -> p.getCategory() != null ? p.getCategory() : "Otros",
                        Collectors.summingDouble(p -> (p.getCurrentStock() != null && p.getCostPrice() != null) ? p.getCurrentStock() * p.getCostPrice() : 0.0)
                ));

        // Alertas estratégicas
        List<String> alerts = new ArrayList<>();
        if (!criticalProducts.isEmpty()) {
            alerts.add("Se detectaron " + criticalProducts.size() + " productos en nivel crítico (existencias <= stock mínimo). Riesgo de quiebre de stock.");
        }
        if (!over90DaysProducts.isEmpty()) {
            alerts.add("Hay " + over90DaysProducts.size() + " productos con más de 90 días en almacén. Capital inmovilizado sujeto a obsolescencia tecnológica.");
        }
        if (reorderCapacity < 5000000.0) {
            alerts.add("Capacidad de reorden ajustada (" + String.format("$ %,.0f", reorderCapacity) + "). Priorizar únicamente compras de alta rotación.");
        } else {
            alerts.add("Flujo de caja saludable. Capacidad disponible para nuevos pedidos con proveedores: " + String.format("$ %,.0f", reorderCapacity));
        }

        DashboardSummaryDTO dto = new DashboardSummaryDTO();
        dto.setPeriod(snapshot.getPeriod());
        dto.setInventoryCapital(totalCapital);
        dto.setPotentialSalesValue(totalPotentialSales);
        dto.setProjectedGrossMargin(grossMargin);
        dto.setCashBalance(cashBalance);
        dto.setPendingLiabilities(liabilities);
        dto.setReorderCapacity(reorderCapacity);
        dto.setTotalProducts(allProducts.size());
        dto.setCriticalProductsCount(criticalProducts.size());
        dto.setOver90DaysProductsCount(over90DaysProducts.size());
        dto.setCapitalByCategory(capitalByCategory);
        dto.setStrategicAlerts(alerts);

        return dto;
    }
}

