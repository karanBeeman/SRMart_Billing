package com.sr.mart.software.service.impl;

import com.sr.mart.software.dto.CreateInvoiceRequest;
import com.sr.mart.software.entity.Invoice;
import com.sr.mart.software.model.InvoiceResponse;
import com.sr.mart.software.repository.InvoiceRepository;
import java.math.BigDecimal;

import com.sr.mart.software.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;

    public String getNextInvoiceNumber() {
        return invoiceRepository.findTopByOrderByIdDesc()
                .map(Invoice::getInvoiceNumber)
                .map(this::incrementInvoiceNumber)
                .orElse("INV-0001");
    }

    @Override @Transactional
    public InvoiceResponse createInvoice(CreateInvoiceRequest request) {
        Invoice invoice = new Invoice();

        invoice.setInvoiceNumber(getNextInvoiceNumber());

        BigDecimal subtotal = request.subtotal() != null ? request.subtotal() : BigDecimal.ZERO;
        BigDecimal gstAmount = request.gstAmount() != null ? request.gstAmount() : BigDecimal.ZERO;
        invoice.setSubtotal(subtotal);
        invoice.setGstAmount(gstAmount);

        BigDecimal totalAmount = request.totalAmount() != null ? request.totalAmount()
                : subtotal.add(gstAmount);
        invoice.setTotalAmount(totalAmount);

        String status = request.status();
        if (status == null || status.isBlank()) {
            status = "CREATED";
        }
        invoice.setStatus(status);

        Invoice createdInvoice = invoiceRepository.save(invoice);
        return InvoiceResponse.from(createdInvoice);
    }

    private String incrementInvoiceNumber(String currentNumber) {
        if (currentNumber == null || currentNumber.isBlank()) {
            return "INV-0001";
        }

        String prefix = currentNumber.replaceAll("\\d", "");
        String numericPart = currentNumber.replaceAll("\\D", "");

        if (numericPart.isEmpty()) {
            return prefix + "0001";
        }

        int next = Integer.parseInt(numericPart) +1;
        String formattedNumber = String.format("%0" + numericPart.length() + "d", next);
        return prefix + formattedNumber;
    }
}

