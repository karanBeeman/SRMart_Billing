package com.sr.mart.software.service.impl;

import com.sr.mart.software.enums.InvoiceStatus;
import com.sr.mart.software.exception.InvoiceNotFoundException;
import com.sr.mart.software.model.InvoiceManagementSearchResponse;
import com.sr.mart.software.repository.InvoiceManagementRepository;
import com.sr.mart.software.service.InvoiceManagementService;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InvoiceManagementServiceImpl implements InvoiceManagementService {

    private final InvoiceManagementRepository invoiceManagementRepository;

    public List<InvoiceManagementSearchResponse> getTodayInvoices() {

        LocalDate today = LocalDate.now();

        LocalDateTime from = today.atStartOfDay();

        LocalDateTime to = today.plusDays(1).atStartOfDay();

        return invoiceManagementRepository
            .findByStatusAndCreatedAtBetweenOrderByUpdatedAtDesc(
                InvoiceStatus.COMPLETED,
                from,
                to
            )
            .stream()
            .map(InvoiceManagementSearchResponse::from)
            .toList();
    }

    public InvoiceManagementSearchResponse searchByInvoiceNumber(
        String invoiceNumber
    ) {

        return invoiceManagementRepository.findByInvoiceNumber(invoiceNumber)
            .map(InvoiceManagementSearchResponse::from)
            .orElseThrow(() ->
                new InvoiceNotFoundException("Invoice not found"));
    }

    public List<InvoiceManagementSearchResponse> searchByDateRange(
        LocalDate fromDate,
        LocalDate toDate
    ) {

        LocalDateTime from = fromDate.atStartOfDay();

        LocalDateTime to = toDate.plusDays(1).atStartOfDay();

        return invoiceManagementRepository
            .findByStatusAndCreatedAtBetweenOrderByUpdatedAtDesc(
                InvoiceStatus.COMPLETED,
                from,
                to
            )
            .stream()
            .map(InvoiceManagementSearchResponse::from)
            .toList();
    }

}
