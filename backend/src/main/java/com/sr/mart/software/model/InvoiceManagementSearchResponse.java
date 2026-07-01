package com.sr.mart.software.model;

import com.sr.mart.software.entity.Invoice;
import com.sr.mart.software.enums.InvoiceStatus;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public record InvoiceManagementSearchResponse(String invoiceNumber,
                                              String updatedBy,
                                              LocalDateTime updatedAt,
                                              BigDecimal totalAmount,
                                              InvoiceStatus status) {
    public static InvoiceManagementSearchResponse from(Invoice invoice) {
        return new InvoiceManagementSearchResponse(
            invoice.getInvoiceNumber(),
            invoice.getUpdatedBy(),
            invoice.getUpdatedAt(),
            invoice.getTotalAmount(),
            invoice.getStatus()
        );
    }
}
