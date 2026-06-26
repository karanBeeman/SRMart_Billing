export const mapInvoiceItem = (item) => ({
    id: item.productId,
    invoiceItemId: item.id,

    productName: item.productName,

    qty: item.qty,

    mrpPrice: item.mrpPrice,
    sellingPrice: item.sellingPrice,

    cgstPercentage: item.cgstPercentage,
    sgstPercentage: item.sgstPercentage,

    stockQuantity: item.stockQuantity,

    total: item.lineTotal,
});
