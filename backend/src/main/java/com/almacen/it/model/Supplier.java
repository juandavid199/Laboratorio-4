package com.almacen.it.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "suppliers")
public class Supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(unique = true, nullable = false, length = 30)
    private String code;

    @NotBlank
    @Column(nullable = false, length = 150)
    private String name;

    @Column(length = 100)
    private String contactName;

    @Column(length = 100)
    private String email;

    @Column(length = 30)
    private String phone;

    private Double rating; // 1.0 a 5.0

    private Integer leadTimeDays; // Días de entrega promedio

    @Column(length = 150)
    private String mainCategory;

    @OneToMany(mappedBy = "supplier", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("supplier")
    private List<Product> products = new ArrayList<>();

    public Supplier() {
    }

    public Supplier(String code, String name, String contactName, String email, String phone, Double rating, Integer leadTimeDays, String mainCategory) {
        this.code = code;
        this.name = name;
        this.contactName = contactName;
        this.email = email;
        this.phone = phone;
        this.rating = rating;
        this.leadTimeDays = leadTimeDays;
        this.mainCategory = mainCategory;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContactName() {
        return contactName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Integer getLeadTimeDays() {
        return leadTimeDays;
    }

    public void setLeadTimeDays(Integer leadTimeDays) {
        this.leadTimeDays = leadTimeDays;
    }

    public String getMainCategory() {
        return mainCategory;
    }

    public void setMainCategory(String mainCategory) {
        this.mainCategory = mainCategory;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}

