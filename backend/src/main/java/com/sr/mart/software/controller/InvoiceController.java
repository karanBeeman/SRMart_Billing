package com.sr.mart.software.controller;

import com.sr.mart.software.dto.CreateInvoiceRequest;
import com.sr.mart.software.model.CreateInvoiceResponse;
import com.sr.mart.software.service.InvoiceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class InvoiceController {

    private final InvoiceService invoiceService;

    @PostMapping("/create/invoices")
    public ResponseEntity<CreateInvoiceResponse> createInvoice(
            @RequestHeader(value = "idempotency-key") String idempotencyKey,
            @Valid @RequestBody CreateInvoiceRequest invoiceRequest
    ) {
        CreateInvoiceResponse res = invoiceService.createInvoice(invoiceRequest, idempotencyKey);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }
}
