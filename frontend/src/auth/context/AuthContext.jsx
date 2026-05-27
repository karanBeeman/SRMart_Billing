import { createContext, useEffect, useState } from "react";

import authService from "../../services/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        initialize();
    }, []);

    const initialize = () => {
        const savedUser = sessionStorage.getItem("user");

        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

        setLoading(false);
    };

    const login = async (data) => {
        const response = await authService.login(data);

        const loggedUser = {
            username: response.username,

            roles: response.roles,
        };

        sessionStorage.setItem(
            "user",

            JSON.stringify(loggedUser)
        );

        setUser(loggedUser);
    };

    const logout = () => {
        sessionStorage.removeItem("user");

        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,

                login,

                logout,

                isAuthenticated: !!user,

                loading,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
}
