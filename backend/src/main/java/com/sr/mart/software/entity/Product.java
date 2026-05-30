package com.sr.mart.software.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String barcode;

    @Column(nullable = false)
    private String productName;

    private String category;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal purchasePrice;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal mrpPrice;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal sellingPrice;

    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal cgstPercentage;

    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal sgstPercentage;

    @Column(nullable = false)
    private Integer stockQuantity;

    @Builder.Default
    @Column(nullable = false)
    private Boolean active = true;
}
