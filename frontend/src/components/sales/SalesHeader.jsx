function SalesHeader({ user, invoiceNumber, invoiceDate }) {
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
                <div>
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
                        min-w-[280px]
                        rounded-xl
                        border
                        border-white/20
                        bg-white/10
                        px-6
                        py-4
                        backdrop-blur-md
                    "
                >
                    <div
                        className="
                            mb-2
                            flex
                            justify-between
                        "
                    >
                        <span
                            className="
                                text-sm
                                text-gray-300
                            "
                        >
                            Cashier
                        </span>

                        <span
                            className="
                                text-sm
                                text-white
                            "
                        >
                            {user?.username}
                        </span>
                    </div>

                    <div
                        className="
                            mb-2
                            flex
                            justify-between
                        "
                    >
                        <span
                            className="
                                text-sm
                                text-gray-300
                            "
                        >
                            Bill No
                        </span>

                        <span
                            className="
                                font-semibold
                                text-white
                            "
                        >
                            {invoiceNumber}
                        </span>
                    </div>

                    <div
                        className="
                            flex
                            justify-between
                        "
                    >
                        <span
                            className="
                                text-sm
                                text-gray-300
                            "
                        >
                            Date
                        </span>

                        <span
                            className="
                                text-sm
                                text-white
                            "
                        >
                            {invoiceDate}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SalesHeader;
