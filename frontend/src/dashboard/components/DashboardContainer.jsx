import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

function DashboardContainer({ children }) {
    return (
        <div
            className="
        h-screen
        bg-[#2347D9]
        relative
        overflow-hidden
        flex
    "
        >
            {/* Top circle */}

            <div
                className="
                    absolute
                    top-[-300px]
                    left-[10%]
                    w-[700px]
                    h-[700px]
                    bg-[#3B5AE8]
                    opacity-20
                    rounded-full
                "
            />

            {/* Bottom circle */}

            <div
                className="
                    absolute
                    bottom-[-250px]
                    left-[-200px]
                    w-[600px]
                    h-[600px]
                    bg-[#3B5AE8]
                    opacity-20
                    rounded-full
                "
            />

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
    );
}

export default DashboardContainer;
