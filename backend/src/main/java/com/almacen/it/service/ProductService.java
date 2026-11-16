package com.almacen.it.service;

import com.almacen.it.dto.ProductRequestDTO;
import com.almacen.it.model.Product;
import com.almacen.it.model.Supplier;
import com.almacen.it.repository.ProductRepository;
import com.almacen.it.repository.SupplierRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final SupplierRepository supplierRepository;

    public ProductService(ProductRepository productRepository, SupplierRepository supplierRepository) {
        this.productRepository = productRepository;
        this.supplierRepository = supplierRepository;
    }

    public List<Product> getAllProducts(String search, String category) {
        if (search != null && !search.trim().isEmpty()) {
            return productRepository.searchByTerm(search.trim());
        }
        if (category != null && !category.trim().isEmpty() && !category.equalsIgnoreCase("ALL")) {
            return productRepository.findByCategoryIgnoreCase(category.trim());
        }
        return productRepository.findAll();
    }

    public List<Product> getCriticalProducts() {
        return productRepository.findCriticalStockProducts();
    }

    public List<Product> getProductsOver90Days() {
        return productRepository.findProductsWithDaysInInventoryGreaterThan(90);
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public Optional<Product> getProductBySku(String sku) {
        return productRepository.findBySku(sku);
    }

    @Transactional
    public Product createProduct(ProductRequestDTO request) {
        if (productRepository.findBySku(request.getSku()).isPresent()) {
            throw new IllegalArgumentException("Ya existe un producto con el SKU: " + request.getSku());
        }

        Supplier supplier = null;
        if (request.getSupplierId() != null) {
            supplier = supplierRepository.findById(request.getSupplierId())
                    .orElseThrow(() -> new IllegalArgumentException("Proveedor no encontrado con ID: " + request.getSupplierId()));
        }

        Product product = new Product(
                request.getSku().toUpperCase().trim(),
                request.getName().trim(),
                request.getBrand(),
                request.getCategory(),
                request.getSubcategory(),
                request.getCostPrice(),
                request.getSellingPrice(),
                request.getCurrentStock(),
                request.getMinStock(),
                request.getIdealStock(),
                request.getDaysInInventory(),
                supplier
        );

        return productRepository.save(product);
    }

    @Transactional
    public Product updateStock(Long id, Integer newStock) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado con ID: " + id));

        if (newStock < 0) {
            throw new IllegalArgumentException("El stock no puede ser negativo");
        }

        product.setCurrentStock(newStock);
        return productRepository.save(product);
    }
}

