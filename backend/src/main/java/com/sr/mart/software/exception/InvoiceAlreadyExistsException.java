package com.sr.mart.software.exception;

public class InvoiceAlreadyExistsException extends RuntimeException {
    public InvoiceAlreadyExistsException(String message, Throwable cause) {
        super(message, cause);
    }
}
