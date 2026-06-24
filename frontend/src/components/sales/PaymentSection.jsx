import {
    Smartphone,
    CreditCard,
    Banknote,
    CheckCircle,
    Printer,
} from "lucide-react";

function PaymentSection({
    total,
    cash,
    setCash,
    upi,
    setUpi,
    card,
    setCard,
    paidAmount,
    balance,
    changeReturn,
    onCompleteSale,
    onCompleteAndPrint,
}) {
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
                    <Banknote
                        size={20}
                        className="text-green-400 flex-shrink-0"
                    />

                    <input
                        type="number"
                        min="0"
                        value={cash}
                        onChange={(e) => setCash(e.target.value)}
                        placeholder="Cash Amount"
                        className="
                        no-spinner
                            w-full
                            p-3
                            rounded-xl
                            bg-white/10
                            border
                            border-white/10
                            text-white
                            outline-none
                            focus:border-green-400/50
                        "
                    />
                </div>

                <div className="flex items-center gap-3">
                    <Smartphone
                        size={20}
                        className="text-cyan-400 flex-shrink-0"
                    />

                    <input
                        type="number"
                        min="0"
                        value={upi}
                        onChange={(e) => setUpi(e.target.value)}
                        placeholder="UPI Amount"
                        className="
                        no-spinner
                            w-full
                            p-3
                            rounded-xl
                            bg-white/10
                            border
                            border-white/10
                            text-white
                            outline-none
                            focus:border-cyan-400/50
                        "
                    />
                </div>

                <div className="flex items-center gap-3">
                    <CreditCard
                        size={20}
                        className="text-yellow-400 flex-shrink-0"
                    />

                    <input
                        type="number"
                        min="0"
                        value={card}
                        onChange={(e) => setCard(e.target.value)}
                        placeholder="Card Amount"
                        className="
                        no-spinner
                            w-full
                            p-3
                            rounded-xl
                            bg-white/10
                            border
                            border-white/10
                            text-white
                            outline-none
                            focus:border-yellow-400/50
                        "
                    />
                </div>
            </div>

            <div className="border-t border-white/10 mt-6 pt-6 space-y-3">
                <div className="flex justify-between">
                    <span className="text-gray-300">Amount Payable</span>

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
                        ₹{changeReturn.toFixed(2)}
                    </span>
                </div>
            </div>
            <div className="border-t border-white/10 mt-6 pt-6">
                <div className="flex gap-4">
                    <button
                        onClick={onCompleteSale}
                        disabled={balance > 0}
                        className="
                flex-1
                bg-green-500
                hover:bg-green-600
                disabled:bg-gray-600
                disabled:cursor-not-allowed
                text-white
                py-4
                rounded-xl
                flex
                items-center
                justify-center
                gap-2
                font-semibold
            "
                    >
                        <CheckCircle size={18} />
                        Complete Sale
                    </button>

                    <button
                        onClick={onCompleteAndPrint}
                        disabled={balance > 0}
                        className="
                flex-1
                bg-cyan-500
                hover:bg-cyan-600
                disabled:bg-gray-600
                disabled:cursor-not-allowed
                text-white
                py-3
                rounded-xl
                flex
                items-center
                justify-center
                gap-2
                font-semibold
            "
                    >
                        <Printer size={18} />
                        Complete & Print
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PaymentSection;
