package com.almacen.it.service;

import com.almacen.it.dto.DashboardSummaryDTO;
import com.almacen.it.dto.OrderSuggestionDTO;
import com.almacen.it.dto.OrderSuggestionItemDTO;
import com.almacen.it.model.*;
import com.almacen.it.repository.ProductRepository;
import com.almacen.it.repository.PurchaseOrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;

@Service
public class ReorderService {

    private final ProductRepository productRepository;
    private final PurchaseOrderRepository purchaseOrderRepository;
    private final DashboardService dashboardService;

    public ReorderService(ProductRepository productRepository, PurchaseOrderRepository purchaseOrderRepository, DashboardService dashboardService) {
        this.productRepository = productRepository;
        this.purchaseOrderRepository = purchaseOrderRepository;
        this.dashboardService = dashboardService;
    }

    public OrderSuggestionDTO generateReorderSuggestions() {
        List<Product> criticalProducts = productRepository.findCriticalStockProducts();
        DashboardSummaryDTO summary = dashboardService.getDashboardSummary();
        double reorderCapacity = summary.getReorderCapacity();

        List<OrderSuggestionItemDTO> items = new ArrayList<>();
        double totalCost = 0.0;
        int totalQuantity = 0;

        for (Product product : criticalProducts) {
            int suggestedQty = Math.max(1, product.getIdealStock() - product.getCurrentStock());
            double subtotal = suggestedQty * product.getCostPrice();
            totalCost += subtotal;
            totalQuantity += suggestedQty;

            OrderSuggestionItemDTO itemDTO = new OrderSuggestionItemDTO();
            itemDTO.setProductId(product.getId());
            itemDTO.setSku(product.getSku());
            itemDTO.setProductName(product.getName());
            itemDTO.setCategory(product.getCategory());
            itemDTO.setCurrentStock(product.getCurrentStock());
            itemDTO.setMinStock(product.getMinStock());
            itemDTO.setIdealStock(product.getIdealStock());
            itemDTO.setSuggestedQuantity(suggestedQty);
            itemDTO.setUnitCost(product.getCostPrice());
            itemDTO.setSubtotal(subtotal);

            if (product.getSupplier() != null) {
                itemDTO.setSupplierId(product.getSupplier().getId());
                itemDTO.setSupplierName(product.getSupplier().getName());
                itemDTO.setLeadTimeDays(product.getSupplier().getLeadTimeDays());
            } else {
                itemDTO.setSupplierName("Proveedor no asignado");
                itemDTO.setLeadTimeDays(3);
            }

            items.add(itemDTO);
        }

        boolean affordable = totalCost <= reorderCapacity;
        double remainingCapacity = reorderCapacity - totalCost;

        String recommendation;
        if (items.isEmpty()) {
            recommendation = "No hay productos en nivel crítico. Los niveles de inventario se encuentran dentro de los márgenes de seguridad.";
        } else if (affordable) {
            recommendation = "Recomendación viable: La orden propuesta de " + String.format("$ %,.0f", totalCost) +
                    " se encuentra totalmente respaldada por la capacidad de flujo de caja libre (" +
                    String.format("$ %,.0f", reorderCapacity) + "). Proceda a confirmar el pedido.";
        } else {
            recommendation = "Alerta de liquidez: El costo total estimado (" + String.format("$ %,.0f", totalCost) +
                    ") supera la capacidad de reorden disponible (" + String.format("$ %,.0f", reorderCapacity) +
                    "). Se sugiere priorizar únicamente los ítems de mayor margen o solicitar crédito comercial a 30 días.";
        }

        OrderSuggestionDTO dto = new OrderSuggestionDTO();
        dto.setTotalOrderCost(totalCost);
        dto.setCurrentReorderCapacity(reorderCapacity);
        dto.setIsAffordable(affordable);
        dto.setRemainingCapacityAfterOrder(remainingCapacity);
        dto.setTotalItemsToOrder(totalQuantity);
        dto.setItems(items);
        dto.setFinancialRecommendation(recommendation);

        return dto;
    }

    @Transactional
    public PurchaseOrder approveOrderSuggestion(String notes) {
        OrderSuggestionDTO suggestion = generateReorderSuggestions();
        if (suggestion.getItems().isEmpty()) {
            throw new IllegalStateException("No hay sugerencias de compra para aprobar.");
        }

        PurchaseOrder order = new PurchaseOrder();
        order.setOrderNumber("OC-" + System.currentTimeMillis() % 1000000);
        order.setOrderDate(LocalDate.now());
        order.setStatus("APPROVED");
        order.setTotalAmount(suggestion.getTotalOrderCost());
        order.setNotes(notes != null && !notes.isBlank() ? notes : "Orden de compra generada automáticamente por el motor de sugerencias de cierre mensual");

        List<PurchaseOrderItem> orderItems = new ArrayList<>();
        for (OrderSuggestionItemDTO itemDTO : suggestion.getItems()) {
            Product product = productRepository.findById(itemDTO.getProductId()).orElse(null);
            if (product != null) {
                PurchaseOrderItem item = new PurchaseOrderItem(
                        product,
                        itemDTO.getSuggestedQuantity(),
                        itemDTO.getUnitCost(),
                        itemDTO.getSubtotal(),
                        order
                );
                orderItems.add(item);
                if (order.getSupplier() == null && product.getSupplier() != null) {
                    order.setSupplier(product.getSupplier());
                }
            }
        }
        order.setItems(orderItems);

        return purchaseOrderRepository.save(order);
    }

    public List<PurchaseOrder> getAllOrders() {
        return purchaseOrderRepository.findAll();
    }
}

