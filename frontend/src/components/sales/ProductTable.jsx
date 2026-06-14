import ProductRow from "./ProductRow";
import { useEffect, useRef } from "react";

function ProductTable(props) {
    const { products, selectedRow, setSelectedRow } = props;

    const selectedRowRef = useRef(null);

    useEffect(() => {
        selectedRowRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });
    }, [selectedRow]);

    return (
        <div className="bg-slate-900/40 border border-blue-500/20 backdrop-blur-xl rounded-2xl p-6 mb-6">
            <div className="max-h-[420px] overflow-y-auto">
                <table className="w-full table-fixed">
                    <thead
                        className="
                sticky
                top-0
                z-10
                bg-slate-900
            "
                    >
                        <tr className="text-gray-200 border-b border-white/10">
                            <th className="w-[26%] py-3 text-left">Product</th>
                            <th className="w-[8%] py-3 text-center">Qty</th>
                            <th className="w-[10%] py-3 text-center">MRP</th>
                            <th className="w-[10%] py-3 text-center">
                                Selling
                            </th>
                            <th className="w-[8%] py-3 text-center">CGST%</th>
                            <th className="w-[8%] py-3 text-center">SGST%</th>
                            <th className="w-[12%] py-3 text-center">Total</th>
                            <th className="w-[6%] py-3 text-center">Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product, index) => (
                            <ProductRow
                                key={product.id}
                                product={product}
                                index={index}
                                selectedRow={selectedRow}
                                setSelectedRow={setSelectedRow}
                                selectedRowRef={selectedRowRef}
                                {...props}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductTable;
