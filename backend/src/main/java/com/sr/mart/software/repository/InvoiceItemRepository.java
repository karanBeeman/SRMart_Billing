package com.sr.mart.software.repository;

import com.sr.mart.software.entity.Invoice;
import com.sr.mart.software.entity.InvoiceItem;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvoiceItemRepository extends JpaRepository<InvoiceItem, Long> {

    List<InvoiceItem> findByInvoice(Invoice invoice);

    Optional<InvoiceItem> findByInvoiceAndProductId(Invoice invoice, Long productId);

}
