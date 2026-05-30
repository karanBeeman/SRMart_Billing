package com.sr.mart.software.service;

import com.sr.mart.software.dto.AddProductRequest;
import com.sr.mart.software.model.ProductResponse;

public interface ProductService {

    ProductResponse addProduct(AddProductRequest request);
}
