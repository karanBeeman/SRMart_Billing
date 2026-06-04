import { Bell, Search } from "lucide-react";

import { useAuth } from "../auth/hooks/useAuth.js";

function TopNavbar() {
    const { user } = useAuth();

    console.log("user in top navbar:", user);

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
            {/* Search */}

            <div
                className="
                    flex
                    items-center

                    w-[350px]

                    bg-white/10
                    backdrop-blur-md

                    border
                    border-white/20

                    rounded-xl

                    px-4
                    py-3
                "
            >
                <Search
                    size={18}
                    className="
                        text-white
                        mr-3
                    "
                />

                <input
                    type="text"
                    placeholder="
                        Search...
                    "
                    className="
                        bg-transparent
                        outline-none
                        text-white
                        placeholder:text-gray-200
                        w-full
                    "
                />
            </div>

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

            bg-white/15
            backdrop-blur-md

            border
            border-white/20

            text-white
            text-sm

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
