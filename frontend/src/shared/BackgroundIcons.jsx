import {
    Package,
    ShoppingCart,
    Users,
    Receipt,
    BarChart3,
    Warehouse,
    Boxes,
    CreditCard,
    BadgePercent,
    ClipboardList,
    TrendingUp,
} from "lucide-react";

function BackgroundIcons() {
    const iconStyle = "absolute text-white/10";

    return (
        <>
            {/* LEFT SIDE */}
            <Package
                size={120}
                className={`${iconStyle} top-20 left-20 rotate-12`}
            />

            <ShoppingCart
                size={140}
                className={`${iconStyle} bottom-24 left-20 -rotate-6`}
            />

            <Boxes
                size={110}
                className={`${iconStyle} top-1/2 left-1/4 rotate-12`}
            />

            <CreditCard
                size={110}
                className={`${iconStyle} bottom-20 left-[30%] -rotate-12`}
            />

            {/* TOP CENTER */}
            <Warehouse
                size={120}
                className={`${iconStyle} top-16 left-1/2 -translate-x-1/2`}
            />

            {/* RIGHT SIDE */}
            <Users size={120} className={`${iconStyle} top-32 right-24`} />

            <TrendingUp
                size={120}
                className={`${iconStyle} top-[35%] right-[22%]`}
            />

            <BarChart3
                size={130}
                className={`${iconStyle} top-[55%] right-[25%]`}
            />

            <ClipboardList
                size={120}
                className={`${iconStyle} bottom-20 right-16`}
            />

            <Receipt
                size={130}
                className={`${iconStyle} bottom-16 right-[22%]`}
            />

            {/* BOTTOM CENTER */}
            <BadgePercent
                size={110}
                className={`${iconStyle} bottom-12 left-1/2 -translate-x-1/2`}
            />
        </>
    );
}

export default BackgroundIcons;
