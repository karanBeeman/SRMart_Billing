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
}
