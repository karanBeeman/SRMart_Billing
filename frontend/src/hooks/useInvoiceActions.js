import invoiceService from "../services/invoiceService";

export default function useInvoiceActions() {
    const holdBill = async (invoiceNumber, user) => {
        try {
            await invoiceService.holdInvoice(invoiceNumber, {
                updatedBy: user.username,
            });

            return {
                success: true,
                message: "Bill placed on hold",
            };
        } catch (error) {
            console.error(error);

            return {
                success: false,
                message: "Failed to hold bill",
            };
        }
    };

    return {
        holdBill,
    };
}
