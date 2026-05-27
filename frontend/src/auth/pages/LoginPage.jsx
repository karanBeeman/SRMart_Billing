import LoginForm from "../components/LoginForm";

function LoginPage() {
    return (
        <div
            className="
                min-h-screen
                bg-[#2347D9]

                relative
                overflow-hidden

                flex
                items-center
                justify-center
            "
        >
            {/* Top Circle */}

            <div
                className="
                    absolute
                    top-[-300px]
                    left-[10%]

                    w-[700px]
                    h-[700px]

                    md:w-[900px]
                    md:h-[900px]

                    bg-[#3B5AE8]
                    opacity-30
                    rounded-full

                    z-0
                "
            />

            {/* Bottom Left Circle */}

            <div
                className="
                    absolute
                    bottom-[-250px]
                    left-[-200px]

                    w-[500px]
                    h-[500px]

                    md:w-[700px]
                    md:h-[700px]

                    bg-[#3B5AE8]
                    opacity-30
                    rounded-full

                    z-0
                "
            />

            {/* Right Circle */}

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

            {/* Login Form */}

            <div
                className="
                    relative
                    z-10

                    w-full
                    max-w-md

                    px-6
                "
            >
                <LoginForm />
            </div>
        </div>
    );
}

export default LoginPage;
