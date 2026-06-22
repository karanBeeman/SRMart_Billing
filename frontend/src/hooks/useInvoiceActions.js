import invoiceService from "../services/invoiceService";
import { toast } from "react-toastify";

export default function useInvoiceActions() {
    const holdBill = async (invoiceNumber, user) => {
        try {
            await invoiceService.holdInvoice(invoiceNumber, {
                updatedBy: user.username,
            });

            toast.success("Bill put on hold");
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Failed to hold bill"
            );

            throw error;
        }
    };

    return {
        holdBill,
    };
}
