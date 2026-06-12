import { Save, Printer, Eye, Archive } from "lucide-react";

function InvoiceSummary({ subtotal, gst, points, total, onHoldBill }) {
    return (
        <div
            className="

            bg-slate-900/40
border-blue-500/20
backdrop-blur-xl
                border

                rounded-2xl
                p-6

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
                        text-white
                    "
                >
                    <span>Royalty Used</span>
                    <span>₹{points}</span>
                </div>

                <div
                    className="
                        flex
                        justify-between
                        text-xl
                        font-bold
                        text-white
                    "
                >
                    <span>Total</span>
                    <span>₹{total}</span>
                </div>
            </div>

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
                    className="
                      bg-yellow-500
                      hover:bg-yellow-600
                      text-white
                        px-6
                        py-3
                        rounded-xl
                        flex
                        items-center
                        gap-2
                    "
                >
                    <Save size={18} />
                    Save
                </button>

                <button
                    className="
                        bg-green-500
                        hover:bg-green-600
                        text-white
                        px-6
                        py-3
                        rounded-xl
                        flex
                        items-center
                        gap-2
                    "
                >
                    <Printer size={18} />
                    Print
                </button>
            </div>
        </div>
    );
}

export default InvoiceSummary;
