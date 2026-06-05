# Sales Page Design

## Purpose

The Sales Page is the primary billing screen used by cashiers to create invoices, scan products, manage customer information, and calculate totals.

---

## Product Scanning Flow

### Barcode Scan

1. Cashier scans a barcode.
2. Barcode scanner enters the value into the Product Search field.
3. Scanner sends Enter automatically.
4. Product lookup API is called.
5. Product is added to the bill.
6. Input field is cleared.
7. Focus returns to the scanner input.

### Duplicate Product Handling

Current behaviour:

- If the scanned product already exists in the bill:
    - Quantity is incremented by 1.
    - No duplicate row is created.

Example:

Milk scanned once:

Qty = 1

Milk scanned again:

Qty = 2

Reason:

- Faster billing process.
- Matches common supermarket POS behaviour.

---

## Product Table

### Editable Quantity

Quantity can be manually edited.

Examples:

1
10
25
100

Design decisions:

- Browser spinner arrows are disabled.
- User may temporarily clear the field while editing.
- Validation occurs when editing completes.
- Minimum allowed quantity is 1.

### Editable Selling Price

Selling price can be modified by the cashier.

Use cases:

- Manual discounts
- Promotional pricing
- Manager-approved overrides

MRP remains read-only.

---

## Invoice Calculation

Subtotal:

Sum of all product line totals.

Line Total:

Quantity × Selling Price

GST:

5% of subtotal

Grand Total:

Subtotal + GST

---

## Customer Section

Stores:

- Customer Name
- Mobile Number
- Address
- Loyalty Points

Future Enhancements:

- Customer search
- Customer history
- Loyalty redemption

---

## Component Structure

SalesPage
├── SalesHeader
├── ProductScanner
├── ProductTable
├── InvoiceSummary
└── CustomerSection

CustomerSection
├── CustomerSearch
├── CustomerForm
└── LoyaltyCard

---

## Future Improvements

- Payment screen
- Cash/Card/UPI support
- Discount column
- Hold bill functionality
- Product return flow
- Keyboard shortcuts
- Barcode scanner settings
- Duplicate item handling configuration
