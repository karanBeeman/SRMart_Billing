import invoiceApi from "../api/invoiceApi";

const invoiceService = {
    async createDraftInvoice(request) {
        const response = await invoiceApi.createDraftInvoice(request);

        return response.data;
    },
};

export default invoiceService;
