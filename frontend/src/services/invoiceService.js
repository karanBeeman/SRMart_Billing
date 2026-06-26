import invoiceApi from "../api/invoiceApi";

const invoiceService = {
    async createDraftInvoice(request) {
        const response = await invoiceApi.createDraftInvoice(request);

        return response.data;
    },

    async holdInvoice(invoiceNumber, request) {
        const response = await invoiceApi.holdInvoice(invoiceNumber, request);

        return response.data;
    },

    async completeInvoice(invoiceNumber, request) {
        const response = await invoiceApi.completeInvoice(
            invoiceNumber,
            request
        );

        return response.data;
    },

    async getHeldInvoices() {
        const response = await invoiceApi.getHeldInvoices();
        return response.data;
    },
};

export default invoiceService;
