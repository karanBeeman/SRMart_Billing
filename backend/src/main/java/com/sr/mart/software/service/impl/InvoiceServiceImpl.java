package com.sr.mart.software.service.impl;

import com.sr.mart.software.dto.CreateInvoiceRequest;
import com.sr.mart.software.dto.DraftInvoiceRequest;
import com.sr.mart.software.entity.Invoice;
import com.sr.mart.software.entity.InvoiceItem;
import com.sr.mart.software.entity.Product;
import com.sr.mart.software.enums.InvoiceStatus;
import com.sr.mart.software.exception.InvalidInvoiceException;
import com.sr.mart.software.exception.InvoiceAlreadyExistsException;
import com.sr.mart.software.model.InvoiceItemResponse;
import com.sr.mart.software.model.InvoiceResponse;
import com.sr.mart.software.repository.InvoiceItemRepository;
import com.sr.mart.software.repository.InvoiceRepository;
import com.sr.mart.software.repository.ProductRepository;
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
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;

    private final InvoiceItemRepository invoiceItemRepository;

    private final ProductRepository productRepository;

    @Override
    @Transactional
    public InvoiceResponse createDraftInvoice(
        DraftInvoiceRequest request
    ) {

        Optional<Invoice> existingDraft =
            invoiceRepository.findByStatusAndCreatedBy(
                InvoiceStatus.DRAFT,
                request.createdBy()
            );

        if (existingDraft.isPresent()) {
            return InvoiceResponse.from(
                existingDraft.get()
            );
        }

        Invoice invoice = Invoice.builder()
            .createdBy(request.createdBy())
            .status(InvoiceStatus.DRAFT)
            .build();

        invoice = invoiceRepository.save(invoice);

        invoice.setInvoiceNumber(
            String.format("INV%06d", invoice.getId())
        );

        invoice = invoiceRepository.save(invoice);

        return InvoiceResponse.from(invoice);
    }

    @Override
    @Transactional
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


    @Override
    @Transactional
    public InvoiceItemResponse createInvoiceLineItems(
        String invoiceNumber,
        Long productId
    ) {

        Invoice invoice =
            invoiceRepository
                .findByInvoiceNumber(invoiceNumber)
                .orElseThrow(
                    () -> new RuntimeException(
                        "Invoice not found"
                    )
                );

        Optional<InvoiceItem> existing =
            invoiceItemRepository
                .findByInvoiceAndProductId(
                    invoice,
                    productId
                );

        if (existing.isPresent()) {

            InvoiceItem item = existing.get();

            int newQty = item.getQty() + 1;

            item.setQty(newQty);

            item.setLineTotal(
                item.getSellingPrice()
                    .multiply(
                        BigDecimal.valueOf(newQty)
                    )
            );

            InvoiceItem createdItem = invoiceItemRepository.save(item);
            return InvoiceItemResponse.from(createdItem, 10.00);

        }

        Product product =
            productRepository
                .findById(productId)
                .orElseThrow(
                    () -> new RuntimeException(
                        "Product not found"
                    )
                );

        InvoiceItem item =
            InvoiceItem.builder()
                .invoice(invoice)
                .productId(product.getId())
                .productName(product.getProductName())
                .qty(1)
                .mrpPrice(product.getMrpPrice())
                .sellingPrice(
                    product.getSellingPrice()
                )
                .cgstPercentage(
                    product.getCgstPercentage()
                )
                .sgstPercentage(
                    product.getSgstPercentage()
                )
                .lineTotal(
                    product.getSellingPrice()
                )
                .build();

        InvoiceItem createdItem = invoiceItemRepository.save(item);

        return InvoiceItemResponse.from(createdItem, 10.00);
    }

    @Override
    @Transactional(readOnly = true)
    public List<InvoiceItemResponse> getInvoiceLineItems(
        String invoiceNumber
    ) {

        Invoice invoice =
            invoiceRepository
                .findByInvoiceNumber(invoiceNumber)
                .orElseThrow(
                    () -> new RuntimeException(
                        "Invoice not found"
                    )
                );

        return invoiceItemRepository
            .findByInvoice(invoice)
            .stream()
            .map(item -> {

                Product product =
                    productRepository
                        .findById(item.getProductId())
                        .orElseThrow();

                return InvoiceItemResponse.from(
                    item,
                    product.getStockQuantity()
                );
            })
            .toList();
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
}
