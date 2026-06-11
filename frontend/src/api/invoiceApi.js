import apiClient from "./apiClient";

const invoiceApi = {
    createDraftInvoice(request) {
        return apiClient.post("/create/draft/invoices", request);
    },

    holdInvoice(invoiceNumber, request) {
        return apiClient.post(`/hold/invoices/${invoiceNumber}`, request);
    }
};

export default invoiceApi;
