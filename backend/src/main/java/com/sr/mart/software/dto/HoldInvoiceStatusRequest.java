package com.sr.mart.software.dto;

import jakarta.validation.constraints.NotBlank;

public record HoldInvoiceStatusRequest(
        @NotBlank(message = "updatedBy is required")
        String updatedBy
) {
}
