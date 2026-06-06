package com.sr.mart.software.controller;

import com.sr.mart.software.dto.CreateInvoiceRequest;
import com.sr.mart.software.model.InvoiceResponse;
import com.sr.mart.software.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class InvoiceController {

    private final InvoiceService invoiceService;

    @PostMapping("/create/invoices")
    public ResponseEntity<InvoiceResponse> createInvoice(@RequestBody CreateInvoiceRequest invoiceRequest) {
        InvoiceResponse res = invoiceService.createInvoice(invoiceRequest);
        return ResponseEntity.ok(res);
    }
}
