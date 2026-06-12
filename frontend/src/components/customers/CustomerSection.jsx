import { Pencil, Save } from "lucide-react";

import CustomerSearch from "./CustomerSearch.jsx";
import CustomerForm from "./CustomerForm.jsx";
import LoyaltyCard from "./LoyaltyCard.jsx";

function CustomerSection({ customer, setCustomer, earnedPoints }) {
    const handleSearch = (e) => {
        console.log("Search customer:", e.target.value);
    };

    const saveCustomer = () => {
        console.log("Saving customer");
    };

    const editCustomer = () => {
        console.log("Edit customer");
    };

    return (
        <div
            className="


                border
                bg-slate-900/40
border-blue-500/20
backdrop-blur-xl
                rounded-2xl
                p-6

            "
        >
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

            <CustomerSearch onSearch={handleSearch} />

            <CustomerForm customer={customer} setCustomer={setCustomer} />

            <LoyaltyCard
                availablePoints={customer.availablePoints}
                earnedPoints={earnedPoints}
            />
        </div>
    );
}

export default CustomerSection;
