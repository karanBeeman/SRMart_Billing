import { ScanBarcode } from "lucide-react";

function ProductScanner({ searchValue, setSearchValue, onSearch }) {
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
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            onSearch();
                        }
                    }}
                    placeholder="
                        Scan barcode / Product ID / Product Name
                    "
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
            </div>
        </div>
    );
}

export default ProductScanner;
