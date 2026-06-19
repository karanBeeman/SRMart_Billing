package com.sr.mart.software.model;

import com.sr.mart.software.entity.InvoiceItem;

public record InvoiceItemResponse(
    Long id,
    Long productId,
    String productName,
    Integer qty,
    Double mrpPrice,
    Double sellingPrice,
    Double cgstPercentage,
    Double sgstPercentage,
    Double stockQuantity,
    Double lineTotal
) {

    public static InvoiceItemResponse from(
        InvoiceItem item, Double stockQuantity
    ) {

        return new InvoiceItemResponse(
            item.getId(),
            item.getProductId(),
            item.getProductName(),
            item.getQty(),
            item.getMrpPrice().doubleValue(),
            item.getSellingPrice().doubleValue(),
            item.getCgstPercentage().doubleValue(),
            item.getSgstPercentage().doubleValue(),
            stockQuantity,
            item.getLineTotal().doubleValue()
        );
    }
}