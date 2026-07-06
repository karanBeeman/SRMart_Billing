package com.sr.mart.software.service.impl;

import com.sr.mart.software.entity.Invoice;
import com.sr.mart.software.entity.InvoiceItem;
import com.sr.mart.software.entity.Product;
import com.sr.mart.software.enums.InvoiceStatus;
import com.sr.mart.software.exception.InvoiceNotFoundException;
import com.sr.mart.software.model.InvoiceItemResponse;
import com.sr.mart.software.model.InvoiceManagementSearchResponse;
import com.sr.mart.software.model.InvoiceResponse;
import com.sr.mart.software.model.ResumeInvoiceBillResponse;
import com.sr.mart.software.repository.InvoiceItemRepository;
import com.sr.mart.software.repository.InvoiceManagementRepository;
import com.sr.mart.software.repository.InvoiceRepository;
import com.sr.mart.software.repository.ProductRepository;
import com.sr.mart.software.service.InvoiceManagementService;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class InvoiceManagementServiceImpl implements InvoiceManagementService {

    private final InvoiceManagementRepository invoiceManagementRepository;

    private final InvoiceRepository invoiceRepository;

    private final InvoiceItemRepository invoiceItemRepository;

    private final ProductRepository productRepository;

    public List<InvoiceManagementSearchResponse> getTodayInvoices() {

        LocalDate today = LocalDate.now();

        LocalDateTime from = today.atStartOfDay();

        LocalDateTime to = today.plusDays(1).atStartOfDay();

        return invoiceManagementRepository
            .findByStatusAndUpdatedAtBetweenOrderByUpdatedAtDesc(
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
            .findByStatusAndUpdatedAtBetweenOrderByUpdatedAtDesc(
                InvoiceStatus.COMPLETED,
                from,
                to
            )
            .stream()
            .map(InvoiceManagementSearchResponse::from)
            .toList();
    }

    @Transactional(readOnly = true)
    public ResumeInvoiceBillResponse getReceipt(String invoiceNumber) {

        Invoice invoice = invoiceRepository.findByInvoiceNumber(invoiceNumber)
            .orElseThrow(() ->
                new InvoiceNotFoundException("Invoice not found"));

        List<InvoiceItem> invoiceItems =
            invoiceItemRepository.findByInvoice(invoice);

        List<Long> productIds = invoiceItems.stream()
            .map(InvoiceItem::getProductId)
            .toList();

        Map<Long, Double> stockMap =
            productRepository.findByIdIn(productIds)
                .stream()
                .collect(Collectors.toMap(
                    Product::getId,
                    Product::getStockQuantity
                ));

        return new ResumeInvoiceBillResponse(
            InvoiceResponse.from(invoice),
            invoiceItems.stream()
                .map(item ->
                    InvoiceItemResponse.from(
                        item,
                        stockMap.getOrDefault(
                            item.getProductId(),
                            0.0
                        )
                    )
                )
                .toList()
        );
    }

}
