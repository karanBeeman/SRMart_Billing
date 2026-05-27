import { useState } from "react";

import DashboardContainer from "../components/DashboardContainer";

import ProductScanner from "../components/ProductScanner";
import ProductTable from "../components/ProductTable";
import CustomerSection from "../components/CustomerSection";
import InvoiceSummary from "../components/InvoiceSummary";

function SalesPage() {
    const invoiceNumber = `INV-${Date.now()}`;

    const [customer, setCustomer] = useState({
        id: null,

        name: "",

        phone: "",

        address: "",

        availablePoints: 0,
    });

    const [barcode, setBarcode] = useState("");

    const [products, setProducts] = useState([]);

    const subtotal = products.reduce(
        (sum, p) => sum + p.total,

        0
    );

    const gst = subtotal * 0.05;

    const total = subtotal + gst;

    const earnedPoints = total >= 200 ? Math.floor(total / 100) : 0;

    return (
        <DashboardContainer>
            <div className="mb-8">
                <div
                    className="
                        flex
                        justify-between
                        items-center
                    "
                >
                    <div>
                        <h1
                            className="
                                text-white
                                text-4xl
                                font-bold
                            "
                        >
                            Sales Entry
                        </h1>

                        <p
                            className="
                                text-gray-200
                            "
                        >
                            Scan products and generate invoice
                        </p>
                    </div>

                    {/* Invoice card */}

                    <div
                        className="
                            bg-white/10
                            backdrop-blur-md
                            border
                            border-white/20
                            rounded-xl
                            px-6
                            py-4
                        "
                    >
                        <p
                            className="
                                text-gray-300
                                text-sm
                            "
                        >
                            Bill No :
                        </p>

                        <p
                            className="
                                text-white
                                font-bold
                                text-lg
                            "
                        >
                            {invoiceNumber}
                        </p>
                    </div>
                </div>
            </div>

            <ProductScanner barcode={barcode} setBarcode={setBarcode} />

            <ProductTable products={products} setProducts={setProducts} />

            <InvoiceSummary subtotal={subtotal} gst={gst} total={total} />

            <CustomerSection
                customer={customer}
                setCustomer={setCustomer}
                earnedPoints={earnedPoints}
            />
        </DashboardContainer>
    );
}

export default SalesPage;
