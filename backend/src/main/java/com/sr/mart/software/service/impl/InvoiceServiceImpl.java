package com.sr.mart.software.service.impl;

import static com.fasterxml.jackson.databind.util.ClassUtil.defaultValue;

import com.sr.mart.software.dto.CompleteInvoiceRequest;
import com.sr.mart.software.dto.CreateInvoiceRequest;
import com.sr.mart.software.dto.DraftInvoiceRequest;
import com.sr.mart.software.dto.HoldInvoiceStatusRequest;
import com.sr.mart.software.entity.Invoice;
import com.sr.mart.software.entity.InvoiceItem;
import com.sr.mart.software.enums.InvoiceStatus;
import com.sr.mart.software.enums.PaymentMode;
import com.sr.mart.software.exception.InvalidInvoiceException;
import com.sr.mart.software.exception.InvoiceAlreadyExistsException;
import com.sr.mart.software.exception.InvoiceNotFoundException;
import com.sr.mart.software.model.InvoiceResponse;
import com.sr.mart.software.repository.InvoiceItemRepository;
import com.sr.mart.software.repository.InvoiceRepository;
import com.sr.mart.software.service.InvoiceService;
import java.math.BigDecimal;
import java.util.List;
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

    private final InvoiceItemRepository invoiceItemRepository;

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

        invoice.setInvoiceNumber(String.format("INV%06d", invoice.getId()));

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
    public InvoiceResponse updateInvoice(String invoiceNumber, HoldInvoiceStatusRequest invoiceRequest) {
        Invoice existingInvoice = invoiceRepository.findByInvoiceNumber(String.valueOf(invoiceNumber))
            .orElseThrow(() -> new InvalidInvoiceException("Invoice not found with number: " + invoiceNumber));

        if (existingInvoice.getStatus() != InvoiceStatus.DRAFT) {
            throw new InvalidInvoiceException("Only draft invoices can be updated");
        }

        long itemCount = invoiceItemRepository.countByInvoice(existingInvoice);

        if (itemCount == 0) {
            throw new InvalidInvoiceException(
                "Cannot put an empty bill on hold"
            );
        }

        existingInvoice.setUpdatedBy(invoiceRequest.updatedBy());
        existingInvoice.setStatus(InvoiceStatus.HOLD);

        Invoice updatedInvoice = invoiceRepository.save(existingInvoice);
        return InvoiceResponse.from(updatedInvoice);
    }

    @Transactional
    public InvoiceResponse completeInvoice(
        String invoiceNumber,
        CompleteInvoiceRequest request
    ) {

        Invoice invoice = invoiceRepository.findByInvoiceNumber(invoiceNumber)
            .orElseThrow(() ->
                new InvoiceNotFoundException("Invoice not found"));

        if (invoice.getStatus() != InvoiceStatus.DRAFT
            && invoice.getStatus() != InvoiceStatus.HOLD) {
            throw new IllegalStateException(
                "Only draft or hold invoices can be completed.");
        }

        List<InvoiceItem> items = invoiceItemRepository.findByInvoice(invoice);

        if (items.isEmpty()) {
            throw new IllegalStateException("Invoice has no items.");
        }

        updateInvoiceAmounts(invoice, items);

        updatePaymentDetails(invoice, request);

        invoice.setDiscountAmount(request.discount());
        invoice.setLoyaltyPointsUsed(request.pointsUsed());
        invoice.setUpdatedBy(request.updatedBy());
        invoice.setStatus(InvoiceStatus.COMPLETED);

        invoiceRepository.save(invoice);

        return InvoiceResponse.from(invoice);
    }

    private void updateInvoiceAmounts(
        Invoice invoice,
        List<InvoiceItem> items
    ) {

        BigDecimal subtotal = BigDecimal.ZERO;
        BigDecimal gst = BigDecimal.ZERO;

        for (InvoiceItem item : items) {

            BigDecimal sellingPrice = zeroIfNull(item.getSellingPrice());

            BigDecimal cgst = zeroIfNull(item.getCgstPercentage());

            BigDecimal sgst = zeroIfNull(item.getSgstPercentage());

            BigDecimal itemSubtotal =
                sellingPrice.multiply(BigDecimal.valueOf(item.getQty()));

            BigDecimal taxPercentage =
                cgst.add(sgst);

            BigDecimal itemTax = itemSubtotal
                .multiply(taxPercentage)
                .divide(BigDecimal.valueOf(100));

            subtotal = subtotal.add(itemSubtotal);
            gst = gst.add(itemTax);
        }

        invoice.setSubtotal(subtotal);
        invoice.setGstAmount(gst);
        invoice.setTotalAmount(subtotal.add(gst));
    }

    private void updatePaymentDetails(
        Invoice invoice,
        CompleteInvoiceRequest request
    ) {

        BigDecimal cash = zeroIfNull(request.cash());
        BigDecimal upi = zeroIfNull(request.upi());
        BigDecimal card = zeroIfNull(request.card());

        BigDecimal discount = zeroIfNull(request.discount());
        BigDecimal points = zeroIfNull(request.pointsUsed());

        BigDecimal paidAmount = cash.add(upi).add(card);

        BigDecimal payable = invoice.getTotalAmount()
            .subtract(discount)
            .subtract(points);

        BigDecimal balance = payable.subtract(paidAmount);
        BigDecimal change = BigDecimal.ZERO;

        if (balance.signum() < 0) {
            change = balance.abs();
            balance = BigDecimal.ZERO;
        }

        invoice.setCashAmount(cash);
        invoice.setUpiAmount(upi);
        invoice.setCardAmount(card);

        invoice.setPaidAmount(paidAmount);
        invoice.setBalanceAmount(balance);
        invoice.setChangeReturn(change);

        invoice.setPaymentMode(determinePaymentMode(cash, upi, card));
    }

    private BigDecimal zeroIfNull(BigDecimal value) {
        return value == null ? BigDecimal.ZERO : value;
    }

    private PaymentMode determinePaymentMode(
        BigDecimal cash,
        BigDecimal upi,
        BigDecimal card
    ) {

        int count = 0;

        count += cash.signum() > 0 ? 1 : 0;
        count += upi.signum() > 0 ? 1 : 0;
        count += card.signum() > 0 ? 1 : 0;

        if (count > 1) {
            return PaymentMode.SPLIT;
        }

        if (cash.compareTo(BigDecimal.ZERO) > 0) {
            return PaymentMode.CASH;
        }

        if (upi.compareTo(BigDecimal.ZERO) > 0) {
            return PaymentMode.UPI;
        }

        if (card.compareTo(BigDecimal.ZERO) > 0) {
            return PaymentMode.CARD;
        }

        return null;
    }
}
