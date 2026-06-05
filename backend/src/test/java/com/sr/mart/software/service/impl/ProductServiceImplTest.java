package com.sr.mart.software.service.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.sr.mart.software.entity.Product;
import com.sr.mart.software.exception.ProductNotFoundException;
import com.sr.mart.software.model.ProductResponse;
import com.sr.mart.software.repository.ProductRepository;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class ProductServiceImplTest {

    @Mock private ProductRepository productRepository;

    @InjectMocks private ProductServiceImpl productServiceImpl;

    @Test void searchProduct_shouldReturnByBarcode_whenBarcodeExists() {
        Product product = product(1L, "123456", "Milk");
        when(productRepository.findByBarcode("123456")).thenReturn(Optional.of(product));

        ProductResponse response = productServiceImpl.searchProduct("123456");

        assertEquals("Milk", response.productName());
        verify(productRepository, never()).findById(1L);
        verify(productRepository, never()).findByProductNameIgnoreCase("123456");
    }

    @Test void searchProduct_shouldReturnById_whenBarcodeMissingAndSearchValueIsNumeric() {
        Product product = product(10L, null, "Rice");
        when(productRepository.findByBarcode("10")).thenReturn(Optional.empty());
        when(productRepository.findById(10L)).thenReturn(Optional.of(product));

        ProductResponse response = productServiceImpl.searchProduct("10");

        assertEquals("Rice", response.productName());
        verify(productRepository).findById(10L);
    }

    @Test void searchProduct_shouldReturnByName_whenBarcodeMissingAndSearchValueIsNonNumeric() {
        Product product = product(22L, null, "Soap");
        when(productRepository.findByBarcode("Soap")).thenReturn(Optional.empty());
        when(productRepository.findByProductNameIgnoreCase("Soap")).thenReturn(Optional.of(product));

        ProductResponse response = productServiceImpl.searchProduct("Soap");

        assertEquals("Soap", response.productName());
    }

    @Test void searchProduct_shouldReturnByName_whenBarcodeAndIdMissing() {
        Product product = product(30L, null, "Sugar");
        when(productRepository.findByBarcode("30")).thenReturn(Optional.empty());
        when(productRepository.findById(30L)).thenReturn(Optional.empty());
        when(productRepository.findByProductNameIgnoreCase("30")).thenReturn(Optional.of(product));

        ProductResponse response = productServiceImpl.searchProduct("30");

        assertEquals("Sugar", response.productName());
    }

    @Test void searchProduct_shouldThrowException_whenNothingMatches() {
        when(productRepository.findByBarcode("unknown")).thenReturn(Optional.empty());
        when(productRepository.findByProductNameIgnoreCase("unknown")).thenReturn(Optional.empty());

        assertThrows(ProductNotFoundException.class, () -> productServiceImpl.searchProduct("unknown"));
    }

    private Product product(Long id, String barcode, String productName) {
        return Product.builder()
            .id(id)
            .barcode(barcode)
            .productName(productName)
            .build();
    }
}
