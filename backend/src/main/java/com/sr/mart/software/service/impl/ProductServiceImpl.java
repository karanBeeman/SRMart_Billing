package com.sr.mart.software.service.impl;

import com.sr.mart.software.dto.AddProductRequest;
import com.sr.mart.software.entity.Product;
import com.sr.mart.software.model.ProductResponse;
import com.sr.mart.software.repository.ProductRepository;
import com.sr.mart.software.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public ProductResponse addProduct(AddProductRequest request) {

        /* if (productRepository.existsByBarcode(request.barcode())) {
            throw new BusinessException(
                "Product already exists with barcode: "
                    + request.barcode());
        } */

        Product product = Product.builder()
            .barcode(request.barcode())
            .productName(request.productName())
            .category(request.category())
            .purchasePrice(request.purchasePrice())
            .mrpPrice(request.mrpPrice())
            .sellingPrice(request.sellingPrice())
            .cgstPercentage(request.cgstPercentage())
            .sgstPercentage(request.sgstPercentage())
            .stockQuantity(request.stockQuantity())
            .active(true)
            .build();

        Product savedProduct = productRepository.save(product);

        return ProductResponse.from(savedProduct);
    }

    @Override
    public ProductResponse searchProduct(String searchValue) {
        Product product = null;

        // 1. Search by barcode
        product = productRepository
            .findByBarcode(searchValue)
            .orElse(null);

        // 2. Search by product ID
        if (product == null && searchValue.matches("\\d+")) {
            product = productRepository
                .findById(Long.valueOf(searchValue))
                .orElse(null);
        }

        // 3. Search by product name
        if (product == null) {
            product = productRepository
                .findByProductNameIgnoreCase(searchValue)
                .orElse(null);
        }

        if (product == null) {
            throw new RuntimeException(
                "Product not found for: " + searchValue
            );
        }

        return ProductResponse.from(product);
    }
}
