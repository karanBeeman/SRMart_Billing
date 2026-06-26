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

    getHeldInvoices() {
        return apiClient.get(`/resume/invoices`);
    },
};

export default invoiceApi;
