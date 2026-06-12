import { Bell, Search } from "lucide-react";

import { useAuth } from "../auth/hooks/useAuth.js";

function TopNavbar() {
    const { user } = useAuth();

    const firstLetter =
        user?.username

            ?.charAt(0)

            ?.toUpperCase() || "U";

    return (
        <div
            className="
                flex
                items-center
                justify-between
                mb-8
            "
        >
            {/* Right side */}

            <div
                className="
                    flex
                    items-center
                    gap-5
                "
            >
                <Bell
                    size={22}
                    className="
                        text-white
                        cursor-pointer
                    "
                />

                <div
                    className="
        relative
        group
        z-50
    "
                >
                    {/* Profile circle */}

                    <div
                        className="
            w-11
            h-11

            rounded-full

            bg-white/20

            flex
            items-center
            justify-center

            text-white
            font-semibold
            text-lg

            cursor-pointer
        "
                    >
                        {firstLetter}
                    </div>

                    {/* Hover card */}

                    <div
                        className="
            absolute
            top-14
            right-0

            px-4
            py-2

            rounded-xl

            bg-amber-300/50
            backdrop-blur-md

            border
            border-white/20

            text-white
            text-sm
            font-bold

            opacity-0
            invisible

            group-hover:opacity-100
            group-hover:visible

            transition-all
            duration-200

            whitespace-nowrap

            z-[9999]
        "
                    >
                        {user?.username}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopNavbar;
