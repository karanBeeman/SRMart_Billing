import { useState } from "react";
import productService from "../services/productService";

export default function useSalesProducts(inputRef) {
    const [searchValue, setSearchValue] = useState("");
    const [products, setProducts] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    const handleProductSearch = async (value) => {
        setSearchValue(value);

        const trimmedValue = value.trim();

        if (!trimmedValue) {
            setSuggestions([]);
            return;
        }

        if (/^\d+$/.test(trimmedValue)) {
            setSuggestions([]);
            return;
        }

        if (trimmedValue.length < 2) {
            setSuggestions([]);
            return;
        }

        try {
            const products = await productService.search(trimmedValue);

            setSuggestions(Array.isArray(products) ? products : []);
        } catch (error) {
            console.error(error);
            setSuggestions([]);
        }
    };

    const addProductToBill = (product) => {
        setProducts((previous) => {
            const existingProduct = previous.find(
                (item) => item.id === product.id
            );

            if (existingProduct) {
                return previous.map((item) =>
                    item.id === product.id
                        ? {
                              ...item,
                              qty: item.qty + 1,
                              total: (item.qty + 1) * item.sellingPrice,
                          }
                        : item
                );
            }

            return [
                ...previous,
                {
                    ...product,
                    qty: 1,
                    total: product.sellingPrice,
                },
            ];
        });

        setSearchValue("");
        setSuggestions([]);
        inputRef.current?.focus();
    };

    const handleProductLookup = async () => {
        if (!searchValue.trim()) {
            return;
        }

        try {
            const product = await productService.lookup(searchValue);

            addProductToBill(product);

            setSearchValue("");
            setSuggestions([]);
        } catch (error) {
            console.error("Product lookup failed", error);
        }
    };

    const updateSellingPrice = (productId, newPrice) => {
        setProducts((previous) =>
            previous.map((product) =>
                product.id === productId
                    ? {
                          ...product,
                          sellingPrice: newPrice,
                          total: newPrice * product.qty,
                      }
                    : product
            )
        );
    };

    const updateQty = (productId, qty) => {
        setProducts((previous) =>
            previous.map((product) =>
                product.id === productId
                    ? {
                          ...product,
                          qty,
                          total: Number(qty || 0) * product.sellingPrice,
                      }
                    : product
            )
        );
    };

    const removeProduct = (productId) => {
        setProducts((previous) =>
            previous.filter((product) => product.id !== productId)
        );
    };

    return {
        searchValue,
        products,
        suggestions,
        handleProductSearch,
        handleProductLookup,
        addProductToBill,
        updateQty,
        updateSellingPrice,
        removeProduct,
    };
}
