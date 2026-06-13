function SalesHeader({ user, invoiceNumber, invoiceDate, status }) {
    const getStatusStyle = (status) => {
        switch (status) {
            case "DRAFT":
                return "bg-yellow-500/20 text-yellow-300";

            case "HELD":
                return "bg-orange-500/20 text-orange-300";

            case "COMPLETED":
                return "bg-green-500/20 text-green-300";

            case "CANCELLED":
                return "bg-red-500/20 text-red-300";

            default:
                return "bg-gray-500/20 text-gray-300";
        }
    };

    return (
        <div className="mb-8">
            <div
                className="
                    flex
                    justify-between
                    items-start
                    gap-6
                "
            >
                <div className="pt-4">
                    <h1
                        className="
                            text-4xl
                            font-bold
                            text-white
                        "
                    >
                        Sales Entry
                    </h1>

                    <p
                        className="
                            mt-1
                            text-gray-200
                        "
                    >
                        Scan barcode, enter product id or search by name
                    </p>
                </div>

                <div
                    className="
        min-w-[320px]
        rounded-xl
        border

        bg-slate-900/40
border-blue-500/20
backdrop-blur-xl
        px-6
        py-4
        mb-6

    "
                >
                    <div className="grid grid-cols-[90px_1fr] gap-y-3">
                        <span className="text-sm text-gray-300">Cashier</span>

                        <span className="text-sm text-white">
                            {user?.username}
                        </span>

                        <span className="text-sm text-gray-300">Bill No</span>

                        <span className="text-lg font-bold text-white">
                            {invoiceNumber}
                        </span>

                        <span className="text-sm text-gray-300">Status</span>

                        <span
                            className={`
                w-fit
                rounded-full
                bg-yellow-500/20
                px-3
                py-1
                text-xs
                font-semibold
                 ${getStatusStyle(status)}
            `}
                        >
                            {status}
                        </span>

                        <span className="text-sm text-gray-300">Date</span>

                        <span className="text-sm text-white">
                            {invoiceDate}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SalesHeader;
