package com.sr.mart.software.model;

import com.sr.mart.software.entity.Invoice;
import com.sr.mart.software.entity.InvoiceItem;
import java.util.List;
import java.util.Map;

public record ResumeInvoiceBillResponse(
    InvoiceResponse invoice,
    List<InvoiceItemResponse> items
) {

    public static ResumeInvoiceBillResponse from(
        Invoice invoice,
        List<InvoiceItem> invoiceItems,
        Map<Long, Double> stockMap
    ) {
        return new ResumeInvoiceBillResponse(
            InvoiceResponse.from(invoice),
            invoiceItems.stream()
                .map(item -> InvoiceItemResponse.from(
                    item,
                    stockMap.getOrDefault(item.getProductId(), 0.0)
                ))
                .toList()
        );
    }
}
