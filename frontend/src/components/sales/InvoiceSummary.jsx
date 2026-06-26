import { Save, Printer, Archive } from "lucide-react";

function InvoiceSummary({
    subtotal,
    gst,
    total,
    originalTotal,
    discount,
    setDiscount,
    pointsUsed,
    setPointsUsed,
    paidAmount,
    changeReturn,
    onHoldBill,
    onResumeBill,
}) {
    return (
        <div
            className="

            bg-slate-900/40
            border-blue-500/20
              backdrop-blur-xl
              border

              rounded-2xl
              p-6
              mb-6
            "
        >
            <div className="space-y-3">
                <div
                    className="
                        flex
                        justify-between
                        text-white
                    "
                >
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                </div>

                <div
                    className="
                        flex
                        justify-between
                        text-white
                    "
                >
                    <span>GST</span>
                    <span>₹{gst}</span>
                </div>

                <div
                    className="
        flex
        justify-between
        items-center
        text-white
    "
                >
                    <span>Discount</span>

                    <input
                        type="number"
                        min="0"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                                e.preventDefault();
                            }
                        }}
                        onWheel={(e) => e.currentTarget.blur()}
                        className="
                        no-spinner
            w-16
            p-2
            rounded-xl
            bg-white/10
            border
            border-white/10
            text-white
            text-right
            outline-none
            focus:border-cyan-400
        "
                    />
                </div>

                <div
                    className="
        flex
        justify-between
        items-center
        text-white
    "
                >
                    <span>Loyalty Points Used</span>

                    <input
                        type="number"
                        min="0"
                        value={pointsUsed}
                        onChange={(e) => setPointsUsed(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                                e.preventDefault();
                            }
                        }}
                        onWheel={(e) => e.currentTarget.blur()}
                        className="
            no-spinner
            w-16
            p-2
            rounded-xl
            bg-white/10
            border
            border-white/10
            text-white
            text-right
            outline-none
            focus:border-cyan-400
        "
                    />
                </div>

                <div className="border-t border-white/10 mt-8 pt-8">
                    <div className="space-y-4">
                        <div className="flex justify-between text-white">
                            <span>Bill Total</span>
                            <span>₹{originalTotal.toFixed(2)}</span>
                        </div>

                        {Number(discount || 0) > 0 && (
                            <div className="flex justify-between text-yellow-400">
                                <span>Discount</span>
                                <span>- ₹{Number(discount).toFixed(2)}</span>
                            </div>
                        )}

                        {Number(pointsUsed || 0) > 0 && (
                            <div className="flex justify-between text-cyan-400">
                                <span>Loyalty Points Used</span>
                                <span>- ₹{Number(pointsUsed).toFixed(2)}</span>
                            </div>
                        )}

                        <div className="border-t border-white/10 pt-4 flex justify-between text-2xl font-bold text-green-400">
                            <span>Amount Payable</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>

                        <div className="border-t border-white/10 pt-4">
                            <div className="flex justify-between text-gray-300">
                                <span>Paid Amount</span>
                                <span>₹{paidAmount.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between mt-2 text-cyan-400 font-semibold">
                                <span>Change Return</span>
                                <span>₹{changeReturn.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-auto pt-10">
                    <div className="border-t border-white/10 mt-8 pt-8">
                        <div className="flex gap-4">
                            <div
                                className="
                    flex
                    gap-4
                    mt-6
                "
                            >
                                <button
                                    onClick={onHoldBill}
                                    className="
                bg-orange-500
                hover:bg-orange-600
                text-white
                px-6
                py-3
                rounded-xl
                flex
                items-center
                gap-2
                "
                                >
                                    <Archive size={18} />
                                    Hold Bill
                                </button>
                                <button
                                    onClick={onResumeBill}
                                    className="
        bg-blue-500
        hover:bg-blue-600
        text-white
        px-6
        py-3
        rounded-xl
    "
                                >
                                    Resume Bill
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InvoiceSummary;
