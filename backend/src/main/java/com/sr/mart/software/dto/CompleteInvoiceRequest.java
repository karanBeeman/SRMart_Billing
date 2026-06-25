package com.sr.mart.software.dto;

import java.math.BigDecimal;

public record CompleteInvoiceRequest(
     BigDecimal discount,
     BigDecimal pointsUsed,
     BigDecimal cash,
     BigDecimal upi,
     BigDecimal card,
     String updatedBy
) {

}
