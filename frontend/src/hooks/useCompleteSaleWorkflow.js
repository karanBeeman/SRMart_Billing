// hooks/useCompleteSaleWorkflow.js

import { toast } from "react-toastify";
import useInvoiceCompletion from "./useInvoiceCompletion";
import { printReceipt } from "../utils/receiptPrinter";

export default function useCompleteSaleWorkflow({
    invoice,
    user,
    payment,
    products,
    clearProducts,
    setCustomer,
    emptyCustomer,
    createDraftInvoice,
    inputRef,
    setReceipt,
    setShowReceipt,
}) {
    const { completeSale, completing } = useInvoiceCompletion();

    const handleCompleteSale = async () => {
        if (!validate()) {
            return;
        }

        try {
            const completedInvoice = await completeInvoice();

            await cleanup();

            return completedInvoice;
        } catch (error) {
            console.error(error);
        }
    };

    const handleCompleteAndPrint = async () => {
        if (!validate()) return;
        try {
            const completedInvoice = await completeInvoice();

            try {
                setReceipt(completedInvoice);
                setShowReceipt(true);
            } catch (error) {
                toast.warning("Sale completed. Printing failed.");
                console.error(error);
            }

            //  await cleanup();
        } catch (error) {
            console.error(error);
        }
    };

    const buildPayload = () => ({
        discount: payment.discount,
        pointsUsed: payment.pointsUsed,
        cash: payment.cash,
        upi: payment.upi,
        card: payment.card,
        updatedBy: user?.username,
    });

    const completeInvoice = () =>
        completeSale(invoice.invoiceNumber, buildPayload());

    const validate = () => {
        if (!invoice?.invoiceNumber) {
            toast.error("Invoice not found");
            return false;
        }

        if (products.length === 0) {
            toast.warning("Add at least one product");
            return false;
        }

        if (payment.balance > 0) {
            toast.warning("Payment is incomplete");
            return false;
        }

        return true;
    };

    const cleanup = async () => {
        clearProducts();
        payment.resetPayment();
        setCustomer(emptyCustomer);

        await createDraftInvoice();

        inputRef.current?.focus();
    };

    return {
        completing,
        handleCompleteSale,
        handleCompleteAndPrint,
    };
}
