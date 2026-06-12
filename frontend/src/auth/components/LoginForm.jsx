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

            bg-slate-900/40
    backdrop-blur-2xl

    border
    border-blue-500/20

    rounded-3xl

    px-8
    py-10

    shadow-[0_0_50px_rgba(59,130,246,0.25)]

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

    rounded-xl

    bg-gradient-to-r
    from-blue-600
    to-cyan-500

    text-white
    font-semibold
    text-lg

    shadow-[0_0_20px_rgba(59,130,246,0.5)]

    hover:scale-[1.01]
    hover:brightness-110

    transition-all
                    "
                >
                    {loading ? "LOGGING IN..." : "LOGIN"}
                </button>

                <button
                    type="button"
                    className="
                       text-slate-300
    text-sm
    mt-2

    hover:text-cyan-300
    transition-colors
                    "
                >
                    Forgot password?
                </button>
            </form>
        </div>
    );
}

export default LoginForm;
