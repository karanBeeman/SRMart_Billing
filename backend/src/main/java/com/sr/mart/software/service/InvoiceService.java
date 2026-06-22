package com.sr.mart.software.service;

import com.sr.mart.software.dto.CreateInvoiceRequest;
import com.sr.mart.software.dto.DraftInvoiceRequest;
import com.sr.mart.software.dto.HoldInvoiceStatusRequest;
import com.sr.mart.software.model.InvoiceResponse;

public interface InvoiceService {

    InvoiceResponse createInvoice(CreateInvoiceRequest request);

    InvoiceResponse createDraftInvoice(DraftInvoiceRequest invoiceRequest);

    InvoiceResponse updateInvoice(String invoiceNumber, HoldInvoiceStatusRequest invoiceRequest);
}
