package com.sr.mart.software.service.impl;

import com.sr.mart.software.entity.Invoice;
import com.sr.mart.software.entity.InvoiceItem;
import com.sr.mart.software.entity.Product;
import com.sr.mart.software.exception.InvoiceLineItemNotFoundException;
import com.sr.mart.software.exception.InvoiceNotFoundException;
import com.sr.mart.software.exception.ProductNotFoundException;
import com.sr.mart.software.model.InvoiceItemResponse;
import com.sr.mart.software.repository.InvoiceItemRepository;
import com.sr.mart.software.repository.InvoiceRepository;
import com.sr.mart.software.repository.ProductRepository;
import com.sr.mart.software.service.InvoiceItemService;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class InvoiceItemServiceImpl implements InvoiceItemService {

    private final InvoiceRepository invoiceRepository;

    private final InvoiceItemRepository invoiceItemRepository;

    private final ProductRepository productRepository;

    private static final String INVOICE_ITEM_NOT_FOUND =  "Invoice item not found for the given id:";

    @Override
    @Transactional
    public InvoiceItemResponse createInvoiceLineItems(String invoiceNumber, Long productId) {

        Invoice invoice = findInvoiceByInvoiceNumberFromInvoiceRepository(invoiceNumber);

        Optional<InvoiceItem> existing =
            invoiceItemRepository
                .findByInvoiceAndProductId(
                    invoice,
                    productId
                );

        Product product = findProductByIdFromProductRepository(productId);

        if (existing.isPresent()) {

            InvoiceItem item = existing.get();

            int newQty = item.getQty() + 1;

            item.setQty(newQty);

            item.setLineTotal(
                item.getSellingPrice().multiply(BigDecimal.valueOf(newQty))
            );

            InvoiceItem createdItem = invoiceItemRepository.save(item);
            return InvoiceItemResponse.from(createdItem, product.getStockQuantity());

        }

        InvoiceItem item =
            InvoiceItem.builder()
                .invoice(invoice)
                .productId(product.getId())
                .productName(product.getProductName())
                .qty(1)
                .mrpPrice(product.getMrpPrice())
                .sellingPrice(product.getSellingPrice())
                .cgstPercentage(product.getCgstPercentage())
                .sgstPercentage(product.getSgstPercentage())
                .lineTotal(product.getSellingPrice())
                .build();

        InvoiceItem createdItem = invoiceItemRepository.save(item);

        return InvoiceItemResponse.from(createdItem, product.getStockQuantity());
    }

    @Override
    @Transactional(readOnly = true)
    public List<InvoiceItemResponse> getInvoiceLineItems(
        String invoiceNumber
    ) {

        Invoice invoice = findInvoiceByInvoiceNumberFromInvoiceRepository(invoiceNumber);

        return invoiceItemRepository
            .findByInvoice(invoice)
            .stream()
            .map(item -> {

                Product product = findProductByIdFromProductRepository(item.getProductId());

                return InvoiceItemResponse.from(
                    item,
                    product.getStockQuantity()
                );
            })
            .toList();
    }

    @Override
    @Transactional
    public InvoiceItemResponse updateQty(Long invoiceItemId, Double qty) {

        InvoiceItem item =
            invoiceItemRepository
                .findById(invoiceItemId)
                .orElseThrow(
                    () -> new InvoiceLineItemNotFoundException(
                        INVOICE_ITEM_NOT_FOUND + invoiceItemId
                    )
                );

        Product product = findProductByIdFromProductRepository(item.getProductId());

        item.setQty(qty.intValue());

        item.setLineTotal(
            item.getSellingPrice().multiply(BigDecimal.valueOf(qty))
        );

        InvoiceItem updatedItem = invoiceItemRepository.save(item);

        return InvoiceItemResponse.from(updatedItem, product.getStockQuantity());
    }

    @Override
    @Transactional
    public InvoiceItemResponse updateSellingPrice(Long invoiceItemId, BigDecimal sellingPrice) {
        InvoiceItem item =
            invoiceItemRepository
                .findById(invoiceItemId)
                .orElseThrow(
                    () -> new InvoiceLineItemNotFoundException(
                        INVOICE_ITEM_NOT_FOUND + invoiceItemId
                    )
                );

        Product product = findProductByIdFromProductRepository(item.getProductId());

        item.setSellingPrice(sellingPrice);

        item.setLineTotal(
            sellingPrice.multiply(BigDecimal.valueOf(item.getQty()))
        );

        InvoiceItem updatedItem = invoiceItemRepository.save(item);

        return InvoiceItemResponse.from(updatedItem, product.getStockQuantity());
    }

    @Transactional
    @Override
    public void deleteInvoice(Long invoiceItemId) {
        InvoiceItem item =
            invoiceItemRepository
                .findById(invoiceItemId)
                .orElseThrow(
                    () -> new InvoiceLineItemNotFoundException(
                        INVOICE_ITEM_NOT_FOUND + invoiceItemId
                    )
                );

        invoiceItemRepository.delete(item);
    }

    private Product findProductByIdFromProductRepository(Long productId) {
        return productRepository
            .findById(productId)
            .orElseThrow(
                () -> new ProductNotFoundException(
                    "Product not found for product id: " + productId
                )
            );
    }

    private Invoice findInvoiceByInvoiceNumberFromInvoiceRepository(String invoiceNumber) {
        return invoiceRepository
            .findByInvoiceNumber(invoiceNumber)
            .orElseThrow(
                () -> new InvoiceNotFoundException(
                    "Invoice not found for invoice number: " + invoiceNumber
                )
            );
    }

}
