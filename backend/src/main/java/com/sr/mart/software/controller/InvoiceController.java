package com.sr.mart.software.controller;

import com.sr.mart.software.dto.CreateInvoiceRequest;
import com.sr.mart.software.dto.DraftInvoiceRequest;
import com.sr.mart.software.dto.HoldInvoiceStatusRequest;
import com.sr.mart.software.model.InvoiceResponse;
import com.sr.mart.software.service.InvoiceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @PutMapping("/hold/invoices/{invoiceNumber}")
    public ResponseEntity<InvoiceResponse> updateInvoice(
        @PathVariable String invoiceNumber,
        @Valid @RequestBody HoldInvoiceStatusRequest invoiceRequest
    ) {
        InvoiceResponse res = invoiceService.updateInvoice(invoiceNumber, invoiceRequest);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

}
