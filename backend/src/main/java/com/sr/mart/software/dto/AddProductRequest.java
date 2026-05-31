package com.sr.mart.software.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public record AddProductRequest(

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

    BigDecimal cgstPercentage,

    BigDecimal sgstPercentage,

    @NotNull
    Integer stockQuantity
) {
}
