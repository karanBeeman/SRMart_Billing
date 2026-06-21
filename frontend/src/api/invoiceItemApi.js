import api from "./apiclient";

const invoiceItemApi = {
    addItem(invoiceNumber, productId) {
        return api.post(`/add/invoices/${invoiceNumber}/items`, {
            productId,
        });
    },

    getItems(invoiceNumber) {
        return api.get(`/get/invoices/${invoiceNumber}/items`);
    },

    updateQtyItem(invoiceItemId, qty) {
        return api.put(`/update/invoice-items/${invoiceItemId}/qty`, {
            qty,
        });
    },

    updateSellingPrice(invoiceItemId, sellingPrice) {
        return api.put(`/update/invoice-items/${invoiceItemId}/selling-price`, {
            sellingPrice,
        });
    },

    deleteItem(invoiceItemId) {
        return api.delete(`/invoice-items/${invoiceItemId}`);
    },
};

export default invoiceItemApi;
