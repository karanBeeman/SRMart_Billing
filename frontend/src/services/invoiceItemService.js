import invoiceApi from "../api/invoiceItemApi.js";

const invoiceItemService = {
    async addItem(invoiceNumber, productId) {
        const response = await invoiceApi.addItem(invoiceNumber, productId);
        return response.data;
    },

    async getItems(invoiceNumber) {
        const response = await invoiceApi.getItems(invoiceNumber);
        return response.data;
    },

    async updateQtyItem(invoiceItemId, qty) {
        const response = await invoiceApi.updateQtyItem(invoiceItemId, qty);
        return response.data;
    },

    async updateSellingPrice(invoiceItemId, sellingPrice) {
        const response = await invoiceApi.updateSellingPrice(
            invoiceItemId,
            sellingPrice
        );
        return response.data;
    },

    async deleteItem(invoiceItemId) {
        const response = await invoiceApi.deleteItem(invoiceItemId);
        return response.data;
    },
};

export default invoiceItemService;
