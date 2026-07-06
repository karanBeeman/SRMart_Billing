import { Printer } from "lucide-react";

function ReceiptPreviewModal({ open, receipt, onClose }) {
    if (!open || !receipt) return null;

    const { invoice, items } = receipt;

    const handlePrint = () => {
        const receipt = document.querySelector(".receipt-content");

        if (!receipt) return;

        const printWindow = window.open("", "_blank", "width=900,height=700");

        printWindow.document.write(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>${invoice.invoiceNumber}</title>

                <script src="https://cdn.tailwindcss.com"></script>

                <style>
                    @page {
                        size: 80mm auto;
                        margin: 5mm;
                    }

                    body {
                        margin: 0;
                        padding: 0;
                        background: white;
                    }
                </style>
            </head>

            <body class="bg-white">
                ${receipt.outerHTML}
            </body>
        </html>
    `);

        printWindow.document.close();

        printWindow.onload = () => {
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        };
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div
                className="
        w-[500px]
        max-h-[90vh]
        bg-white
        rounded-xl
        shadow-2xl
        flex
        flex-col
        overflow-hidden
    "
            >
                {/* Store Header */}
                <div
                    className="
         receipt-content
      flex-1
      overflow-y-auto
      px-10
      pt-8
      pb-6
      bg-white
      text-black
    "
                >
                    <div className="text-center mt-2">
                        <h1 className="text-5xl font-extrabold tracking-wide">
                            SR MART
                        </h1>

                        <p className="mt-3 text-gray-700">
                            Fresh Grocery & Daily Needs
                        </p>

                        <p className="mt-2 text-sm text-gray-600">
                            No.12, Anna Nagar
                            <br />
                            Madurai - 625020
                            <br />
                            Tamil Nadu
                        </p>

                        <p className="mt-2 text-sm">GSTIN : 33ABCDE1234F1Z5</p>

                        <p className="text-sm">Ph : +91 9876543210</p>
                    </div>

                    <div className="border-t border-dashed border-black my-6" />

                    {/* Invoice */}

                    <div className="space-y-2">
                        <ReceiptRow
                            label="Invoice"
                            value={invoice.invoiceNumber}
                        />

                        <ReceiptRow
                            label="Date"
                            value={new Date(invoice.updatedAt).toLocaleString(
                                "en-IN"
                            )}
                        />

                        <ReceiptRow label="Cashier" value={invoice.updatedBy} />
                    </div>

                    {(invoice.customerName || invoice.customerPhone) && (
                        <>
                            <div className="border-t border-dashed border-black my-6" />

                            <div className="space-y-2">
                                <ReceiptRow
                                    label="Customer"
                                    value="Walk-in Customer"
                                />

                                <ReceiptRow
                                    label="Phone"
                                    value="+91 98765 43210"
                                />
                            </div>
                        </>
                    )}

                    <div className="border-t border-dashed border-black my-6" />

                    {/* Items */}

                    <table className="w-full">
                        <thead>
                            <tr className="font-bold border-b">
                                <th className="text-left py-2">Item</th>

                                <th className="text-center">Qty</th>

                                <th className="text-right">Rate</th>

                                <th className="text-right">Amt</th>
                            </tr>
                        </thead>

                        <tbody>
                            {items.map((item) => (
                                <tr key={item.invoiceItemId}>
                                    <td className="py-2">{item.productName}</td>

                                    <td className="text-center">{item.qty}</td>

                                    <td className="text-right">
                                        ₹{Number(item.sellingPrice).toFixed(2)}
                                    </td>

                                    <td className="text-right">
                                        ₹{Number(item.lineTotal).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="border-t border-dashed border-black my-6" />

                    {/* Totals */}

                    <div className="space-y-2">
                        <ReceiptAmount
                            label="Subtotal"
                            value={invoice.subtotal}
                        />

                        <ReceiptAmount label="GST" value={invoice.gstAmount} />

                        {Number(invoice.discountAmount ?? 0) > 0 && (
                            <ReceiptAmount
                                label="Discount"
                                value={invoice.discountAmount}
                            />
                        )}

                        <div className="border-t border-black my-2" />

                        <ReceiptAmount
                            label="TOTAL"
                            value={invoice.totalAmount}
                            bold
                        />

                        <ReceiptAmount
                            label="Paid"
                            value={invoice.paidAmount}
                        />

                        <ReceiptAmount
                            label="Change"
                            value={invoice.changeReturn}
                        />
                        <div className="border-t border-dashed border-black my-4" />

                        <ReceiptRow
                            label="Payment Mode"
                            value={invoice.paymentMode}
                        />

                        {Number(invoice.cashAmount ?? 0) > 0 && (
                            <ReceiptRow
                                label="Cash"
                                value={`₹${Number(invoice.cashAmount).toFixed(2)}`}
                            />
                        )}

                        {Number(invoice.upiAmount ?? 0) > 0 && (
                            <ReceiptRow
                                label="UPI"
                                value={`₹${Number(invoice.upiAmount).toFixed(2)}`}
                            />
                        )}

                        {Number(invoice.cardAmount ?? 0) > 0 && (
                            <ReceiptRow
                                label="Card"
                                value={`₹${Number(invoice.cardAmount).toFixed(2)}`}
                            />
                        )}
                    </div>

                    {(Number(invoice.loyaltyPointsEarned ?? 0) > 0 ||
                        Number(invoice.loyaltyPointsUsed ?? 0) > 0) && (
                        <>
                            <div className="border-t border-dashed border-black my-6" />

                            <div className="space-y-2">
                                {Number(invoice.loyaltyPointsEarned ?? 0) >
                                    0 && (
                                    <ReceiptRow
                                        label="Points Earned"
                                        value={`${Number(invoice.loyaltyPointsEarned).toFixed(2)} Points`}
                                    />
                                )}

                                {Number(invoice.loyaltyPointsUsed ?? 0) > 0 && (
                                    <ReceiptRow
                                        label="Points Redeemed"
                                        value={`${Number(invoice.loyaltyPointsUsed).toFixed(2)} Points`}
                                    />
                                )}
                            </div>
                        </>
                    )}

                    <div className="border-t border-dashed border-black my-6" />

                    <div className="text-center space-y-2">
                        <p className="font-semibold">Thank You! Visit Again</p>

                        <p className="text-xs text-gray-600">
                            Goods once sold cannot be returned without original
                            bill.
                        </p>

                        <p className="text-xs text-gray-600">www.srmart.com</p>
                    </div>
                </div>
                <div className="print:hidden border-t border-gray-200 bg-slate-100 px-8 py-5 flex-shrink-0">
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={onClose}
                            className="
                        w-full
        py-3
        rounded-xl
        bg-slate-600
        hover:bg-slate-700
        text-white
        font-semibold
                    "
                        >
                            Close
                        </button>
                        <button
                            onClick={handlePrint}
                            className="
        w-full
        flex
        items-center
        justify-center
        gap-2
        py-4
        rounded-xl
        bg-blue-600
        hover:bg-blue-700
        text-white
        text-lg
        font-semibold
        transition-colors
    "
                        >
                            <Printer size={22} strokeWidth={2.2} />
                            <span>Print Receipt</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ReceiptAmount({ label, value, bold = false }) {
    return (
        <div
            className={`flex justify-between ${
                bold ? "text-3xl font-extrabold" : ""
            }`}
        >
            <span>{label}</span>

            <span className="font-semibold tabular-nums">
                ₹{Number(value ?? 0).toFixed(2)}
            </span>
        </div>
    );
}

function ReceiptRow({ label, value }) {
    return (
        <div className="flex justify-between">
            <span>{label}</span>
            <span className="font-medium tabular-nums">{value}</span>
        </div>
    );
}

export default ReceiptPreviewModal;
