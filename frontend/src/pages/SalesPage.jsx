import { useEffect, useRef, useState } from "react";

import { useAuth } from "../auth/hooks/useAuth.js";

import DashboardContainer from "../components/DashboardContainer.jsx";
import ProductScanner from "../components/sales/ProductScanner.jsx";
import ProductTable from "../components/sales/ProductTable.jsx";
import CustomerSection from "../components/customers/CustomerSection.jsx";
import InvoiceSummary from "../components/sales/InvoiceSummary.jsx";
import SalesHeader from "../components/sales/SalesHeader.jsx";
import PaymentSection from "../components/sales/PaymentSection.jsx";

import useInvoiceActions from "../hooks/useInvoiceActions";
import useProductTableNavigation from "../hooks/useProductTableNavigation.js";
import useSalesProducts from "../hooks/useSalesProducts.js";
import useInvoiceSummary from "../hooks/useInvoiceSummary.js";
import useInvoice from "../hooks/useInvoice.js";

function SalesPage() {
    const EMPTY_CUSTOMER = {
        id: null,
        name: "",
        phone: "",
        address: "",
        availablePoints: 0,
    };

    const inputRef = useRef(null);

    const {
        searchValue,
        products,
        suggestions,

        activeIndex,
        setActiveIndex,

        handleProductSearch,
        handleProductLookup,
        selectSuggestedProduct,

        updateQty,
        updateSellingPrice,
        removeProduct,
        clearSuggestions,
    } = useSalesProducts(inputRef);

    const { selectedRow, setSelectedRow, qtyRefs, priceRefs } =
        useProductTableNavigation(products, removeProduct);

    const { user } = useAuth();

    const { invoice, loading } = useInvoice(user);

    const { holdBill } = useInvoiceActions();

    const [customer, setCustomer] = useState(EMPTY_CUSTOMER);

    const { subtotal, gst, total, earnedPoints } = useInvoiceSummary(products);

    // Discount
    const [discount, setDiscount] = useState("");

    const [pointsUsed, setPointsUsed] = useState("");

    // Payments
    const [cash, setCash] = useState("");
    const [upi, setUpi] = useState("");
    const [card, setCard] = useState("");

    const loyaltyPoints = Number(pointsUsed || 0);

    const finalTotal = Math.max(
        total - Number(discount || 0) - loyaltyPoints,
        0
    );

    const paidAmount = Number(cash || 0) + Number(upi || 0) + Number(card || 0);

    const balance = Math.max(finalTotal - paidAmount, 0);

    const changeReturn = Math.max(paidAmount - finalTotal, 0);

    useEffect(() => {
        if (!loading && inputRef.current) {
            inputRef.current.focus();
        }
    }, [loading]);

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
                onSelectProduct={selectSuggestedProduct}
                inputRef={inputRef}
                clearSuggestions={clearSuggestions}
            />

            <ProductTable
                products={products}
                updateQty={updateQty}
                updateSellingPrice={updateSellingPrice}
                removeProduct={removeProduct}
                selectedRow={selectedRow}
                setSelectedRow={setSelectedRow}
                qtyRefs={qtyRefs}
                priceRefs={priceRefs}
            />

            <div className="grid grid-cols-2 gap-6">
                <InvoiceSummary
                    subtotal={subtotal}
                    gst={gst}
                    originalTotal={total}
                    discount={discount}
                    setDiscount={setDiscount}
                    pointsUsed={pointsUsed}
                    setPointsUsed={setPointsUsed}
                    total={finalTotal}
                    paidAmount={paidAmount}
                    changeReturn={changeReturn}
                    onHoldBill={() => holdBill(invoice?.invoiceNumber, user)}
                />

                <PaymentSection
                    total={finalTotal}
                    cash={cash}
                    setCash={setCash}
                    upi={upi}
                    setUpi={setUpi}
                    card={card}
                    setCard={setCard}
                    paidAmount={paidAmount}
                    balance={balance}
                    changeReturn={changeReturn}
                />
            </div>

            <CustomerSection
                customer={customer}
                setCustomer={setCustomer}
                earnedPoints={earnedPoints}
            />
        </DashboardContainer>
    );
}

export default SalesPage;
