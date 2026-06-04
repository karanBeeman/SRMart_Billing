import {
    LayoutDashboard,
    Receipt,
    Truck,
    Users,
    BarChart3,
    Settings,
    LogOut,
    ShoppingCart,
} from "lucide-react";

import SidebarItem from "./SidebarItem.jsx";

function Sidebar() {
    return (
        <div
            className="
                relative
                z-10

                w-[260px]
                min-h-screen

                bg-white/10
                backdrop-blur-lg

                border-r
                border-white/20

                p-6
            "
        >
            <div
                className="
                    flex
                    items-center
                    gap-3
                    mb-12
                "
            >
                <ShoppingCart size={34} className="text-white" />

                <h1
                    className="
                        text-white
                        text-2xl
                        font-bold
                    "
                >
                    SR MART
                </h1>
            </div>

            <div className="flex flex-col gap-3">
                <SidebarItem
                    icon={<LayoutDashboard size={20} />}
                    label="Dashboard"
                    to="/dashboard"
                />

                <SidebarItem
                    icon={<Receipt size={20} />}
                    label="Sales Entry"
                    to="/sales"
                />

                <SidebarItem
                    icon={<Truck size={20} />}
                    label="Purchase Entry"
                    to="/purchase"
                />

                <SidebarItem
                    icon={<Users size={20} />}
                    label="Customers"
                    to="/customers"
                />

                <SidebarItem
                    icon={<BarChart3 size={20} />}
                    label="Reports"
                    to="/reports"
                />

                <SidebarItem
                    icon={<Settings size={20} />}
                    label="Settings"
                    to="/settings"
                />

                <SidebarItem icon={<LogOut size={20} />} label="Logout" />
            </div>
        </div>
    );
}

export default Sidebar;
