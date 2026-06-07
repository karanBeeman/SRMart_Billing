package com.sr.mart.software.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public record CreateInvoiceRequest(

        BigDecimal subtotal,

        BigDecimal gstAmount,

        @NotNull(message = "totalAmount is required")
        BigDecimal totalAmount,

        @NotBlank(message = "status is required")
        String status
) {
}
