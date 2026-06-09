package com.sr.mart.software.model;

import com.sr.mart.software.entity.Invoice;
import java.math.BigDecimal;

public record CreateInvoiceResponse(
        String invoiceNumber,
        BigDecimal subtotal,
         BigDecimal gstAmount,
        BigDecimal totalAmount,
        String status
) {
    public static CreateInvoiceResponse from(Invoice createdInvoice) {
        return new CreateInvoiceResponse(
                createdInvoice.getInvoiceNumber(),
                createdInvoice.getSubtotal(),
                createdInvoice.getGstAmount(),
                createdInvoice.getTotalAmount(),
                createdInvoice.getStatus()
        );
    }
}
