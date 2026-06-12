import { Trash2 } from "lucide-react";

function ProductTable({
    products,
    updateQty,
    updateSellingPrice,
    removeProduct,
    selectedRow,
    setSelectedRow,
    qtyRefs,
    priceRefs,
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
            <table className="w-full table-fixed">
                <thead>
                    <tr
                        className="
                            text-gray-200
                            border-b
                            border-white/10
                        "
                    >
                        <th className="py-3 text-left">Product</th>
                        <th className="py-3 text-center">Qty</th>
                        <th className="py-3 text-center">MRP</th>
                        <th className="py-3 text-center">Selling</th>
                        <th className="py-3 text-center">CGST%</th>
                        <th className="py-3 text-center">SGST%</th>
                        <th className="py-3 text-center">Total</th>
                        <th className="py-3 text-center">Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product, index) => (
                        <tr
                            key={product.id}
                            onClick={() => setSelectedRow(index)}
                            className="
                                border-b
                                border-white/10
                                cursor-pointer
                            "
                        >
                            <td
                                className={`
                                    py-4
                                    text-left
                                    font-medium
                                    transition-all
                                    ${
                                        selectedRow === index
                                            ? "border-l-4 border-cyan-400 pl-4 bg-white/5"
                                            : ""
                                    }
                                `}
                            >
                                <div
                                    className={`
                                        ftext-lg font-semibold text-white
                                        ${
                                            selectedRow === index
                                                ? "text-cyan-300"
                                                : "text-white"
                                        }
                                    `}
                                >
                                    {product.productName}
                                </div>

                                <div
                                    className={`
                                        text-base
                                        font-medium
                                        mt-1
                                        ${
                                            product.stockQuantity <= 5
                                                ? "text-red-300"
                                                : "text-green-300"
                                        }
                                    `}
                                >
                                    Stock Available: {product.stockQuantity}
                                </div>
                            </td>

                            <td className="text-center">
                                <input
                                    ref={(el) => (qtyRefs.current[index] = el)}
                                    type="number"
                                    min="1"
                                    value={product.qty}
                                    onChange={(e) =>
                                        updateQty(product.id, e.target.value)
                                    }
                                    onBlur={(e) => {
                                        const qty = Number(e.target.value);

                                        updateQty(
                                            product.id,
                                            qty > 0 ? qty : 1
                                        );
                                    }}
                                    className="
                                        no-spinner
                                        w-20
                                        p-2
                                        rounded
                                        bg-white/10
                                        text-white
                                        text-center
                                        border
                                        border-white/10
                                    "
                                />
                            </td>

                            <td className="text-center text-white">
                                ₹{product.mrpPrice}
                            </td>

                            <td className="text-center">
                                <input
                                    ref={(el) =>
                                        (priceRefs.current[index] = el)
                                    }
                                    type="text"
                                    value={product.sellingPrice}
                                    onChange={(e) =>
                                        updateSellingPrice(
                                            product.id,
                                            Number(e.target.value)
                                        )
                                    }
                                    className="
                                        w-20
                                        p-2
                                        rounded
                                        bg-white/10
                                        text-white
                                        text-center
                                        border
                                        border-white/10
                                    "
                                />
                            </td>

                            <td className="text-center text-white">
                                {product.cgstPercentage ?? 0}
                            </td>

                            <td className="text-center text-white">
                                {product.sgstPercentage ?? 0}
                            </td>

                            <td
                                className="
                                    text-center
                                    text-white
                                    font-semibold
                                "
                            >
                                ₹
                                {(product.sellingPrice * product.qty).toFixed(
                                    2
                                )}
                            </td>

                            <td className="text-center">
                                <Trash2
                                    size={20}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeProduct(product.id);
                                    }}
                                    className="
                                        text-red-300
                                        cursor-pointer
                                        mx-auto
                                        hover:text-red-400
                                    "
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductTable;
