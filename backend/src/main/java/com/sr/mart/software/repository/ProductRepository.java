package com.sr.mart.software.repository;

import com.sr.mart.software.entity.Product;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findByBarcode(String barcode);

    Optional<Product> findByProductNameIgnoreCase(String value);

    List<Product> findByProductNameStartingWithIgnoreCaseAndActiveTrue(String productName, Pageable pageable);
}
