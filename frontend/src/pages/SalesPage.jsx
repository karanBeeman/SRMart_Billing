import { useEffect, useRef, useState } from "react";

import { useAuth } from "../auth/hooks/useAuth.js";

import DashboardContainer from "../components/DashboardContainer.jsx";
import ProductScanner from "../components/sales/ProductScanner.jsx";
import ProductTable from "../components/sales/ProductTable.jsx";
import CustomerSection from "../components/customers/CustomerSection.jsx";
import InvoiceSummary from "../components/sales/InvoiceSummary.jsx";
import SalesHeader from "../components/sales/SalesHeader.jsx";

import useSalesProducts from "../hooks/useSalesProducts.js";
import useInvoiceSummary from "../hooks/useInvoiceSummary.js";
import useInvoice from "../hooks/useInvoice.js";

function SalesPage() {
    const inputRef = useRef(null);

    const { user } = useAuth();

    const { invoice, loading } = useInvoice(user);

    useEffect(() => {
        if (!loading && inputRef.current) {
            inputRef.current.focus();
        }
    }, [loading]);

    const [customer, setCustomer] = useState({
        id: null,
        name: "",
        phone: "",
        address: "",
        availablePoints: 0,
    });

    const {
        searchValue,
        products,
        suggestions,

        activeIndex,
        setActiveIndex,

        handleProductSearch,
        handleProductLookup,
        addProductToBill,

        updateQty,
        updateSellingPrice,
        removeProduct,
        clearSuggestions,
    } = useSalesProducts(inputRef);

    const { subtotal, gst, total, earnedPoints } = useInvoiceSummary(products);

    if (loading) {
        return (
            <DashboardContainer>
                <div className="text-center text-white">Loading invoice...</div>
            </DashboardContainer>
        );
    }

    return (
        <DashboardContainer>
            <SalesHeader
                user={user}
                invoiceNumber={invoice?.invoiceNumber}
                invoiceDate={
                    invoice?.createdAt
                        ? new Date(invoice.createdAt).toLocaleString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                          })
                        : ""
                }
                status={invoice?.status}
            />

            <ProductScanner
                searchValue={searchValue}
                onSearch={handleProductSearch}
                onLookup={handleProductLookup}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                suggestions={suggestions}
                onSelectProduct={addProductToBill}
                inputRef={inputRef}
                clearSuggestions={clearSuggestions}
            />

            <ProductTable
                products={products}
                updateQty={updateQty}
                updateSellingPrice={updateSellingPrice}
                removeProduct={removeProduct}
            />

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
