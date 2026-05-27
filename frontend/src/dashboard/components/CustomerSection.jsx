import { Search, User, Phone, Gift, Pencil, Save } from "lucide-react";

function CustomerSection({ customer, setCustomer, earnedPoints }) {
    const handleSearch = (e) => {
        console.log("Search customer:", e.target.value);

        /*
        Future API:

        GET /customers/search?q=value
        */
    };

    const saveCustomer = () => {
        console.log("Saving customer");

        /*
        Future API:

        POST /customers
        */
    };

    const editCustomer = () => {
        console.log("Edit customer");
    };

    return (
        <div
            className="
                bg-white/10
                backdrop-blur-lg
                border
                border-white/20
                rounded-2xl
                p-6
                mt-6
            "
        >
            {/* Header */}

            <div
                className="
                    flex
                    flex-col
                    md:flex-row
                    md:justify-between
                    md:items-center
                    gap-4
                    mb-6
                "
            >
                <h2
                    className="
                        text-white
                        text-xl
                        font-semibold
                    "
                >
                    Customer Details
                </h2>

                <div className="flex gap-3">
                    <button
                        onClick={editCustomer}
                        className="
                            bg-yellow-500
                            hover:bg-yellow-600
                            transition
                            px-4
                            py-2
                            rounded-xl
                            flex
                            items-center
                            gap-2
                            text-white
                        "
                    >
                        <Pencil size={16} />
                        Edit
                    </button>

                    <button
                        onClick={saveCustomer}
                        className="
                            bg-green-500
                            hover:bg-green-600
                            transition
                            px-4
                            py-2
                            rounded-xl
                            flex
                            items-center
                            gap-2
                            text-white
                        "
                    >
                        <Save size={16} />
                        Save Customer
                    </button>
                </div>
            </div>

            {/* Search */}

            <div
                className="
                    relative
                    mb-6
                "
            >
                <Search
                    className="
                        absolute
                        top-4
                        left-4
                        text-white
                    "
                />

                <input
                    placeholder="Search customer by name or phone"
                    onChange={handleSearch}
                    className="
                        w-full
                        pl-12
                        py-4
                        rounded-xl
                        bg-white/10
                        border
                        border-white/20
                        text-white
                        placeholder:text-gray-300
                        outline-none
                    "
                />
            </div>

            {/* Customer fields */}

            <div
                className="
        grid
        md:grid-cols-2 gap-4 "
            >
                {/* Customer Name */}

                <div className="relative">
                    <User
                        className="
                absolute
                top-4
                left-4
                text-white
            "
                    />

                    <input
                        value={customer.name || ""}
                        onChange={(e) =>
                            setCustomer({
                                ...customer,

                                name: e.target.value,
                            })
                        }
                        placeholder="Customer Name"
                        className="
                w-full
                pl-12
                py-4
                rounded-xl
                bg-white/10
                border
                border-white/20
                text-white
                placeholder:text-gray-300
                outline-none
            "
                    />
                </div>

                {/* Mobile */}

                <div className="relative">
                    <Phone
                        className="
                absolute
                top-4
                left-4
                text-white
            "
                    />

                    <input
                        value={customer.phone || ""}
                        onChange={(e) =>
                            setCustomer({
                                ...customer,

                                phone: e.target.value,
                            })
                        }
                        placeholder="Mobile (optional)"
                        className="
                w-full
                pl-12
                py-4
                rounded-xl
                bg-white/10
                border
                border-white/20
                text-white
                placeholder:text-gray-300
                outline-none
            "
                    />
                </div>

                {/* Address */}

                <div
                    className="
            md:col-span-2
        "
                >
                    <textarea
                        rows={1}
                        value={customer.address || ""}
                        onChange={(e) =>
                            setCustomer({
                                ...customer,

                                address: e.target.value,
                            })
                        }
                        placeholder="Customer Address (optional)"
                        className="
                w-full
                pl-12
                py-4
                rounded-xl
                bg-white/10
                border
                border-white/20
                text-white
                placeholder:text-gray-300
                outline-none
            "
                    />
                </div>
            </div>

            {/* Loyalty display only */}

            <div
                className="
        mt-6
        bg-white/5
        rounded-xl
        p-5
    "
            >
                <div
                    className="
            flex
            justify-between
            items-center
        "
                >
                    {/* Left side */}

                    <div
                        className="
                flex
                items-center
                gap-3
            "
                    >
                        <Gift
                            size={24}
                            className="
                    text-yellow-300
                "
                        />

                        <div>
                            <p
                                className="
                        text-gray-300
                        text-sm
                    "
                            >
                                Available Loyalty
                            </p>

                            <p
                                className="
                        text-white
                        font-bold
                    "
                            >
                                {customer.availablePoints || 0} points
                            </p>
                        </div>
                    </div>

                    {/* Right side */}

                    <div className="text-right">
                        <p
                            className="
                    text-gray-300
                    text-sm
                "
                        >
                            Earned From Bill
                        </p>

                        <p
                            className="
                    text-green-300
                    font-bold
                "
                        >
                            +{earnedPoints}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerSection;
