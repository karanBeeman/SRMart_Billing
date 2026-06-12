import { useEffect, useRef, useState } from "react";

export default function useProductTableNavigation(products, removeProduct) {
    const [selectedRow, setSelectedRow] = useState(-1);

    const qtyRefs = useRef([]);
    const priceRefs = useRef([]);

    useEffect(() => {
        if (products.length === 0) {
            setSelectedRow(-1);
            return;
        }

        setSelectedRow(products.length - 1);
    }, [products.length]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === "ArrowDown") {
                e.preventDefault();

                setSelectedRow((prev) =>
                    Math.min(prev + 1, products.length - 1)
                );
            }

            if (e.ctrlKey && e.key === "ArrowUp") {
                e.preventDefault();

                setSelectedRow((prev) => Math.max(prev - 1, 0));
            }

            if (e.ctrlKey && e.key === "ArrowLeft") {
                e.preventDefault();

                qtyRefs.current[selectedRow]?.focus();
                qtyRefs.current[selectedRow]?.select();
            }

            if (e.ctrlKey && e.key === "ArrowRight") {
                e.preventDefault();

                priceRefs.current[selectedRow]?.focus();
                priceRefs.current[selectedRow]?.select();
            }

            // Prevent row deletion when editing an input
            const activeElement = document.activeElement;

            if (activeElement?.tagName === "INPUT") {
                return;
            }

            if (e.key === "Delete" && selectedRow >= 0) {
                console.log("log", "Delete key pressed on row", selectedRow);
                e.preventDefault();

                const product = products[selectedRow];

                if (!product) {
                    return;
                }

                removeProduct(product.id);

                setSelectedRow((prev) => Math.max(prev - 1, 0));
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [products, selectedRow, removeProduct]);

    return {
        selectedRow,
        setSelectedRow,
        qtyRefs,
        priceRefs,
    };
}
