function InvoiceTable() {
    const invoices = [
        {
            id: "#INV001",
            customer: "Arun Traders",
            amount: "₹4,500",
            status: "Paid",
        },
        {
            id: "#INV002",
            customer: "SR Stores",
            amount: "₹2,300",
            status: "Pending",
        },
        {
            id: "#INV003",
            customer: "Kumar Mart",
            amount: "₹7,800",
            status: "Paid",
        },
        {
            id: "#INV004",
            customer: "Fresh Market",
            amount: "₹5,600",
            status: "Pending",
        },
    ];

    return (
        <div
            className="
                mt-8

                bg-white/10
                backdrop-blur-lg

                border
                border-white/20

                rounded-2xl

                p-6
            "
        >
            {/* Header */}

            <div
                className="
                    flex
                    items-center
                    justify-between
                    mb-6
                "
            >
                <h3
                    className="
                        text-white
                        text-xl
                        font-semibold
                    "
                >
                    Recent Invoices
                </h3>

                <button
                    className="
                        bg-white
                        text-[#2347D9]

                        px-4
                        py-2

                        rounded-lg

                        font-medium
                    "
                >
                    View All
                </button>
            </div>

            {/* Table */}

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr
                            className="
                                text-left
                                text-gray-200
                                border-b
                                border-white/10
                            "
                        >
                            <th className="pb-4">Invoice ID</th>

                            <th className="pb-4">Customer</th>

                            <th className="pb-4">Amount</th>

                            <th className="pb-4">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {invoices.map((invoice, index) => (
                            <tr
                                key={index}
                                className="
                                    border-b
                                    border-white/10
                                    hover:bg-white/5
                                    transition-all
                                "
                            >
                                <td
                                    className="
                                        py-5
                                        text-white
                                        font-medium
                                    "
                                >
                                    {invoice.id}
                                </td>

                                <td
                                    className="
                                        py-5
                                        text-white
                                    "
                                >
                                    {invoice.customer}
                                </td>

                                <td
                                    className="
                                        py-5
                                        text-white
                                    "
                                >
                                    {invoice.amount}
                                </td>

                                <td className="py-5">
                                    <span
                                        className={`
                                            px-3
                                            py-1

                                            rounded-full

                                            text-sm
                                            font-medium

                                            ${
                                                invoice.status === "Paid"
                                                    ? "bg-green-500/20 text-green-200"
                                                    : "bg-yellow-500/20 text-yellow-200"
                                            }
                                        `}
                                    >
                                        {invoice.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default InvoiceTable;
