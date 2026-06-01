import apiClient from "./apiClient";

const productApi = {
    search(value) {
        return apiClient.get(
            "/search/product",

            {
                params: {
                    value,
                },
            }
        );
    },
};

export default productApi;
