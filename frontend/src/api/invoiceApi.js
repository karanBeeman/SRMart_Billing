import apiClient from "./apiClient";

const invoiceApi = {
    createDraftInvoice(request) {
        return apiClient.post("/create/draft/invoices", request);
    },

    holdInvoice(invoiceNumber, request) {
        return apiClient.put(`/hold/invoices/${invoiceNumber}`, request);
    },

    completeInvoice(invoiceNumber, request) {
        return apiClient.put(`/complete/invoices/${invoiceNumber}`, request);
    },
};

export default invoiceApi;
