package com.sr.mart.software.service;

import com.sr.mart.software.dto.CreateInvoiceRequest;
import com.sr.mart.software.dto.DraftInvoiceRequest;
import com.sr.mart.software.dto.HoldInvoiceStatusRequest;
import com.sr.mart.software.model.CreateInvoiceResponse;
import com.sr.mart.software.model.HoldInvoiceResponse;
import com.sr.mart.software.model.InvoiceItemResponse;
import com.sr.mart.software.model.InvoiceResponse;
import java.util.List;

public interface InvoiceService {

    InvoiceResponse createInvoice(CreateInvoiceRequest request);

    InvoiceResponse createDraftInvoice(DraftInvoiceRequest invoiceRequest);

    CreateInvoiceResponse createDraftInvoice(DraftInvoiceRequest invoiceRequest);

    HoldInvoiceResponse updateInvoice(String invoiceNumber, HoldInvoiceStatusRequest invoiceRequest);
}
