import authApi from "../api/authApi";

const authService = {
    async login(data) {
        const response = await authApi.login(data);
        console.log("response", response);
        return response.data;
    },

    async me() {
        const response = await authApi.me();

        return response.data;
    },

    async logout() {
        await authApi.logout();
    },
};

export default authService;
