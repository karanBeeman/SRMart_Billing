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
import usePaymentSummary from "../hooks/usePaymentSummary.js";

function SalesPage() {
    const EMPTY_CUSTOMER = {
        id: null,
        name: "",
        phone: "",
        address: "",
        availablePoints: 0,
    };

    const inputRef = useRef(null);

    const { user } = useAuth();

    const { invoice, loading, createDraftInvoice } = useInvoice(user);

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
        clearProducts,
    } = useSalesProducts(inputRef, invoice?.invoiceNumber);

    const { selectedRow, setSelectedRow, qtyRefs, priceRefs } =
        useProductTableNavigation(products, removeProduct);

    const { holdBill } = useInvoiceActions();

    const [customer, setCustomer] = useState(EMPTY_CUSTOMER);

    const { subtotal, gst, total, earnedPoints } = useInvoiceSummary(products);

    const {
        discount,
        setDiscount,

        pointsUsed,
        setPointsUsed,

        cash,
        setCash,

        upi,
        setUpi,

        card,
        setCard,

        finalTotal,
        paidAmount,
        balance,
        changeReturn,
    } = usePaymentSummary(total);

    const getStatusStyle = (status) => {
        switch (status) {
            case "DRAFT":
                return "bg-yellow-500/20 text-yellow-300";

            case "HELD":
                return "bg-orange-500/20 text-orange-300";

            case "COMPLETED":
                return "bg-green-500/20 text-green-300";

            case "CANCELLED":
                return "bg-red-500/20 text-red-300";

            default:
                return "bg-gray-500/20 text-gray-300";
        }
    };

    const handleHoldBill = async () => {
        try {
            await holdBill(invoice.invoiceNumber, user);

            clearProducts();

            setCustomer(EMPTY_CUSTOMER);

            await createDraftInvoice();

            inputRef.current?.focus();
        } catch (error) {
            console.error(error);
        }
    };

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
            <div className="grid grid-cols-[1fr_320px] gap-6 mb-6">
                {/* Left Side */}
                <div>
                    <SalesHeader />

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
                </div>

                {/* Right Side */}
                <div
                    className="
            rounded-xl
            border
            bg-slate-900/40
            border-blue-500/20
            backdrop-blur-xl
            p-6
            h-fit
        "
                >
                    <div className="grid grid-cols-[90px_1fr] gap-y-3">
                        <span className="text-sm text-gray-300">Cashier</span>

                        <span className="text-sm text-white">
                            {user?.username}
                        </span>

                        <span className="text-sm text-gray-300">Bill No</span>

                        <span className="text-lg font-bold text-white">
                            {invoice?.invoiceNumber}
                        </span>

                        <span className="text-sm text-gray-300">Status</span>

                        <span
                            className={`
        w-fit
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${getStatusStyle(invoice?.status)}
    `}
                        >
                            {invoice?.status}
                        </span>

                        <span className="text-sm text-gray-300">Date</span>

                        <span className="text-sm text-white">
                            {invoice?.createdAt
                                ? new Date(invoice.createdAt).toLocaleString(
                                      "en-IN"
                                  )
                                : ""}
                        </span>
                    </div>
                </div>
            </div>

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
                    onHoldBill={handleHoldBill}
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
