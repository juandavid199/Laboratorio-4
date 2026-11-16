package com.almacen.it.dto;

import java.util.List;

public class OrderSuggestionDTO {

    private Double totalOrderCost;
    private Double currentReorderCapacity;
    private Boolean isAffordable;
    private Double remainingCapacityAfterOrder;
    private Integer totalItemsToOrder;
    private List<OrderSuggestionItemDTO> items;
    private String financialRecommendation;

    public OrderSuggestionDTO() {
    }

    public Double getTotalOrderCost() {
        return totalOrderCost;
    }

    public void setTotalOrderCost(Double totalOrderCost) {
        this.totalOrderCost = totalOrderCost;
    }

    public Double getCurrentReorderCapacity() {
        return currentReorderCapacity;
    }

    public void setCurrentReorderCapacity(Double currentReorderCapacity) {
        this.currentReorderCapacity = currentReorderCapacity;
    }

    public Boolean getIsAffordable() {
        return isAffordable;
    }

    public void setIsAffordable(Boolean isAffordable) {
        this.isAffordable = isAffordable;
    }

    public Double getRemainingCapacityAfterOrder() {
        return remainingCapacityAfterOrder;
    }

    public void setRemainingCapacityAfterOrder(Double remainingCapacityAfterOrder) {
        this.remainingCapacityAfterOrder = remainingCapacityAfterOrder;
    }

    public Integer getTotalItemsToOrder() {
        return totalItemsToOrder;
    }

    public void setTotalItemsToOrder(Integer totalItemsToOrder) {
        this.totalItemsToOrder = totalItemsToOrder;
    }

    public List<OrderSuggestionItemDTO> getItems() {
        return items;
    }

    public void setItems(List<OrderSuggestionItemDTO> items) {
        this.items = items;
    }

    public String getFinancialRecommendation() {
        return financialRecommendation;
    }

    public void setFinancialRecommendation(String financialRecommendation) {
        this.financialRecommendation = financialRecommendation;
    }
}

