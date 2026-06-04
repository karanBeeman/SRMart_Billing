import { Gift } from "lucide-react";

function LoyaltyCard({ availablePoints, earnedPoints }) {
    return (
        <div
            className="
                mt-6
                bg-white/5
                rounded-xl
                p-5
            "
        >
            <div
                className="
                    flex
                    justify-between
                    items-center
                "
            >
                <div
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >
                    <Gift
                        size={24}
                        className="
                            text-yellow-300
                        "
                    />

                    <div>
                        <p
                            className="
                                text-gray-300
                                text-sm
                            "
                        >
                            Available Loyalty
                        </p>

                        <p
                            className="
                                text-white
                                font-bold
                            "
                        >
                            {availablePoints || 0} points
                        </p>
                    </div>
                </div>

                <div className="text-right">
                    <p
                        className="
                            text-gray-300
                            text-sm
                        "
                    >
                        Earned From Bill
                    </p>

                    <p
                        className="
                            text-green-300
                            font-bold
                        "
                    >
                        +{earnedPoints}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoyaltyCard;
