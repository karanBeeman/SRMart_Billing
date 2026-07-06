package com.sr.mart.software.model;

public record CompleteInvoiceResponse(
    String invoiceNumber
) {
    public static CompleteInvoiceResponse from(String invoiceNumber) {
        return new CompleteInvoiceResponse(invoiceNumber);
    }

}
