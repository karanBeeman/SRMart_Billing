import { ScanBarcode } from "lucide-react";

function ProductScanner({
    searchValue,
    onSearch,
    suggestions,
    onLookup,
    onSelectProduct,
}) {
    return (
        <div
            className="
                bg-white/10
                backdrop-blur-lg
                border
                border-white/20
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
                    value={searchValue}
                    onChange={(e) => onSearch(e.target.value)}
                    onKeyDown={(e) => {
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

                                overflow-hidden

                                z-50
                            "
                    >
                        {suggestions.map((product) => (
                            <div
                                key={product.id}
                                onClick={() => onSelectProduct(product)}
                                className="
                                                px-4
                                                py-3

                                                text-white

                                                cursor-pointer

                                                hover:bg-white/10
                                            "
                            >
                                <div>{product.productName}</div>

                                <div
                                    className="
                                                    text-xs
                                                    text-gray-300
                                                "
                                >
                                    ₹{product.sellingPrice}
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
