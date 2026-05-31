import { useState } from "react";

import { useAuth } from "../../auth/hooks/useAuth";

import productService from "../../services/productService";

import DashboardContainer from "../components/DashboardContainer";
import ProductScanner from "../components/ProductScanner";
import ProductTable from "../components/ProductTable";
import CustomerSection from "../components/CustomerSection";
import InvoiceSummary from "../components/InvoiceSummary";

function SalesPage() {
    const { user } = useAuth();

    const [invoiceNumber] = useState(`INV-${Date.now()}`);

    const invoiceDate = new Date().toLocaleString();

    const [customer, setCustomer] = useState({
        id: null,

        name: "",

        phone: "",

        address: "",

        availablePoints: 0,
    });

    const [searchValue, setSearchValue] = useState("");

    const [products, setProducts] = useState([]);

    const subtotal = products.reduce(
        (sum, product) => sum + (product.total || 0),

        0
    );

    const gst = subtotal * 0.05;

    const total = subtotal + gst;

    const earnedPoints = total >= 200 ? Math.floor(total / 100) : 0;

    const handleProductSearch = async () => {
        if (!searchValue.trim()) {
            return;
        }

        try {
            const product = await productService.search(searchValue);

            setProducts((previous) => {
                const existingProduct = previous.find(
                    (item) => item.id === product.id
                );

                if (existingProduct) {
                    return previous.map((item) =>
                        item.id === product.id
                            ? {
                                  ...item,

                                  qty: item.qty + 1,

                                  total: (item.qty + 1) * item.sellingPrice,
                              }
                            : item
                    );
                }

                return [
                    ...previous,

                    {
                        ...product,

                        qty: 1,

                        total: product.sellingPrice,
                    },
                ];
            });

            setSearchValue("");
        } catch (error) {
            console.error(
                "Product search failed",

                error
            );
        }
    };

    return (
        <DashboardContainer>
            {/* Header */}

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

                    {/* Invoice Card */}

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

            {/* Product Search */}

            <ProductScanner
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onSearch={handleProductSearch}
            />

            {/* Products */}

            <ProductTable products={products} setProducts={setProducts} />

            {/* Invoice Summary */}

            <InvoiceSummary subtotal={subtotal} gst={gst} total={total} />

            {/* Customer Details */}

            <CustomerSection
                customer={customer}
                setCustomer={setCustomer}
                earnedPoints={earnedPoints}
            />
        </DashboardContainer>
    );
}

export default SalesPage;
