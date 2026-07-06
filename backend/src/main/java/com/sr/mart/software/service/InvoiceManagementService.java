package com.sr.mart.software.service;

import com.sr.mart.software.model.InvoiceManagementSearchResponse;
import com.sr.mart.software.model.ResumeInvoiceBillResponse;
import java.time.LocalDate;
import java.util.List;

public interface InvoiceManagementService {

    List<InvoiceManagementSearchResponse> getTodayInvoices();

    InvoiceManagementSearchResponse searchByInvoiceNumber(String invoiceNumber);

    List<InvoiceManagementSearchResponse> searchByDateRange(LocalDate from, LocalDate to);

    ResumeInvoiceBillResponse getReceipt(String invoiceNumber);
}
