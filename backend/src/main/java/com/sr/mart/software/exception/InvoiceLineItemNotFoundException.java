package com.sr.mart.software.exception;

public class InvoiceLineItemNotFoundException extends RuntimeException {

    public InvoiceLineItemNotFoundException(String message) {
        super(message);
    }

}
