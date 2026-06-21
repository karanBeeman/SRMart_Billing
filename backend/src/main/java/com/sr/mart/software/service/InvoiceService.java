package com.sr.mart.software.service;

import com.sr.mart.software.dto.CreateInvoiceRequest;
import com.sr.mart.software.dto.DraftInvoiceRequest;
import com.sr.mart.software.dto.HoldInvoiceStatusRequest;
import com.sr.mart.software.model.CreateInvoiceResponse;
import com.sr.mart.software.model.HoldInvoiceResponse;

public interface InvoiceService {

    CreateInvoiceResponse createInvoice(CreateInvoiceRequest request);

    CreateInvoiceResponse createDraftInvoice(DraftInvoiceRequest invoiceRequest);

    HoldInvoiceResponse updateInvoice(String invoiceNumber, HoldInvoiceStatusRequest invoiceRequest);
}
