import { User, Phone } from "lucide-react";

function CustomerForm({ customer, setCustomer }) {
    return (
        <div
            className="
                grid
                md:grid-cols-2
                gap-4
            "
        >
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

            <div className="md:col-span-2">
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
                        py-4
                        px-4
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
    );
}

export default CustomerForm;
