package com.almacen.it.controller;

import com.almacen.it.dto.OrderSuggestionDTO;
import com.almacen.it.model.PurchaseOrder;
import com.almacen.it.service.ReorderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/reorder")
@Tag(name = "Órdenes de Reorden", description = "Sugerencias inteligentes de reabastecimiento y aprobación de pedidos")
public class ReorderController {

    private final ReorderService reorderService;

    public ReorderController(ReorderService reorderService) {
        this.reorderService = reorderService;
    }

    @GetMapping("/suggestions")
    @Operation(summary = "Calcular sugerencias de compra para productos críticos")
    public ResponseEntity<OrderSuggestionDTO> getReorderSuggestions() {
        return ResponseEntity.ok(reorderService.generateReorderSuggestions());
    }

    @PostMapping("/approve")
    @Operation(summary = "Aprobar y generar formalmente orden de compra sugerida")
    public ResponseEntity<?> approveOrderSuggestion(@RequestBody(required = false) Map<String, String> payload) {
        try {
            String notes = payload != null ? payload.get("notes") : null;
            PurchaseOrder order = reorderService.approveOrderSuggestion(notes);
            return ResponseEntity.status(HttpStatus.CREATED).body(order);
        } catch (IllegalStateException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @GetMapping("/orders")
    @Operation(summary = "Historial de órdenes de compra")
    public ResponseEntity<List<PurchaseOrder>> getAllOrders() {
        return ResponseEntity.ok(reorderService.getAllOrders());
    }
}

