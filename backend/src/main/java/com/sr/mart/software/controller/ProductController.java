package com.sr.mart.software.controller;

import com.sr.mart.software.dto.AddProductRequest;
import com.sr.mart.software.model.ProductResponse;
import com.sr.mart.software.service.ProductService;
import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@SuppressFBWarnings(
    value = "EI_EXPOSE_REP2",
    justification = "Spring-managed service injected via constructor"
)
public class ProductController {

    private final ProductService productService;

    @PostMapping("/add/product")
    public ResponseEntity<ProductResponse> addProduct(@Valid @RequestBody AddProductRequest request) {

        ProductResponse response = productService.addProduct(request);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(response);
    }
}
