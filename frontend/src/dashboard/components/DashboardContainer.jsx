import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import AppBackground from "../../shared/AppBackground.jsx";

function DashboardContainer({ children }) {
    return (
        <AppBackground>
            <div className="h-screen flex">
                <Sidebar />

                <div
                    className="
                        flex-1
                        relative
                        z-10
                        p-8
                        overflow-y-auto
                        h-screen
                    "
                >
                    <TopNavbar />
                    {children}
                </div>
            </div>
        </AppBackground>
    );
}

export default DashboardContainer;
