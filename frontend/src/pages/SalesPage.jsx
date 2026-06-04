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

function SalesPage() {
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

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

    const {
        searchValue,
        products,
        suggestions,
        setProducts,
        handleProductSearch,
        handleProductLookup,
        addProductToBill,
    } = useSalesProducts(inputRef);

    const { subtotal, gst, total, earnedPoints } = useInvoiceSummary(products);

    return (
        <DashboardContainer>
            <SalesHeader
                user={user}
                invoiceNumber={invoiceNumber}
                invoiceDate={invoiceDate}
            />

            <ProductScanner
                searchValue={searchValue}
                onSearch={handleProductSearch}
                onLookup={handleProductLookup}
                suggestions={suggestions}
                onSelectProduct={addProductToBill}
                inputRef={inputRef}
            />

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
