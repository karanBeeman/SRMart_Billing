package com.sr.mart.software.repository;

import com.sr.mart.software.entity.Invoice;
import com.sr.mart.software.enums.InvoiceStatus;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

    @Query(value = "SELECT nextval('invoice_seq')", nativeQuery = true)
    Long getNextInvoiceSequence();

    Optional<Invoice> findByStatusAndCreatedBy(InvoiceStatus name, String by);

    List<Invoice> findInvoicesByStatus(InvoiceStatus name);

    Optional<Invoice> findByInvoiceNumber(String invoiceNumber);
}
