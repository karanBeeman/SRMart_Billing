import { Save, Printer, Eye } from "lucide-react";

function InvoiceSummary({ subtotal, gst, points, total }) {
    return (
        <div
            className="
                bg-white/10
                backdrop-blur-lg
                border
                border-white/20
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
                    className="
                        bg-white
                        text-[#2347D9]
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
                        bg-yellow-500
                        text-white
                        px-6
                        py-3
                        rounded-xl
                        flex
                        items-center
                        gap-2
                    "
                >
                    <Eye size={18} />
                    Preview
                </button>

                <button
                    className="
                        bg-green-500
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
