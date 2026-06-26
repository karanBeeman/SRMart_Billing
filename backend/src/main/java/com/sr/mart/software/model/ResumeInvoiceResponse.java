package com.sr.mart.software.model;

import com.sr.mart.software.entity.Invoice;
import com.sr.mart.software.entity.InvoiceItem;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record ResumeInvoiceResponse(
        String invoiceNumber,
        BigDecimal totalAmount,
        LocalDateTime heldAt,
        int itemCount,
        List<String> previewItems

) {
    public ResumeInvoiceResponse {
        previewItems = List.copyOf(previewItems);
    }

    public static ResumeInvoiceResponse from(Invoice invoice, List<InvoiceItem> items) {
        List<String> preview = items.stream()
                .map(InvoiceItem::getProductName)
                .toList();

        return new ResumeInvoiceResponse(
                invoice.getInvoiceNumber(),
                invoice.getTotalAmount(),
                invoice.getUpdatedAt(),
                items.size(),
                preview
        );
    }
}
