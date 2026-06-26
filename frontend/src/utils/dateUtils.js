// utils/dateUtils.js

export function formatHeldTime(dateTime) {
    if (!dateTime) return "";

    const date = new Date(dateTime);

    const today = new Date();

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isSameDay = (a, b) =>
        a.getDate() === b.getDate() &&
        a.getMonth() === b.getMonth() &&
        a.getFullYear() === b.getFullYear();

    const time = date.toLocaleTimeString("en-IN", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });

    if (isSameDay(date, today)) {
        return `Today • ${time}`;
    }

    if (isSameDay(date, yesterday)) {
        return `Yesterday • ${time}`;
    }

    return (
        date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
        }) + ` • ${time}`
    );
}
