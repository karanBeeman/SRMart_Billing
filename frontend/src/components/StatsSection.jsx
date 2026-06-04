import StatCard from "./StatCard.jsx";

function StatsSection() {
    const stats = [
        {
            title: "Today's Sales",
            value: "₹24,500",
        },
        {
            title: "Pending Payments",
            value: "₹8,200",
        },
        {
            title: "Invoices",
            value: "124",
        },
        {
            title: "Customers",
            value: "58",
        },
    ];

    return (
        <div
            className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-4
                gap-6
                mb-8
            "
        >
            {stats.map((item, index) => (
                <StatCard key={index} title={item.title} value={item.value} />
            ))}
        </div>
    );
}

export default StatsSection;
