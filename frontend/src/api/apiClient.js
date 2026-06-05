import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8082",

    withCredentials: true,

    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.response.use(
    (response) => response,

    (error) => {
        switch (error.response?.status) {
            case 403:
                alert("Access denied");
                break;

            case 500:
                alert("Server error");
                break;

            default:
                break;
        }

        return Promise.reject(error);
    }
);

export default apiClient;
