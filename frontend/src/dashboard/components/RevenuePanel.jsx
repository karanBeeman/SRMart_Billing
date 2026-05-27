function RevenuePanel() {
    return (
        <div
            className="
                xl:col-span-2

                bg-white/10
                backdrop-blur-lg

                border
                border-white/20

                rounded-2xl

                p-6

                min-h-[350px]
            "
        >
            <div
                className="
                    flex
                    items-center
                    justify-between
                    mb-6
                "
            >
                <h3
                    className="
                        text-white
                        text-xl
                        font-semibold
                    "
                >
                    Revenue Overview
                </h3>

                <button
                    className="
                        bg-white
                        text-[#2347D9]

                        px-4
                        py-2

                        rounded-lg
                        font-medium
                    "
                >
                    Export
                </button>
            </div>

            <div
                className="
                    h-[250px]

                    rounded-2xl

                    bg-white/5

                    flex
                    items-center
                    justify-center

                    text-gray-200
                    text-lg
                "
            >
                Revenue Chart
            </div>
        </div>
    );
}

export default RevenuePanel;
