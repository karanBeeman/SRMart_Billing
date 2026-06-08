import useLogin from "../../hooks/useLogin.js";

import { User, Lock, ShoppingCart } from "lucide-react";

function LoginForm() {
    const { formData, loading, error, handleChange, handleSubmit } = useLogin();

    return (
        <div
            className="
                w-full
                max-w-md
                mx-auto

                bg-white/10
                backdrop-blur-lg

                border
                border-white/20

                rounded-3xl

                px-8
                py-10

                shadow-2xl
            "
        >
            {/* Logo */}

            <div
                className="
        flex
        flex-col
        items-center
        mb-10
    "
            >
                <ShoppingCart size={64} color="white" strokeWidth={1.7} />

                <h1
                    className="
            text-white
            text-4xl
            font-extrabold
            mt-3
            tracking-wide
        "
                >
                    SR MART
                </h1>

                <p
                    className="
            text-white/70
            text-sm
            mt-1
        "
                >
                    Billing & Inventory System
                </p>
            </div>

            {/* Form */}

            <form
                onSubmit={handleSubmit}
                className="
                    flex
                    flex-col
                    gap-5
                "
            >
                {/* Username */}

                <div className="relative">
                    <User
                        size={20}
                        className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-white
                        "
                    />

                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                        required
                        autoComplete="off"
                        className="
                            w-full
                            h-14

                            pl-12
                            pr-4

                            rounded-xl

                            bg-white/10
                            border
                            border-white/30

                            text-white
                            placeholder:text-gray-200

                            outline-none

                            focus:border-white
                            focus:bg-white/15

                            transition-all
                        "
                    />
                </div>

                {/* Password */}

                <div className="relative">
                    <Lock
                        size={20}
                        className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-white
                        "
                    />

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        autoComplete="off"
                        className="
                            w-full
                            h-14

                            pl-12
                            pr-4

                            rounded-xl

                            bg-white/10
                            border
                            border-white/30

                            text-white
                            placeholder:text-gray-200

                            outline-none

                            focus:border-white
                            focus:bg-white/15

                            transition-all
                        "
                    />
                </div>

                {/* Error Message */}

                {error && (
                    <div
                        className="
                            bg-red-500/90
                            text-white

                            text-sm
                            text-center

                            py-3
                            px-4

                            rounded-xl
                        "
                    >
                        {error}
                    </div>
                )}

                {/* Login Button */}

                <button
                    type="submit"
                    disabled={loading}
                    className="
                        h-14

                        bg-white
                        text-[#2347D9]

                        rounded-xl

                        font-semibold
                        text-lg

                        shadow-lg

                        hover:bg-gray-100
                        active:scale-[0.98]

                        transition-all
                        duration-200
                    "
                >
                    {loading ? "LOGGING IN..." : "LOGIN"}
                </button>

                {/* Forgot Password */}

                <button
                    type="button"
                    className="
                        text-white
                        text-sm

                        mt-2

                        hover:underline
                    "
                >
                    Forgot password?
                </button>
            </form>
        </div>
    );
}

export default LoginForm;
