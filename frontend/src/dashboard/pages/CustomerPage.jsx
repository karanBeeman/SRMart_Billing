import { useState } from "react";

import DashboardContainer from "../components/DashboardContainer";

import { Search, User, Phone, Save, Pencil } from "lucide-react";

function CustomerPage() {
    const [customer, setCustomer] = useState({
        id: null,
        name: "",
        phone: "",
        availablePoints: 0,
    });

    const [customers, setCustomers] = useState([
        {
            id: 1,
            name: "Karan",
            phone: "9876543210",
            availablePoints: 120,
        },

        {
            id: 2,
            name: "Arun",
            phone: "",
            availablePoints: 55,
        },
    ]);

    const saveCustomer = () => {
        if (!customer.name) {
            alert("Customer name required");

            return;
        }

        if (customer.id) {
            setCustomers(
                customers.map((c) => (c.id === customer.id ? customer : c))
            );
        } else {
            setCustomers([
                ...customers,

                {
                    ...customer,
                    id: Date.now(),
                },
            ]);
        }

        setCustomer({
            id: null,
            name: "",
            phone: "",
            availablePoints: 0,
        });
    };

    const editCustomer = (selected) => {
        setCustomer(selected);
    };

    return (
        <DashboardContainer>
            <div className="mb-8">
                <h1
                    className="
                        text-white
                        text-4xl
                        font-bold
                    "
                >
                    Customers
                </h1>

                <p className="text-gray-200">Manage customer information</p>
            </div>

            {/* Customer Form */}

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
                <div
                    className="
                        flex
                        flex-col
                        md:flex-row
                        md:justify-between
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

                    <button
                        onClick={saveCustomer}
                        className="
                            bg-green-500
                            hover:bg-green-600
                            px-4
                            py-2
                            rounded-xl
                            flex
                            items-center
                            gap-2
                            text-white
                            self-start
                        "
                    >
                        <Save size={16} />
                        Save
                    </button>
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
                            left-4
                            top-4
                            text-white
                        "
                    />

                    <input
                        placeholder="
                            Search customer
                        "
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
                        "
                    />
                </div>

                {/* Inputs */}

                <div
                    className="
                        grid
                        md:grid-cols-2
                        gap-4
                    "
                >
                    <div
                        className="
                            relative
                        "
                    >
                        <User
                            className="
                                absolute
                                left-4
                                top-4
                                text-white
                            "
                        />

                        <input
                            value={customer.name}
                            onChange={(e) =>
                                setCustomer({
                                    ...customer,

                                    name: e.target.value,
                                })
                            }
                            placeholder="
                                Customer Name
                            "
                            className="
                                w-full
                                pl-12
                                py-4
                                rounded-xl
                                bg-white/10
                                border
                                border-white/20
                                text-white
                            "
                        />
                    </div>

                    <div
                        className="
                            relative
                        "
                    >
                        <Phone
                            className="
                                absolute
                                left-4
                                top-4
                                text-white
                            "
                        />

                        <input
                            value={customer.phone}
                            onChange={(e) =>
                                setCustomer({
                                    ...customer,

                                    phone: e.target.value,
                                })
                            }
                            placeholder="
                                Mobile optional
                            "
                            className="
                                w-full
                                pl-12
                                py-4
                                rounded-xl
                                bg-white/10
                                border
                                border-white/20
                                text-white
                            "
                        />
                    </div>
                </div>
            </div>

            {/* Customer Table */}

            <div
                className="
                    bg-white/10
                    backdrop-blur-lg
                    border
                    border-white/20
                    rounded-2xl
                    p-6
                "
            >
                <h2
                    className="
                        text-white
                        text-xl
                        font-semibold
                        mb-5
                    "
                >
                    Customer List
                </h2>

                <table
                    className="
                        w-full
                    "
                >
                    <thead>
                        <tr
                            className="
                            text-gray-300
                            border-b
                            border-white/10
                        "
                        >
                            <th>Name</th>

                            <th>Phone</th>

                            <th>Loyalty</th>

                            <th>Edit</th>
                        </tr>
                    </thead>

                    <tbody>
                        {customers.map((customer) => (
                            <tr
                                key={customer.id}
                                className="
                                    border-b
                                    border-white/10
                                "
                            >
                                <td
                                    className="
                                        py-5
                                        text-white
                                    "
                                >
                                    {customer.name}
                                </td>

                                <td
                                    className="
                                        text-white
                                    "
                                >
                                    {customer.phone || "Walk-in Customer"}
                                </td>

                                <td
                                    className="
                                        text-white
                                    "
                                >
                                    {customer.availablePoints}
                                </td>

                                <td>
                                    <button
                                        onClick={() => editCustomer(customer)}
                                    >
                                        <Pencil
                                            size={18}
                                            className="
                                                text-yellow-300
                                            "
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardContainer>
    );
}

export default CustomerPage;
