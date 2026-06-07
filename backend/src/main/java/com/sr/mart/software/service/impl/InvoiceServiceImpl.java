package com.sr.mart.software.service.impl;

import com.sr.mart.software.dto.CreateInvoiceRequest;
import com.sr.mart.software.entity.Invoice;
import com.sr.mart.software.exception.InvalidInvoiceException;
import com.sr.mart.software.exception.InvoiceAlreadyExistsException;
import com.sr.mart.software.model.CreateInvoiceResponse;
import com.sr.mart.software.repository.InvoiceRepository;
import com.sr.mart.software.service.InvoiceService;
import java.math.BigDecimal;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;

    @Override
    @Transactional
    public CreateInvoiceResponse createInvoice(CreateInvoiceRequest invoiceRequest, String idempotencyKey) {
        if (idempotencyKey == null || idempotencyKey.isBlank()) {
            throw new InvalidInvoiceException("Idempotency key is required");
        }

        var existingInvoice = invoiceRepository.findByIdempotencyKey(idempotencyKey);
        if (existingInvoice.isPresent()) {
            return CreateInvoiceResponse.from(existingInvoice.get());
        }

        Invoice invoice = buildInvoice(invoiceRequest, idempotencyKey);

        try {
            invoice.setInvoiceNumber(generateNextInvoiceNumber());
            Invoice createdInvoice = invoiceRepository.save(invoice);
            return CreateInvoiceResponse.from(createdInvoice);
        } catch (DataIntegrityViolationException e) {
            return invoiceRepository.findByIdempotencyKey(idempotencyKey)
                    .map(CreateInvoiceResponse::from)
                    .orElseThrow(() -> new InvoiceAlreadyExistsException("Invoice with the same idempotency key already exists", e));
        }
    }

    private String generateNextInvoiceNumber() {
        Long nextSequenceValue = invoiceRepository.getNextInvoiceSequence();
        return String.format("INV%06d", nextSequenceValue);
    }

    private Invoice buildInvoice(CreateInvoiceRequest invoiceRequest, String idempotencyKey) {
        Invoice invoice = new Invoice();
        invoice.setIdempotencyKey(idempotencyKey);

        BigDecimal subtotal = invoiceRequest.subtotal() != null ? invoiceRequest.subtotal() : BigDecimal.ZERO;
        if (subtotal.signum() < 0) {
            throw new InvalidInvoiceException("Subtotal cannot be negative");
        }
        invoice.setSubtotal(subtotal);

        BigDecimal gstAmount = invoiceRequest.gstAmount() != null ? invoiceRequest.gstAmount() : BigDecimal.ZERO;
        if (gstAmount.signum() < 0) {
            throw new InvalidInvoiceException("GST amount cannot be negative");
        }
        invoice.setGstAmount(gstAmount);

        BigDecimal totalAmount = invoiceRequest.totalAmount() != null ? invoiceRequest.totalAmount() : subtotal.add(gstAmount);
        if (totalAmount.signum() < 0) {
            throw new InvalidInvoiceException("Total amount cannot be negative");
        }
        invoice.setTotalAmount(totalAmount);

        String status = (invoiceRequest.status() == null || invoiceRequest.status().isBlank()) ? "CREATED" : invoiceRequest.status();
        if (!isValidStatus(status)) {
            throw new InvalidInvoiceException("Invalid status: " + status);
        }
        invoice.setStatus(status);
        return invoice;
    }

    private boolean isValidStatus(String status) {
        return status.equalsIgnoreCase("CREATED")
                || status.equalsIgnoreCase("BILLED")
                || status.equalsIgnoreCase("CASHED")
                || status.equalsIgnoreCase("CANCELLED");
    }
}
