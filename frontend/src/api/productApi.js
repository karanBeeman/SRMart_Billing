import apiClient from "./apiClient";

const productApi = {
    search(value) {
        return apiClient.get(
            "/products/search",

            {
                params: {
                    value,
                },
            }
        );
    },
};

export default productApi;
