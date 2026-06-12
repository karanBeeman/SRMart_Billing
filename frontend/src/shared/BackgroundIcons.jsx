import {
    ShoppingCart,
    Users,
    Receipt,
    BarChart3,
    Wallet,
    Truck,
} from "lucide-react";

function BackgroundIcons() {
    return (
        <>
            <Wallet
                size={140}
                className="
        absolute
        top-[10%]
        left-[15%]
        text-cyan-400/10
    "
            />

            <ShoppingCart
                size={150}
                className="
        absolute
        top-[42%]
        left-[8%]
        text-cyan-400/10
    "
            />

            <BarChart3
                size={130}
                className="
        absolute
        bottom-[12%]
        left-[18%]
        text-cyan-400/10
    "
            />

            <Users
                size={140}
                className="
        absolute
        top-[10%]
        right-[15%]
        text-cyan-400/10
    "
            />

            <Truck
                size={130}
                className="
        absolute
        top-[42%]
        right-[10%]
        text-cyan-400/10
    "
            />

            <Receipt
                size={130}
                className="
        bottom-[12%]
        right-[15%]
        absolute
        text-cyan-400/10
    "
            />
        </>
    );
}

export default BackgroundIcons;
