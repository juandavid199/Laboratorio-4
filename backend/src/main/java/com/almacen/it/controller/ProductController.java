package com.almacen.it.controller;

import com.almacen.it.dto.ProductRequestDTO;
import com.almacen.it.dto.StockUpdateRequestDTO;
import com.almacen.it.model.Product;
import com.almacen.it.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@Tag(name = "Productos", description = "Operaciones sobre el catálogo tecnológico e inventario")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    @Operation(summary = "Listar catálogo tecnológico", description = "Retorna todos los productos o filtra por búsqueda/categoría")
    public ResponseEntity<List<Product>> getAllProducts(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category) {
        return ResponseEntity.ok(productService.getAllProducts(search, category));
    }

    @GetMapping("/critical")
    @Operation(summary = "Listar productos críticos", description = "Filtra productos donde stock actual <= stock mínimo")
    public ResponseEntity<List<Product>> getCriticalProducts() {
        return ResponseEntity.ok(productService.getCriticalProducts());
    }

    @GetMapping("/over90days")
    @Operation(summary = "Listar productos >90 días", description = "Filtra productos con más de 90 días en almacén")
    public ResponseEntity<List<Product>> getProductsOver90Days() {
        return ResponseEntity.ok(productService.getProductsOver90Days());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener producto por ID")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productService.getProductById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Registrar nuevo producto tecnológico")
    public ResponseEntity<?> createProduct(@Valid @RequestBody ProductRequestDTO request) {
        try {
            Product created = productService.createProduct(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PutMapping("/{id}/stock")
    @Operation(summary = "Actualizar stock actual de un producto")
    public ResponseEntity<?> updateStock(
            @PathVariable Long id,
            @Valid @RequestBody StockUpdateRequestDTO request) {
        try {
            Product updated = productService.updateStock(id, request.getNewStock());
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}

