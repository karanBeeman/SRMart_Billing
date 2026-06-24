import { toast } from "react-toastify";
import useInvoiceActions from "./useInvoiceActions.js";
import { useState } from "react";

export default function useHeldBills({
    invoice,
    user,
    products,
    clearProducts,
    createDraftInvoice,
    inputRef,
    setCustomer,
    emptyCustomer,
}) {
    const { holdBill } = useInvoiceActions();

    const [showResumeModal, setShowResumeModal] = useState(false);

    const [heldBills] = useState([
        {
            invoiceNumber: "INV000012",
            totalAmount: 450,
            itemCount: 7,
            previewItems: ["Bread", "Milk", "Rice"],
            heldAt: "10:22 PM",
        },
        {
            invoiceNumber: "INV000013",
            totalAmount: 180,
            itemCount: 3,
            previewItems: ["Coke", "Chips", "Biscuits"],
            heldAt: "10:30 PM",
        },
    ]);

    const handleHoldBill = async () => {
        if (products.length === 0) {
            toast.warning(
                "Add at least one product before putting bill on hold"
            );
            return;
        }
        try {
            if (!invoice?.invoiceNumber) {
                return;
            }

            await holdBill(invoice.invoiceNumber, user);
            toast.success("Bill put on hold successfully");

            clearProducts();

            setCustomer(emptyCustomer);

            await createDraftInvoice();

            inputRef.current?.focus();
        } catch (error) {
            toast.error("Failed to put bill on hold", error);
        }
    };

    const handleResumeBill = (bill) => {
        console.log("Resume Bill", bill);

        setShowResumeModal(false);
    };

    return {
        heldBills,
        showResumeModal,
        setShowResumeModal,
        handleHoldBill,
        handleResumeBill,
    };
}
