export default function ResumeBillModal({ open, onClose, bills, onResume }) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-700 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">Held Bills</h2>

                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                    {bills.map((bill) => (
                        <div
                            key={bill.invoiceNumber}
                            className="
                                border
                                border-slate-700
                                rounded-xl
                                p-4
                                bg-slate-800/50
                            "
                        >
                            <div className="flex justify-between">
                                <div>
                                    <div className="text-lg font-bold text-white">
                                        {bill.invoiceNumber}
                                    </div>

                                    <div className="text-sm text-gray-400">
                                        {bill.previewItems.join(", ")}
                                    </div>

                                    <div className="text-xs text-gray-500 mt-2">
                                        {bill.itemCount} Items • Held at{" "}
                                        {bill.heldAt}
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className="text-green-400 font-bold">
                                        ₹{bill.totalAmount}
                                    </div>

                                    <button
                                        onClick={() => onResume(bill)}
                                        className="
                                            mt-3
                                            bg-blue-500
                                            hover:bg-blue-600
                                            px-4
                                            py-2
                                            rounded-lg
                                            text-white
                                        "
                                    >
                                        Resume
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
