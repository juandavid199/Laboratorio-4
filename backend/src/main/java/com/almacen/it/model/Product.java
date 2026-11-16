package com.almacen.it.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(unique = true, nullable = false, length = 50)
    private String sku;

    @NotBlank
    @Column(nullable = false, length = 200)
    private String name;

    @Column(length = 100)
    private String brand;

    @Column(length = 100)
    private String category;

    @Column(length = 100)
    private String subcategory;

    @NotNull
    @Min(0)
    private Double costPrice;

    @NotNull
    @Min(0)
    private Double sellingPrice;

    @NotNull
    @Min(0)
    private Integer currentStock;

    @NotNull
    @Min(0)
    private Integer minStock;

    @NotNull
    @Min(0)
    private Integer idealStock;

    @NotNull
    @Min(0)
    private Integer daysInInventory;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "supplier_id")
    @JsonIgnoreProperties("products")
    private Supplier supplier;

    public Product() {
    }

    public Product(String sku, String name, String brand, String category, String subcategory,
                   Double costPrice, Double sellingPrice, Integer currentStock, Integer minStock,
                   Integer idealStock, Integer daysInInventory, Supplier supplier) {
        this.sku = sku;
        this.name = name;
        this.brand = brand;
        this.category = category;
        this.subcategory = subcategory;
        this.costPrice = costPrice;
        this.sellingPrice = sellingPrice;
        this.currentStock = currentStock;
        this.minStock = minStock;
        this.idealStock = idealStock;
        this.daysInInventory = daysInInventory;
        this.supplier = supplier;
    }

    // Métodos de conveniencia para reglas de negocio
    @Transient
    public boolean isCritical() {
        return currentStock != null && minStock != null && currentStock <= minStock;
    }

    @Transient
    public boolean isOver90Days() {
        return daysInInventory != null && daysInInventory > 90;
    }

    @Transient
    public Integer getSuggestedReorderQuantity() {
        if (isCritical() && idealStock != null && currentStock != null) {
            return Math.max(0, idealStock - currentStock);
        }
        return 0;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getSubcategory() {
        return subcategory;
    }

    public void setSubcategory(String subcategory) {
        this.subcategory = subcategory;
    }

    public Double getCostPrice() {
        return costPrice;
    }

    public void setCostPrice(Double costPrice) {
        this.costPrice = costPrice;
    }

    public Double getSellingPrice() {
        return sellingPrice;
    }

    public void setSellingPrice(Double sellingPrice) {
        this.sellingPrice = sellingPrice;
    }

    public Integer getCurrentStock() {
        return currentStock;
    }

    public void setCurrentStock(Integer currentStock) {
        this.currentStock = currentStock;
    }

    public Integer getMinStock() {
        return minStock;
    }

    public void setMinStock(Integer minStock) {
        this.minStock = minStock;
    }

    public Integer getIdealStock() {
        return idealStock;
    }

    public void setIdealStock(Integer idealStock) {
        this.idealStock = idealStock;
    }

    public Integer getDaysInInventory() {
        return daysInInventory;
    }

    public void setDaysInInventory(Integer daysInInventory) {
        this.daysInInventory = daysInInventory;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }
}

