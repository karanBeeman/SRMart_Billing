// hooks/useCompleteSaleWorkflow.js

import { toast } from "react-toastify";
import useInvoiceCompletion from "./useInvoiceCompletion";

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
}) {
    const { completeSale, completing } = useInvoiceCompletion();

    const handleCompleteSale = async () => {
        if (!invoice?.invoiceNumber) {
            toast.error("Invoice not found");
            return;
        }

        if (products.length === 0) {
            toast.warning("Add at least one product");
            return;
        }

        try {
            const payload = {
                discount: payment.discount,
                pointsUsed: payment.pointsUsed,
                cash: payment.cash,
                upi: payment.upi,
                card: payment.card,
                updatedBy: user?.username,
            };

            const completedInvoice = await completeSale(
                invoice.invoiceNumber,
                payload
            );

            clearProducts();
            payment.resetPayment();
            setCustomer(emptyCustomer);

            await createDraftInvoice();

            inputRef.current?.focus();

            return completedInvoice;
        } catch (error) {
            console.error(error);
        }
    };

    const handleCompleteAndPrint = async () => {
        const completedInvoice = await handleCompleteSale();

        if (!completedInvoice) {
            return;
        }

        // TODO: print receipt
    };

    return {
        completing,
        handleCompleteSale,
        handleCompleteAndPrint,
    };
}
