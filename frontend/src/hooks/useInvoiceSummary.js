export default function useInvoiceSummary(products) {
    const total = products.reduce(
        (sum, product) => sum + product.sellingPrice * product.qty,
        0
    );

    const earnedPoints = total >= 200 ? Math.floor(total / 100) : 0;

    return {
        subtotal: total,
        gst: 0,
        total,
        earnedPoints,
    };
}
