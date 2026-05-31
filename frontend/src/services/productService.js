import productApi from "../api/productApi";

const productService = {
    async search(value) {
        const response = await productApi.search(value);

        return response.data;
    },
};

export default productService;
