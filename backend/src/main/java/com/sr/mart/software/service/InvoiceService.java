package com.sr.mart.software.service;

import com.sr.mart.software.dto.CompleteInvoiceRequest;
import com.sr.mart.software.dto.CreateInvoiceRequest;
import com.sr.mart.software.dto.DraftInvoiceRequest;
import com.sr.mart.software.dto.HoldInvoiceStatusRequest;
import com.sr.mart.software.model.InvoiceResponse;
import com.sr.mart.software.model.ResumeInvoiceResponse;
import java.util.List;

public interface InvoiceService {

    InvoiceResponse createInvoice(CreateInvoiceRequest request);

    InvoiceResponse createDraftInvoice(DraftInvoiceRequest invoiceRequest);

    InvoiceResponse updateInvoice(String invoiceNumber, HoldInvoiceStatusRequest invoiceRequest);

    List<ResumeInvoiceResponse> resumeInvoices();

    InvoiceResponse completeInvoice(String invoiceNumber, CompleteInvoiceRequest request);
}
