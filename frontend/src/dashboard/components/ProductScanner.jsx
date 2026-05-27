import { ScanBarcode } from "lucide-react";

function ProductScanner({ barcode, setBarcode, handleScan }) {
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
                Scan / Enter Product
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
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    onKeyDown={handleScan}
                    placeholder="
                        Scan barcode or enter serial no
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
