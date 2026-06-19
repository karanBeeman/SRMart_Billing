package com.sr.mart.software.model;

import com.sr.mart.software.entity.Invoice;
import com.sr.mart.software.enums.InvoiceStatus;
import java.math.BigDecimal;

public record InvoiceResponse(
        String invoiceNumber,
        BigDecimal subtotal,
        BigDecimal gstAmount,
        BigDecimal totalAmount,
        InvoiceStatus status,
        String CreatedBy,
        String updatedBy,
        String createdAt,
        String updatedAt,
        BigDecimal discountAmount,
        BigDecimal loyaltyPointsUsed,
        BigDecimal paidAmount,
        BigDecimal balanceAmount,
        BigDecimal changeReturn
) {
    public static InvoiceResponse from(Invoice createdInvoice) {
        return new InvoiceResponse(
                createdInvoice.getInvoiceNumber(),
                createdInvoice.getSubtotal(),
                createdInvoice.getGstAmount(),
                createdInvoice.getTotalAmount(),
                createdInvoice.getStatus(),
                createdInvoice.getCreatedBy(),
                createdInvoice.getUpdatedBy(),
                createdInvoice.getCreatedAt().toString(),
                createdInvoice.getUpdatedAt().toString(),
                createdInvoice.getDiscountAmount(),
                createdInvoice.getLoyaltyPointsUsed(),
                createdInvoice.getPaidAmount(),
                createdInvoice.getBalanceAmount(),
                createdInvoice.getChangeReturn()
        );
    }
}
