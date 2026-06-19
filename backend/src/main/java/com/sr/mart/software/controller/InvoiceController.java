package com.sr.mart.software.controller;

import com.sr.mart.software.dto.AddInvoiceItemRequest;
import com.sr.mart.software.dto.CreateInvoiceRequest;
import com.sr.mart.software.dto.DraftInvoiceRequest;
import com.sr.mart.software.model.InvoiceItemResponse;
import com.sr.mart.software.model.InvoiceResponse;
import com.sr.mart.software.service.InvoiceService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class InvoiceController {

    private final InvoiceService invoiceService;

    @PostMapping("/create/draft/invoices")
    public ResponseEntity<InvoiceResponse> createDraftInvoice(
        @Valid @RequestBody DraftInvoiceRequest invoiceRequest
    ) {
        InvoiceResponse res = invoiceService.createDraftInvoice(invoiceRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @PostMapping("/create/invoices")
    public ResponseEntity<InvoiceResponse> createInvoice(
        @Valid @RequestBody CreateInvoiceRequest invoiceRequest
    ) {
        InvoiceResponse res = invoiceService.createInvoice(invoiceRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @GetMapping("/invoices/{invoiceNumber}/items")
    public ResponseEntity<List<InvoiceItemResponse>> getInvoiceLineItems(@PathVariable String invoiceNumber) {
        var res = invoiceService.getInvoiceLineItems(invoiceNumber);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/create/invoices/{invoiceNumber}/items")
    public ResponseEntity<InvoiceItemResponse> createInvoiceLineItems(@PathVariable String invoiceNumber,
        @RequestBody AddInvoiceItemRequest request) {
        InvoiceItemResponse res = invoiceService.createInvoiceLineItems(invoiceNumber, request.productId());
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }
}
