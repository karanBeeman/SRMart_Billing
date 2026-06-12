import Sidebar from "./Sidebar.jsx";
import TopNavbar from "./TopNavbar.jsx";
import AppBackground from "../shared/AppBackground.jsx";

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

    p-6
    md:p-8

    overflow-y-auto
    h-screen

    text-slate-100
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
