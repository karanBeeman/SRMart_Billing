import { useEffect, useRef, useState } from "react";

import { useAuth } from "../auth/hooks/useAuth.js";

import DashboardContainer from "../components/DashboardContainer.jsx";
import ProductScanner from "../components/sales/ProductScanner.jsx";
import ProductTable from "../components/sales/ProductTable.jsx";
import CustomerSection from "../components/customers/CustomerSection.jsx";
import InvoiceSummary from "../components/sales/InvoiceSummary.jsx";
import SalesHeader from "../components/sales/SalesHeader.jsx";
import PaymentSection from "../components/sales/PaymentSection.jsx";

import useProductTableNavigation from "../hooks/useProductTableNavigation.js";
import useSalesProducts from "../hooks/useSalesProducts.js";
import useInvoiceSummary from "../hooks/useInvoiceSummary.js";
import useInvoice from "../hooks/useInvoice.js";
import usePaymentSummary from "../hooks/usePaymentSummary.js";
import ResumeBillModal from "../components/sales/ResumeBillModal";
import { EMPTY_CUSTOMER } from "../constants/salesConstants";
import InvoiceInfoCard from "../components/sales/InvoiceInfoCard.jsx";
import useHeldBills from "../hooks/useHeldBills.js";

function SalesPage() {
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

    const [customer, setCustomer] = useState(EMPTY_CUSTOMER);

    const { subtotal, gst, total, earnedPoints } = useInvoiceSummary(products);

    const {
        heldBills,
        showResumeModal,
        setShowResumeModal,
        handleHoldBill,
        handleResumeBill,
    } = useHeldBills({
        invoice,
        user,
        products,
        clearProducts,
        createDraftInvoice,
        inputRef,
        setCustomer,
        emptyCustomer: EMPTY_CUSTOMER,
    });

    const openResumeModal = () => setShowResumeModal(true);

    const closeResumeModal = () => setShowResumeModal(false);

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
                <InvoiceInfoCard invoice={invoice} user={user} />
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
                    onResumeBill={openResumeModal}
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
            <ResumeBillModal
                open={showResumeModal}
                onClose={closeResumeModal}
                bills={heldBills}
                onResume={handleResumeBill}
            />
        </DashboardContainer>
    );
}

export default SalesPage;
