package com.sr.mart.software.service;

import com.sr.mart.software.dto.CreateInvoiceRequest;
import com.sr.mart.software.dto.DraftInvoiceRequest;
import com.sr.mart.software.model.CreateInvoiceResponse;
import jakarta.validation.Valid;

public interface InvoiceService {

    CreateInvoiceResponse createInvoice(CreateInvoiceRequest request);

    CreateInvoiceResponse createDraftInvoice(DraftInvoiceRequest invoiceRequest);
}
