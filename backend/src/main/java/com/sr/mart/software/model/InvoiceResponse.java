package com.sr.mart.software.model;

import com.sr.mart.software.entity.Invoice;

import java.math.BigDecimal;

public record InvoiceResponse(
        String invoiceNumber,
        BigDecimal subtotal,
         BigDecimal gstAmount,
        BigDecimal totalAmount,
        String status
) {
    public static InvoiceResponse from(Invoice createdInvoice) {
        return new InvoiceResponse(
                createdInvoice.getInvoiceNumber(),
                createdInvoice.getSubtotal(),
                createdInvoice.getGstAmount(),
                createdInvoice.getTotalAmount(),
                createdInvoice.getStatus()
        );
    }
}
