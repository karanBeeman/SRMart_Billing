import { Trash2 } from "lucide-react";

function ProductTable({ products, updateQty, removeProduct }) {
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
            <table className="w-full">
                <thead>
                    <tr
                        className="
                        text-gray-200
                        border-b
                        border-white/10
                    "
                    >
                        <th>Product</th>

                        <th>Qty</th>

                        <th>MRP</th>

                        <th>Selling</th>

                        <th>GST%</th>

                        <th>CGST%</th>

                        <th>Total</th>

                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product) => (
                        <tr
                            key={product.id}
                            className="
                            border-b
                            border-white/10
                        "
                        >
                            <td
                                className="
                                py-4
                                text-white
                            "
                            >
                                {product.name}
                            </td>

                            <td>
                                <input
                                    type="number"
                                    value={product.qty}
                                    onChange={(e) =>
                                        updateQty(
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
                                "
                                />
                            </td>

                            <td className="text-white">₹{product.mrp}</td>

                            <td className="text-white">
                                ₹{product.sellingPrice}
                            </td>

                            <td className="text-white">{product.gst}</td>

                            <td className="text-white">{product.cgst}</td>

                            <td className="text-white">₹{product.total}</td>

                            <td>
                                <Trash2
                                    onClick={() => removeProduct(product.id)}
                                    className="
                                    text-red-300
                                    cursor-pointer
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
