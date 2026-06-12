import BackgroundIcons from "./BackgroundIcons";

export default function AppBackground({ children }) {
    return (
        <div
            className="
                min-h-screen
                relative
                overflow-hidden
                bg-slate-950
            "
        >
            {/* Blue glow */}
            <div
                className="
                    absolute
                    top-[-200px]
                    left-[-200px]
                    w-[600px]
                    h-[600px]
                    rounded-full
                    bg-blue-500/20
                    blur-[150px]
                "
            />

            <div
                className="
                    absolute
                    bottom-[-200px]
                    right-[-200px]
                    w-[600px]
                    h-[600px]
                    rounded-full
                    bg-cyan-500/20
                    blur-[150px]
                "
            />

            {/* Futuristic border panels */}
            <div
                className="
                    absolute
                    inset-0
                    bg-[linear-gradient(135deg,transparent_25%,rgba(59,130,246,0.08)_25%,rgba(59,130,246,0.08)_26%,transparent_26%)]
                    bg-[length:300px_300px]
                "
            />

            <BackgroundIcons />

            <div className="relative z-10 min-h-screen">{children}</div>
        </div>
    );
}
