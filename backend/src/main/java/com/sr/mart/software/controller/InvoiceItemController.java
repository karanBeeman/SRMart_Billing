package com.sr.mart.software.controller;

import com.sr.mart.software.dto.AddInvoiceItemRequest;
import com.sr.mart.software.dto.UpdateInvoiceQtyItemRequest;
import com.sr.mart.software.dto.UpdateInvoiceSellingPriceItemRequest;
import com.sr.mart.software.model.InvoiceItemResponse;
import com.sr.mart.software.service.InvoiceItemService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class InvoiceItemController {

    private final InvoiceItemService invoiceItemService;

    @GetMapping("/get/invoices/{invoiceNumber}/items")
    public ResponseEntity<List<InvoiceItemResponse>> getInvoiceLineItems(@PathVariable String invoiceNumber) {
        var res = invoiceItemService.getInvoiceLineItems(invoiceNumber);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/add/invoices/{invoiceNumber}/items")
    public ResponseEntity<InvoiceItemResponse> createInvoiceLineItems(@PathVariable String invoiceNumber,
        @RequestBody AddInvoiceItemRequest request) {
        InvoiceItemResponse res = invoiceItemService.createInvoiceLineItems(invoiceNumber, request.productId());
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @PutMapping("/update/invoice-items/{invoiceItemId}/qty")
    public ResponseEntity<InvoiceItemResponse> updateItemQty(@PathVariable Long invoiceItemId,
        @RequestBody UpdateInvoiceQtyItemRequest request) {
        InvoiceItemResponse res = invoiceItemService.updateQty(invoiceItemId, request.qty());
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @PutMapping("/update/invoice-items/{invoiceItemId}/selling-price")
    public ResponseEntity<InvoiceItemResponse> updateSellingPrice(@PathVariable Long invoiceItemId,
        @RequestBody UpdateInvoiceSellingPriceItemRequest request) {
        InvoiceItemResponse res = invoiceItemService.updateSellingPrice(invoiceItemId, request.sellingPrice());
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @DeleteMapping("/delete/invoice-items/{invoiceItemId}")
    public ResponseEntity<Void> deleteInvoice(@PathVariable Long invoiceItemId) {
        invoiceItemService.deleteInvoice(invoiceItemId);
        return ResponseEntity.noContent().build();
    }

}
