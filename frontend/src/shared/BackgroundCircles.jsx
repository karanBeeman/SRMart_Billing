function BackgroundCircles() {
    return (
        <>
            <div
                className="
                    absolute
                    top-[-300px]
                    left-[5%]
                    w-[800px]
                    h-[800px]
                    rounded-full
                    bg-cyan-400/10
                    blur-3xl
                "
            />

            <div
                className="
                    absolute
                    bottom-[-250px]
                    left-[-150px]
                    w-[700px]
                    h-[700px]
                    rounded-full
                  bg-purple-500/5
                    blur-3xl
                "
            />

            <div
                className="
                    absolute
                    top-[100px]
                    right-[-250px]
                    w-[800px]
                    h-[800px]
                    rounded-full
                    bg-pink-500/10
                    blur-3xl
                "
            />
        </>
    );
}

export default BackgroundCircles;
