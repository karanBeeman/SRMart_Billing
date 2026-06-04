import ActionButton from "./ActionButton.jsx";

function QuickActions() {
    return (
        <div
            className="
                bg-white/10
                backdrop-blur-lg

                border
                border-white/20

                rounded-2xl

                p-6
            "
        >
            <h3
                className="
                    text-white
                    text-xl
                    font-semibold
                    mb-6
                "
            >
                Quick Actions
            </h3>

            <div className="flex flex-col gap-4">
                <ActionButton label="Create Invoice" />

                <ActionButton label="Add Customer" />

                <ActionButton label="New Purchase" />

                <ActionButton label="Generate Report" />
            </div>
        </div>
    );
}

export default QuickActions;
