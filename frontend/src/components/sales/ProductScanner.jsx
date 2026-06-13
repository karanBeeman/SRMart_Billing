import { ScanBarcode } from "lucide-react";
import { useEffect, useRef } from "react";

function ProductScanner({
    searchValue,
    onSearch,
    suggestions,
    onLookup,
    onSelectProduct,
    activeIndex,
    setActiveIndex,
    clearSuggestions,
    inputRef,
}) {
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                clearSuggestions();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [clearSuggestions]);

    return (
        <div
            ref={containerRef}
            className="
                relative
                z-50

                border
              bg-slate-900/40
              border-blue-500/20
                backdrop-blur-xl

                rounded-2xl

                p-6
                mb-6
            "
        >
            <h2
                className="
                    text-white
                    text-xl
                    font-semibold
                    mb-4
                "
            >
                Product Search
            </h2>

            <div className="relative">
                <ScanBarcode
                    className="
                        absolute
                        left-4
                        top-4
                        text-white
                    "
                />

                <input
                    ref={inputRef}
                    value={searchValue}
                    onChange={(e) => onSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "ArrowDown" && suggestions.length > 0) {
                            e.preventDefault();

                            setActiveIndex((prev) =>
                                prev < suggestions.length - 1 ? prev + 1 : prev
                            );

                            return;
                        }

                        if (e.key === "ArrowUp" && suggestions.length > 0) {
                            e.preventDefault();

                            setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));

                            return;
                        }

                        if (
                            e.key === "Enter" &&
                            activeIndex >= 0 &&
                            suggestions.length > 0
                        ) {
                            e.preventDefault();
                            onSelectProduct(suggestions[activeIndex]);

                            return;
                        }

                        if (e.key === "Escape") {
                            clearSuggestions();
                            return;
                        }

                        if (e.key === "Enter") {
                            onLookup();
                        }
                    }}
                    placeholder="Scan barcode / Product ID / Product Name"
                    className="
                        w-full
                        pl-12
                        py-4

                        rounded-xl

                        bg-white/10

                        border
                        border-white/20

                        text-white
                        placeholder:text-gray-300

                        outline-none
                    "
                />

                {suggestions.length > 0 && (
                    <div
                        className="
                            absolute
                            left-0
                            right-0
                            top-full
                            mt-2

                            rounded-xl

                            bg-[#2347D9]

                            border
                            border-white/20

                            overflow-y-auto
                            max-h-72

                            z-50
                        "
                    >
                        {suggestions.map((product, index) => (
                            <div
                                key={product.id}
                                onClick={() => {
                                    onSelectProduct(product);

                                    setActiveIndex(-1);
                                }}
                                className={`
                                        px-4
                                        py-3

                                        cursor-pointer

                                        ${
                                            activeIndex === index
                                                ? "bg-white"
                                                : "hover:bg-white/10"
                                        }
                                    `}
                            >
                                <div
                                    className="
                                            flex
                                            justify-between
                                            items-center
                                        "
                                >
                                    <span
                                        className={
                                            activeIndex === index
                                                ? "text-[#2347D9] font-semibold"
                                                : "text-white"
                                        }
                                    >
                                        {product.productName}
                                    </span>

                                    <span
                                        className={
                                            activeIndex === index
                                                ? "text-[#2347D9] font-semibold"
                                                : "text-white"
                                        }
                                    >
                                        ₹{product.sellingPrice}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductScanner;
