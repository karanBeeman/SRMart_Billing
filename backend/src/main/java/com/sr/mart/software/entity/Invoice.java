package com.sr.mart.software.entity;

import com.sr.mart.software.enums.InvoiceStatus;
import com.sr.mart.software.enums.PaymentMode;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "invoices")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Invoice extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
            name = "invoice_number",
            unique = true
    )
    private String invoiceNumber;

    private BigDecimal subtotal;

    private BigDecimal gstAmount;

    private BigDecimal discountAmount;

    private BigDecimal loyaltyPointsUsed;

    @Column(name = "loyalty_points_earned")
    private BigDecimal loyaltyPointsEarned;

    private BigDecimal paidAmount;

    private BigDecimal balanceAmount;

    private BigDecimal changeReturn;

    private String createdBy;

    private String updatedBy;

    private BigDecimal totalAmount;

    @Enumerated(EnumType.STRING)
    private InvoiceStatus status;

    @Enumerated(EnumType.STRING)
    private PaymentMode paymentMode;

    @Column(name = "cash_amount")
    private BigDecimal cashAmount;

    @Column(name = "upi_amount")
    private BigDecimal upiAmount;

    @Column(name = "card_amount")
    private BigDecimal cardAmount;

}
