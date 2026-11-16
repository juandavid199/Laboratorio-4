package com.almacen.it.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class StockUpdateRequestDTO {

    @NotNull(message = "El nuevo stock es obligatorio")
    @Min(value = 0, message = "El stock no puede ser negativo")
    private Integer newStock;

    public StockUpdateRequestDTO() {
    }

    public StockUpdateRequestDTO(Integer newStock) {
        this.newStock = newStock;
    }

    public Integer getNewStock() {
        return newStock;
    }

    public void setNewStock(Integer newStock) {
        this.newStock = newStock;
    }
}

