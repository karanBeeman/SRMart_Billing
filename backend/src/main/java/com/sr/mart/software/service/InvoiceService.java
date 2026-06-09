package com.sr.mart.software.service;

import com.sr.mart.software.dto.CreateInvoiceRequest;
import com.sr.mart.software.model.CreateInvoiceResponse;

public interface InvoiceService {

    CreateInvoiceResponse createInvoice(CreateInvoiceRequest request, String idempotencyKey);
}
