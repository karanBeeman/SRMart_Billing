package com.sr.mart.software.model;

import com.sr.mart.software.entity.Invoice;
import com.sr.mart.software.enums.InvoiceStatus;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public record HoldInvoiceResponse(
        String invoiceNumber,
        BigDecimal subtotal,
        BigDecimal gstAmount,
        BigDecimal totalAmount,
        String createdBy,
        InvoiceStatus status,
        String updatedBy,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static HoldInvoiceResponse from(Invoice updatedInvoice) {
        return new HoldInvoiceResponse(
                updatedInvoice.getInvoiceNumber(),
                updatedInvoice.getSubtotal(),
                updatedInvoice.getGstAmount(),
                updatedInvoice.getTotalAmount(),
                updatedInvoice.getCreatedBy(),
                updatedInvoice.getStatus(),
                updatedInvoice.getUpdatedBy(),
                updatedInvoice.getCreatedAt(),
                updatedInvoice.getUpdatedAt()
        );
    }
}
