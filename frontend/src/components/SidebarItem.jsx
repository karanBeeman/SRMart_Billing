import { NavLink } from "react-router-dom";

function SidebarItem({ icon, label, to }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => `
                flex
                items-center
                gap-3

                px-4
                py-3

                rounded-xl

                transition-all

                ${
                    isActive
                        ? "bg-white text-[#2347D9]"
                        : "text-white hover:bg-white/10"
                }
            `}
        >
            {icon}

            <span className="font-medium">{label}</span>
        </NavLink>
    );
}

export default SidebarItem;
