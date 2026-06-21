package com.sr.mart.software.exception;

public class ProductAlreadyExistsWithSameBarcode extends RuntimeException {

    public ProductAlreadyExistsWithSameBarcode(String message) {
        super(message);
    }

}
