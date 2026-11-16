package com.almacen.it.repository;

import com.almacen.it.model.FinancialSnapshot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FinancialSnapshotRepository extends JpaRepository<FinancialSnapshot, Long> {
    Optional<FinancialSnapshot> findFirstByOrderBySnapshotDateDesc();
}

