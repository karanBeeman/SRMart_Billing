import BackgroundCircles from "./BackgroundCircles";

function AppBackground({ children }) {
    return (
        <div className="min-h-screen bg-[#2347D9] relative overflow-hidden">
            <BackgroundCircles />

            <div
                className="
                 relative z-10 h-screen w-screen
                "
            >
                {children}
            </div>
        </div>
    );
}

export default AppBackground;
