import { useState } from "react";

export default function usePaymentSummary(total) {
    const [discount, setDiscount] = useState("");
    const [pointsUsed, setPointsUsed] = useState("");

    const [cash, setCash] = useState("");
    const [upi, setUpi] = useState("");
    const [card, setCard] = useState("");

    const loyaltyPoints = Number(pointsUsed || 0);

    const finalTotal = Math.max(
        total - Number(discount || 0) - loyaltyPoints,
        0
    );

    const paidAmount = Number(cash || 0) + Number(upi || 0) + Number(card || 0);

    const balance = Math.max(finalTotal - paidAmount, 0);

    const changeReturn = Math.max(paidAmount - finalTotal, 0);

    return {
        discount,
        setDiscount,

        pointsUsed,
        setPointsUsed,

        cash,
        setCash,

        upi,
        setUpi,

        card,
        setCard,

        finalTotal,
        paidAmount,
        balance,
        changeReturn,
    };
}
