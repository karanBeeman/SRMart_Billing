function ActionButton({ label }) {
    return (
        <button
            className="
                w-full

                bg-white
                text-[#2347D9]

                py-3

                rounded-xl

                font-semibold

                hover:bg-gray-100

                transition-all
            "
        >
            {label}
        </button>
    );
}

export default ActionButton;
