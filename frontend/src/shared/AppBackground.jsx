import BackgroundIcons from "./BackgroundIcons";
import BackgroundCircles from "./BackgroundCircles.jsx";

function AppBackground({ children }) {
    return (
        <div
            className="
                min-h-screen
                relative
                overflow-hidden
                bg-gradient-to-br
                from-[#3B2EFF]
                via-[#2446F0]
                to-[#7B2CFF]
            "
        >
            {/* Top-left glow */}
            <div
                className="
                    absolute
                    top-[-300px]
                    left-[-300px]
                    w-[900px]
                    h-[900px]
                    rounded-full
                    bg-white/10
                    blur-[180px]
                "
            />

            {/* Bottom-right glow */}
            <div
                className="
                    absolute
                    bottom-[-300px]
                    right-[-200px]
                    w-[1000px]
                    h-[1000px]
                    rounded-full
                    bg-fuchsia-500/20
                    blur-[220px]
                "
            />

            {/* Brand watermark */}
            <div
                className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    text-white/[0.03]
                    text-[220px]
                    font-bold
                    pointer-events-none
                    select-none
                "
            >
                SR MART
            </div>

            <BackgroundCircles />
            <BackgroundIcons />

            <div className="relative z-10 min-h-screen">{children}</div>
        </div>
    );
}

export default AppBackground;
