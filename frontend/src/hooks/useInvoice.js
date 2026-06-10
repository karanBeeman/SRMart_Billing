import { useEffect, useState } from "react";
import invoiceService from "../services/invoiceService";

export default function useInvoice(user) {
    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const createDraftInvoice = async () => {
            console.log("user", user);
            try {
                const response = await invoiceService.createDraftInvoice({
                    createdBy: user.username,
                });

                setInvoice(response);
            } catch (error) {
                console.error("Failed to create draft invoice", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            createDraftInvoice();
        }
    }, [user]);

    return {
        invoice,
        loading,
    };
}
