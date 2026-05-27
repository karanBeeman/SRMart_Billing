import {

    Routes,
    Route,
    Navigate

} from "react-router-dom";

import LoginPage
    from "./auth/pages/LoginPage";

import SalesPage
    from "./dashboard/pages/SalesPage";

import DashboardPage
    from "./dashboard/pages/DashboardPage";

import CustomerPage
    from "./dashboard/pages/CustomerPage";

import UnauthorizedPage
    from "./dashboard/pages/UnauthorizedPage";

import ProtectedRoute
    from "./auth/components/ProtectedRoute";


function App(){

    return(

        <Routes>

            <Route
                path="/"
                element={
                    <Navigate
                        to="/login"
                        replace
                    />
                }
            />

            <Route
                path="/login"
                element={
                    <LoginPage/>
                }
            />

            <Route
                path="/unauthorized"
                element={
                    <UnauthorizedPage/>
                }
            />

            <Route
                path="/sales"
                element={
                    <ProtectedRoute>
                        <SalesPage/>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute
                        roles={["ADMIN"]}
                    >
                        <DashboardPage/>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/customers"
                element={
                    <ProtectedRoute
                        roles={[
                            "ADMIN",
                            "BILLER"
                        ]}
                    >
                        <CustomerPage/>
                    </ProtectedRoute>
                }
            />

        </Routes>

    );

}

export default App;