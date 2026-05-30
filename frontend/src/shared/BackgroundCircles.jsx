function BackgroundCircles() {
    return (
        <>
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

            {/* Right circle */}
            <div
                className="
                    absolute
                    top-[150px]
                    right-[-250px]
                    w-[400px]
                    h-[400px]
                    md:w-[700px]
                    md:h-[700px]
                    bg-[#3B5AE8]
                    opacity-20
                    rounded-full
                    z-0
                "
            />
        </>
    );
}

export default BackgroundCircles;
