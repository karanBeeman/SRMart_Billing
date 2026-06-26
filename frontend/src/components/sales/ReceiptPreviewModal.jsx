// components/sales/ReceiptPreviewModal.jsx

function ReceiptPreviewModal({ open, receipt, onClose, onPrint }) {
    console.log("Modal render", open, receipt);

    if (!open || !receipt) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white w-[380px] rounded-lg p-6 max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold text-center mb-4">SR MART</h2>

                <div className="text-sm space-y-2">
                    <p>
                        <strong>Invoice:</strong> {receipt.invoiceNumber}
                    </p>

                    <p>
                        <strong>Total:</strong> ₹{receipt.totalAmount}
                    </p>

                    <p>
                        <strong>Paid:</strong> ₹{receipt.paidAmount}
                    </p>

                    <p>
                        <strong>Change:</strong> ₹{receipt.changeReturn}
                    </p>
                </div>

                <hr className="my-4" />

                <table className="w-full text-sm">
                    <thead>
                        <tr>
                            <th className="text-left">Item</th>
                            <th>Qty</th>
                            <th className="text-right">Amount</th>
                        </tr>
                    </thead>

                    <tbody>
                        {receipt.items?.map((item) => (
                            <tr key={item.id}>
                                <td>{item.productName}</td>
                                <td className="text-center">{item.qty}</td>
                                <td className="text-right">
                                    ₹{item.lineTotal}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-300"
                    >
                        Close
                    </button>

                    <button
                        onClick={onPrint}
                        className="px-4 py-2 rounded bg-blue-600 text-white"
                    >
                        Print
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReceiptPreviewModal;
