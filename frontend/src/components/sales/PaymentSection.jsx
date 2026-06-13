import { useMemo, useState } from "react";
import { Smartphone, CreditCard, Banknote } from "lucide-react";

function PaymentSection({ total }) {
    const [cash, setCash] = useState("");
    const [upi, setUpi] = useState("");
    const [card, setCard] = useState("");

    const paidAmount = useMemo(() => {
        return Number(cash || 0) + Number(upi || 0) + Number(card || 0);
    }, [cash, upi, card]);

    const balance = Math.max(total - paidAmount, 0);

    const change = Math.max(paidAmount - total, 0);

    return (
        <div
            className="
                bg-slate-900/40
                border
                border-blue-500/20
                backdrop-blur-xl
                rounded-2xl
                p-6
                mb-6
            "
        >
            <h2 className="text-xl font-semibold text-white mb-6">
                Payment Details
            </h2>

            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <Banknote className="text-green-400" size={20} />

                    <input
                        type="number"
                        min="0"
                        value={cash}
                        onChange={(e) => setCash(e.target.value)}
                        placeholder="Cash Amount"
                        className="
                            w-full
                            p-3
                            rounded-xl
                            bg-white/10
                            border
                            border-white/10
                            text-white
                            outline-none
                        "
                    />
                </div>

                <div className="flex items-center gap-3">
                    <Smartphone className="text-cyan-400" size={20} />

                    <input
                        type="number"
                        min="0"
                        value={upi}
                        onChange={(e) => setUpi(e.target.value)}
                        placeholder="UPI Amount"
                        className="
                            w-full
                            p-3
                            rounded-xl
                            bg-white/10
                            border
                            border-white/10
                            text-white
                            outline-none
                        "
                    />
                </div>

                <div className="flex items-center gap-3">
                    <CreditCard className="text-yellow-400" size={20} />

                    <input
                        type="number"
                        min="0"
                        value={card}
                        onChange={(e) => setCard(e.target.value)}
                        placeholder="Card Amount"
                        className="
                            w-full
                            p-3
                            rounded-xl
                            bg-white/10
                            border
                            border-white/10
                            text-white
                            outline-none
                        "
                    />
                </div>
            </div>

            <div className="border-t border-white/10 mt-6 pt-6 space-y-3">
                <div className="flex justify-between">
                    <span className="text-gray-300">Bill Total</span>

                    <span className="text-white font-semibold">
                        ₹{total.toFixed(2)}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-300">Paid Amount</span>

                    <span className="text-green-400 font-semibold">
                        ₹{paidAmount.toFixed(2)}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-300">Balance</span>

                    <span
                        className={
                            balance > 0
                                ? "text-red-400 font-semibold"
                                : "text-green-400 font-semibold"
                        }
                    >
                        ₹{balance.toFixed(2)}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-300">Change Return</span>

                    <span className="text-cyan-400 font-semibold">
                        ₹{change.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default PaymentSection;
