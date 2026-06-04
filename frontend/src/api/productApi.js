import apiClient from "./apiClient";

const productApi = {
    lookup(value) {
        return apiClient.get("/products/lookup", {
            params: { value },
        });
    },

    search(value) {
        return apiClient.get("/products/search", {
            params: { value },
        });
    },
};

export default productApi;
