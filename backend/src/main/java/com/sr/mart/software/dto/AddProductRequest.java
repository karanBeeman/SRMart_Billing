package com.sr.mart.software.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public record AddProductRequest(

    @NotBlank
    String barcode,

    @NotBlank
    String productName,

    String category,

    @NotNull
    BigDecimal purchasePrice,

    @NotNull
    BigDecimal mrpPrice,

    @NotNull
    BigDecimal sellingPrice,

    @NotNull
    BigDecimal cgstPercentage,

    @NotNull
    BigDecimal sgstPercentage,

    @NotNull
    Integer stockQuantity
) {
}
