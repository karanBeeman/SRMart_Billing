import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import LoginPage from "./auth/pages/LoginPage";

import SalesPage from "./pages/SalesPage";

import DashboardPage from "./pages/DashboardPage";

import ProtectedRoute from "./auth/components/ProtectedRoute";

function App() {
    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />

                <Route path="/login" element={<LoginPage />} />

                <Route
                    path="/sales"
                    element={
                        <ProtectedRoute>
                            <SalesPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute roles={["ADMIN", "MANAGER"]}>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
}

export default App;
