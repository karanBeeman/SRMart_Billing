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
        const message = error.response?.data?.message || "Something went wrong";

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

        const customError = new Error(message);
        customError.status = error.response?.status;
        return Promise.reject(customError);
    }
);

export default apiClient;
