import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import invoiceManagementService from "../services/invoiceManagementService";

export default function useInvoiceManagement() {
    const [invoiceNumber, setInvoiceNumber] = useState("");

    const [fromDate, setFromDate] = useState("");

    const [toDate, setToDate] = useState("");

    const [invoices, setInvoices] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadTodayInvoices();
    }, []);

    const loadTodayInvoices = async () => {
        try {
            setLoading(true);

            const response = await invoiceManagementService.getTodayInvoices();

            setInvoices(response);
        } catch (e) {
            toast.error("Failed to load invoices");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        try {
            setLoading(true);

            if (invoiceNumber.trim()) {
                const invoice =
                    await invoiceManagementService.searchInvoice(invoiceNumber);

                setInvoices(invoice ? [invoice] : []);
            } else if (fromDate && toDate) {
                const response =
                    await invoiceManagementService.searchByDateRange(
                        fromDate,
                        toDate
                    );

                setInvoices(response);
            } else {
                await loadTodayInvoices();
            }
        } catch (e) {
            toast.error("Search failed");
        } finally {
            setLoading(false);
        }
    };

    return {
        invoiceNumber,
        setInvoiceNumber,

        fromDate,
        setFromDate,

        toDate,
        setToDate,

        invoices,

        loading,

        handleSearch,
    };
}
