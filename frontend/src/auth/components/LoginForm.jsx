import { User, Lock } from "lucide-react";

import useLogin from "../../hooks/useLogin";

import LoginLogo from "./LoginLogo";
import LoginInput from "./LoginInput";
import LoginError from "./LoginError";

function LoginForm() {
    const { formData, loading, error, handleChange, handleSubmit } = useLogin();

    return (
        <div
            className="
                w-full
                max-w-md
                mx-auto
                bg-white/8
                 backdrop-blur-xl
                border
                border-white/20
                rounded-3xl
                px-8
                py-10
                shadow-2xl
    shadow-black/30
            "
        >
            <LoginLogo />

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <LoginInput
                    icon={User}
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                />

                <LoginInput
                    icon={Lock}
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                />

                <LoginError error={error} />

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
