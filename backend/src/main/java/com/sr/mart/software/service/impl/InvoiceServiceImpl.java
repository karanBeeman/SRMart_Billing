package com.sr.mart.software.service.impl;

import com.sr.mart.software.dto.CreateInvoiceRequest;
import com.sr.mart.software.dto.DraftInvoiceRequest;
import com.sr.mart.software.dto.HoldInvoiceStatusRequest;
import com.sr.mart.software.entity.Invoice;
import com.sr.mart.software.enums.InvoiceStatus;
import com.sr.mart.software.exception.InvalidInvoiceException;
import com.sr.mart.software.exception.InvoiceAlreadyExistsException;
import com.sr.mart.software.model.CreateInvoiceResponse;
import com.sr.mart.software.model.HoldInvoiceResponse;
import com.sr.mart.software.model.InvoiceResponse;
import com.sr.mart.software.repository.InvoiceRepository;
import com.sr.mart.software.service.InvoiceService;
import java.math.BigDecimal;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;

    @Override
    public InvoiceResponse createDraftInvoice(DraftInvoiceRequest request) {

        Optional<Invoice> existingDraft = invoiceRepository.findByStatusAndCreatedBy(
                InvoiceStatus.DRAFT,
                request.createdBy()
            );

        if (existingDraft.isPresent()) {
            return InvoiceResponse.from(existingDraft.get());
        }

        Invoice invoice = Invoice.builder()
            .createdBy(request.createdBy())
            .status(InvoiceStatus.DRAFT)
            .build();

        invoice = invoiceRepository.saveAndFlush(invoice);

        invoice.setInvoiceNumber(
            String.format("INV%06d", invoice.getId())
        );

        return InvoiceResponse.from(invoice);
    }

    @Override
    public InvoiceResponse createInvoice(CreateInvoiceRequest invoiceRequest) {

        Invoice invoice = buildInvoice(invoiceRequest);

        try {
            invoice.setInvoiceNumber(generateNextInvoiceNumber());
            Invoice createdInvoice = invoiceRepository.save(invoice);
            return InvoiceResponse.from(createdInvoice);
        } catch (DataIntegrityViolationException e) {
            throw new InvoiceAlreadyExistsException("Invoice with the same idempotency key already exists", e);
        }
    }

    private String generateNextInvoiceNumber() {
        Long nextSequenceValue = invoiceRepository.getNextInvoiceSequence();
        return String.format("INV%06d", nextSequenceValue);
    }

    private Invoice buildInvoice(CreateInvoiceRequest invoiceRequest) {
        Invoice invoice = new Invoice();

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
        invoice.setStatus(InvoiceStatus.DRAFT);
        return invoice;
    }

    private boolean isValidStatus(String status) {
        return status.equalsIgnoreCase("CREATED")
                || status.equalsIgnoreCase("BILLED")
                || status.equalsIgnoreCase("CASHED")
                || status.equalsIgnoreCase("CANCELLED");
    }

    @Override
    public HoldInvoiceResponse updateInvoice(String invoiceNumber, HoldInvoiceStatusRequest invoiceRequest) {
        Invoice existingInvoice = invoiceRepository.findByInvoiceNumber(String.valueOf(invoiceNumber))
            .orElseThrow(() -> new InvalidInvoiceException("Invoice not found with number: " + invoiceNumber));

        if (existingInvoice.getStatus() != InvoiceStatus.DRAFT) {
            throw new InvalidInvoiceException("Only draft invoices can be updated");
        }

        existingInvoice.setUpdatedBy(invoiceRequest.updatedBy());
        existingInvoice.setStatus(InvoiceStatus.HOLD);

        Invoice updatedInvoice = invoiceRepository.save(existingInvoice);
        return HoldInvoiceResponse.from(updatedInvoice);
    }
}
