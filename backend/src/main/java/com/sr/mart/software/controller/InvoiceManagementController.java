package com.sr.mart.software.controller;

import com.sr.mart.software.model.InvoiceManagementSearchResponse;
import com.sr.mart.software.service.InvoiceManagementService;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/invoice-management")
public class InvoiceManagementController {

    private final InvoiceManagementService invoiceManagementService;

    @GetMapping("/today")
    public List<InvoiceManagementSearchResponse> getTodayInvoices() {
        return invoiceManagementService.getTodayInvoices();
    }

    @GetMapping("/search")
    public InvoiceManagementSearchResponse searchByInvoiceNumber(
        @RequestParam String invoiceNumber
    ) {
        return invoiceManagementService.searchByInvoiceNumber(invoiceNumber);
    }

    @GetMapping("/search-by-date")
    public List<InvoiceManagementSearchResponse> searchByDateRange(
        @RequestParam LocalDate from,
        @RequestParam LocalDate to
    ) {
        return invoiceManagementService.searchByDateRange(from, to);
    }

}
