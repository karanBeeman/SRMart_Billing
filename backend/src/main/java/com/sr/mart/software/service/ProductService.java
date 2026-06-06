package com.sr.mart.software.service;

import com.sr.mart.software.dto.AddProductRequest;
import com.sr.mart.software.model.ProductResponse;
import java.util.List;

public interface ProductService {

    ProductResponse addProduct(AddProductRequest request);

    ProductResponse searchProduct(String searchValue);

    List<ProductResponse.Suggestion> searchProducts(String searchValue, int size);
}
