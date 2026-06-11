import invoiceApi from "../api/invoiceApi";

const invoiceService = {
    async createDraftInvoice(request) {
        const response = await invoiceApi.createDraftInvoice(request);

        return response.data;
    },

    async holdInvoice(invoiceNumber, request) {
        const response = await invoiceApi.holdInvoice(
            invoiceNumber,
            request
        );

        return response.data;
    }
};

export default invoiceService;
