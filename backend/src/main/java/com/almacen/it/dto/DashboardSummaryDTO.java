package com.almacen.it.dto;

import java.util.List;
import java.util.Map;

public class DashboardSummaryDTO {

    private String period;
    private Double inventoryCapital; // Costo total inventario
    private Double potentialSalesValue; // Valor de venta proyectado
    private Double projectedGrossMargin; // Margen bruto proyectado
    private Double cashBalance; // Dinero en caja/banco
    private Double pendingLiabilities; // Cuentas por pagar a proveedores
    private Double reorderCapacity; // Margen libre para órdenes de compra
    private Integer totalProducts;
    private Integer criticalProductsCount;
    private Integer over90DaysProductsCount;
    private Map<String, Double> capitalByCategory;
    private List<String> strategicAlerts;

    public DashboardSummaryDTO() {
    }

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    public Double getInventoryCapital() {
        return inventoryCapital;
    }

    public void setInventoryCapital(Double inventoryCapital) {
        this.inventoryCapital = inventoryCapital;
    }

    public Double getPotentialSalesValue() {
        return potentialSalesValue;
    }

    public void setPotentialSalesValue(Double potentialSalesValue) {
        this.potentialSalesValue = potentialSalesValue;
    }

    public Double getProjectedGrossMargin() {
        return projectedGrossMargin;
    }

    public void setProjectedGrossMargin(Double projectedGrossMargin) {
        this.projectedGrossMargin = projectedGrossMargin;
    }

    public Double getCashBalance() {
        return cashBalance;
    }

    public void setCashBalance(Double cashBalance) {
        this.cashBalance = cashBalance;
    }

    public Double getPendingLiabilities() {
        return pendingLiabilities;
    }

    public void setPendingLiabilities(Double pendingLiabilities) {
        this.pendingLiabilities = pendingLiabilities;
    }

    public Double getReorderCapacity() {
        return reorderCapacity;
    }

    public void setReorderCapacity(Double reorderCapacity) {
        this.reorderCapacity = reorderCapacity;
    }

    public Integer getTotalProducts() {
        return totalProducts;
    }

    public void setTotalProducts(Integer totalProducts) {
        this.totalProducts = totalProducts;
    }

    public Integer getCriticalProductsCount() {
        return criticalProductsCount;
    }

    public void setCriticalProductsCount(Integer criticalProductsCount) {
        this.criticalProductsCount = criticalProductsCount;
    }

    public Integer getOver90DaysProductsCount() {
        return over90DaysProductsCount;
    }

    public void setOver90DaysProductsCount(Integer over90DaysProductsCount) {
        this.over90DaysProductsCount = over90DaysProductsCount;
    }

    public Map<String, Double> getCapitalByCategory() {
        return capitalByCategory;
    }

    public void setCapitalByCategory(Map<String, Double> capitalByCategory) {
        this.capitalByCategory = capitalByCategory;
    }

    public List<String> getStrategicAlerts() {
        return strategicAlerts;
    }

    public void setStrategicAlerts(List<String> strategicAlerts) {
        this.strategicAlerts = strategicAlerts;
    }
}

