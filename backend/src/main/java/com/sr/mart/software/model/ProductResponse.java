package com.sr.mart.software.model;

import com.sr.mart.software.entity.Product;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ProductResponse(
    Long id,
    String barcode,
    String productName,
    String category,
    BigDecimal purchasePrice,
    BigDecimal mrpPrice,
    BigDecimal sellingPrice,
    BigDecimal cgstPercentage,
    BigDecimal sgstPercentage,
    Integer stockQuantity,
    Boolean active,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {
    public static ProductResponse from(Product product) {
        return new ProductResponse(
            product.getId(),
            product.getBarcode(),
            product.getProductName(),
            product.getCategory(),
            product.getPurchasePrice(),
            product.getMrpPrice(),
            product.getSellingPrice(),
            product.getCgstPercentage(),
            product.getSgstPercentage(),
            product.getStockQuantity(),
            product.getActive(),
            product.getCreatedAt(),
            product.getUpdatedAt()
        );
    }
}
