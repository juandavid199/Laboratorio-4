package com.almacen.it.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "financial_snapshots")
public class FinancialSnapshot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String period; // ej. "Noviembre 2026"

    private LocalDate snapshotDate;

    private Double cashBalance; // Saldo disponible en cuentas bancarias/caja

    private Double pendingLiabilities; // Compromisos inmediatos con proveedores

    private Double fixedExpensesBuffer; // Reserva para gastos fijos y nómina operativa

    public FinancialSnapshot() {
        this.snapshotDate = LocalDate.now();
    }

    public FinancialSnapshot(String period, Double cashBalance, Double pendingLiabilities, Double fixedExpensesBuffer) {
        this.period = period;
        this.snapshotDate = LocalDate.now();
        this.cashBalance = cashBalance;
        this.pendingLiabilities = pendingLiabilities;
        this.fixedExpensesBuffer = fixedExpensesBuffer;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    public LocalDate getSnapshotDate() {
        return snapshotDate;
    }

    public void setSnapshotDate(LocalDate snapshotDate) {
        this.snapshotDate = snapshotDate;
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

    public Double getFixedExpensesBuffer() {
        return fixedExpensesBuffer;
    }

    public void setFixedExpensesBuffer(Double fixedExpensesBuffer) {
        this.fixedExpensesBuffer = fixedExpensesBuffer;
    }
}

