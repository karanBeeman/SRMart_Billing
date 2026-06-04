import productApi from "../api/productApi";

const productService = {
    async lookup(value) {
        const response = await productApi.lookup(value);
        console.log("products =", response);
        return response.data;
    },

    async search(value) {
        const response = await productApi.search(value);
        return response.data;
    },
};

export default productService;
