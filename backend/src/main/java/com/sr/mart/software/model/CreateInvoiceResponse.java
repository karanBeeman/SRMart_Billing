package com.sr.mart.software.model;

import com.sr.mart.software.entity.Invoice;
import com.sr.mart.software.enums.InvoiceStatus;
import java.math.BigDecimal;

public record CreateInvoiceResponse(
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
    public static CreateInvoiceResponse from(Invoice createdInvoice) {
        return new CreateInvoiceResponse(
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
