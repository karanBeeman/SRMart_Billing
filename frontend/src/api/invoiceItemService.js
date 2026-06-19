import api from "./apiclient";

const invoiceItemService = {
    addItem(invoiceNumber, productId) {
        return api.post(`/create/invoices/${invoiceNumber}/items`, {
            productId,
        });
    },

    getItems(invoiceNumber) {
        return api.get(`/invoices/${invoiceNumber}/items`);
    },

    updateItem(invoiceItemId, qty, sellingPrice) {
        return api.put(`/invoice-items/${invoiceItemId}`, {
            qty,
            sellingPrice,
        });
    },

    deleteItem(invoiceItemId) {
        return api.delete(`/invoice-items/${invoiceItemId}`);
    },
};

export default invoiceItemService;
