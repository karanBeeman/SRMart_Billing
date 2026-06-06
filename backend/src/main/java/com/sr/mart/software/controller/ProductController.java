package com.sr.mart.software.controller;

import com.sr.mart.software.dto.AddProductRequest;
import com.sr.mart.software.model.ProductResponse;
import com.sr.mart.software.service.ProductService;
import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
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

    @GetMapping("products/lookup")
    public ResponseEntity<ProductResponse> searchProduct(@RequestParam("value") String searchValue) {
        ProductResponse response = productService.searchProduct(searchValue);
        return ResponseEntity.ok(response);
    }

    @GetMapping("products/search")
    public ResponseEntity<List<ProductResponse.Suggestion>> searchProducts(
        @RequestParam("value") String searchValue,
        @RequestParam(name = "size", defaultValue = "10") int size
    ) {
        List<ProductResponse.Suggestion> response = productService.searchProducts(searchValue, size);
        return ResponseEntity.ok(response);
    }
}
