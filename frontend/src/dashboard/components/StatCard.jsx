function StatCard({ title, value }) {
    return (
        <div
            className="
                bg-white/10
                backdrop-blur-lg

                border
                border-white/20

                rounded-2xl

                p-6

                shadow-xl
            "
        >
            <p className="text-gray-200 mb-2">{title}</p>

            <h3
                className="
                    text-white
                    text-3xl
                    font-bold
                "
            >
                {value}
            </h3>
        </div>
    );
}

export default StatCard;
