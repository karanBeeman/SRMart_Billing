import { useState } from "react";
import { toast } from "react-toastify";

import invoiceService from "../services/invoiceService";
import useInvoiceActions from "./useInvoiceActions";

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
    const [heldBills, setHeldBills] = useState([]);

    const handleHoldBill = async () => {
        if (products.length === 0) {
            toast.warning(
                "Add at least one product before putting bill on hold"
            );
            return;
        }

        if (!invoice?.invoiceNumber) {
            return;
        }

        try {
            await holdBill(invoice.invoiceNumber, user);

            toast.success("Bill put on hold successfully");

            clearProducts();
            setCustomer(emptyCustomer);

            await createDraftInvoice();

            inputRef.current?.focus();
        } catch (error) {
            console.error(error);
            toast.error("Failed to put bill on hold");
        }
    };

    const openResumeModal = async () => {
        try {
            const bills = await invoiceService.getHeldInvoices(user.username);

            setHeldBills(bills);
            setShowResumeModal(true);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load held bills");
        }
    };

    const closeResumeModal = () => {
        setShowResumeModal(false);
    };

    const handleResumeBill = async (bill) => {
        try {
            const response = await invoiceService.resumeInvoice(
                bill.invoiceNumber
            );

            console.log("Resume response:", response);

            setShowResumeModal(false);

            return response;
        } catch (error) {
            console.error(error);
            toast.error("Failed to resume bill");
        }
    };

    return {
        heldBills,
        showResumeModal,
        openResumeModal,
        closeResumeModal,
        handleHoldBill,
        handleResumeBill,
    };
}
