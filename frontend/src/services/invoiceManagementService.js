import apiClient from "../api/apiClient.js";

const getTodayInvoices = async () => {
    const response = await apiClient.get("/invoice-management/today");

    return response.data;
};

const searchInvoice = async (invoiceNumber) => {
    const response = await apiClient.get("/invoice-management/search", {
        params: {
            invoiceNumber,
        },
    });

    return response.data;
};

const searchByDateRange = async (from, to) => {
    const response = await apiClient.get("/invoice-management/search-by-date", {
        params: {
            from,
            to,
        },
    });

    return response.data;
};

export default {
    getTodayInvoices,
    searchInvoice,
    searchByDateRange,
};
