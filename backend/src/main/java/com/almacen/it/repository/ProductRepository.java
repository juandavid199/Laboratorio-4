package com.almacen.it.repository;

import com.almacen.it.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findBySku(String sku);

    // Consulta para productos en nivel crítico (Stock actual <= Stock mínimo)
    @Query("SELECT p FROM Product p WHERE p.currentStock <= p.minStock ORDER BY p.currentStock ASC")
    List<Product> findCriticalStockProducts();

    // Consulta para productos con más de X días en inventario (alerta obsolescencia)
    @Query("SELECT p FROM Product p WHERE p.daysInInventory > :days ORDER BY p.daysInInventory DESC")
    List<Product> findProductsWithDaysInInventoryGreaterThan(@Param("days") Integer days);

    // Búsqueda por categoría
    List<Product> findByCategoryIgnoreCase(String category);

    // Búsqueda por término en SKU, nombre o marca
    @Query("SELECT p FROM Product p WHERE LOWER(p.sku) LIKE LOWER(CONCAT('%', :term, '%')) " +
           "OR LOWER(p.name) LIKE LOWER(CONCAT('%', :term, '%')) " +
           "OR LOWER(p.brand) LIKE LOWER(CONCAT('%', :term, '%'))")
    List<Product> searchByTerm(@Param("term") String term);

    // Suma del capital total inmovilizado
    @Query("SELECT SUM(p.currentStock * p.costPrice) FROM Product p")
    Double calculateTotalInventoryCapital();

    // Suma del valor potencial de venta
    @Query("SELECT SUM(p.currentStock * p.sellingPrice) FROM Product p")
    Double calculateTotalPotentialSalesValue();
}

