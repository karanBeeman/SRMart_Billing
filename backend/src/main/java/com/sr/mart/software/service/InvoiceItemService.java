package com.sr.mart.software.service;

import com.sr.mart.software.model.InvoiceItemResponse;
import java.math.BigDecimal;
import java.util.List;

public interface InvoiceItemService {

    InvoiceItemResponse createInvoiceLineItems(String addInvoiceLineItems, Long productId);

    List<InvoiceItemResponse> getInvoiceLineItems(String invoiceNumber);

    InvoiceItemResponse updateQty(Long invoiceItemId, Double qty);

    InvoiceItemResponse updateSellingPrice(Long invoiceItemId, BigDecimal sellingPrice);

    void deleteInvoice(Long invoiceItemId);
}
