export default function useInvoiceSummary(products) {
    const subtotal = products.reduce(
        (sum, product) => sum + (product.total || 0),
        0
    );

    const gst = subtotal * 0.05;

    const total = subtotal + gst;

    const earnedPoints = total >= 200 ? Math.floor(total / 100) : 0;

    return {
        subtotal,
        gst,
        total,
        earnedPoints,
    };
}
