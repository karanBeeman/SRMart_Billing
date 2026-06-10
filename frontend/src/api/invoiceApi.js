import apiClient from "./apiClient";

const invoiceApi = {
    createDraftInvoice(request) {
        return apiClient.post("/create/draft/invoices", request);
    },
};

export default invoiceApi;
