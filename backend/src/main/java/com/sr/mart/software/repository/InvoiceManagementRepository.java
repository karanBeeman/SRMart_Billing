package com.sr.mart.software.repository;

import com.sr.mart.software.entity.Invoice;
import com.sr.mart.software.enums.InvoiceStatus;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceManagementRepository extends JpaRepository<Invoice, Long> {

    Optional<Invoice> findByInvoiceNumber(String invoiceNumber);

    List<Invoice> findByStatusAndCreatedAtBetweenOrderByUpdatedAtDesc(
        InvoiceStatus status, LocalDateTime createdAt, LocalDateTime createdAt2
    );
}
