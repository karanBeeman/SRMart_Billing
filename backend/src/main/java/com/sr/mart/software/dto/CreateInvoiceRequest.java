package com.sr.mart.software.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record CreateInvoiceRequest(

        BigDecimal subtotal,

        BigDecimal gstAmount,

        @NotNull
        BigDecimal totalAmount,

        @NotBlank
        String status
) {
}
