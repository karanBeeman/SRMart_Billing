import { useEffect, useState } from "react";
import invoiceService from "../services/invoiceService";

export default function useInvoice(user) {
    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(true);

    const createDraftInvoice = async () => {
        try {
            const response = await invoiceService.createDraftInvoice({
                createdBy: user.username,
            });

            setInvoice(response);

            return response;
        } catch (error) {
            console.error("Failed to create draft invoice", error);
        }
    };

    useEffect(() => {
        const initialize = async () => {
            if (!user) return;

            try {
                await createDraftInvoice();
            } finally {
                setLoading(false);
            }
        };

        initialize();
    }, [user]);

    return {
        invoice,
        loading,
        createDraftInvoice,
        setInvoice,
    };
}
