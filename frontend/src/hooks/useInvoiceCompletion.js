import { useState } from "react";
import { toast } from "react-toastify";
import invoiceService from "../services/invoiceService";

export default function useInvoiceCompletion() {
    const [completing, setCompleting] = useState(false);

    const completeSale = async (invoiceNumber, payload) => {
        try {
            setCompleting(true);

            const response = await invoiceService.completeInvoice(
                invoiceNumber,
                payload
            );

            toast.success("Sale completed successfully");

            return response.data;
        } catch (error) {
            toast.error("Failed to complete sale");
            throw error;
        } finally {
            setCompleting(false);
        }
    };

    return {
        completeSale,
        completing,
    };
}
