package com.sr.mart.software.repository;

import com.sr.mart.software.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    boolean existsByBarcode(String barcode);
}
