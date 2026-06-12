import { useRef, useState } from "react";
import { toast } from "react-toastify";
import productService from "../services/productService";

export default function useSalesProducts(inputRef) {
    const [searchValue, setSearchValue] = useState("");
    const [products, setProducts] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const searchTimerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(-1);
    const clearSuggestions = () => {
        setSuggestions([]);
        setActiveIndex(-1);
    };

    const handleProductSearch = (value) => {
        setSearchValue(value);

        const trimmedValue = value.trim();

        if (!trimmedValue) {
            setSuggestions([]);
            setActiveIndex(-1);

            return;
        }

        if (/^\d+$/.test(trimmedValue)) {
            setSuggestions([]);
            setActiveIndex(-1);

            return;
        }

        if (trimmedValue.length < 3) {
            setSuggestions([]);
            setActiveIndex(-1);

            return;
        }

        if (searchTimerRef.current) {
            clearTimeout(searchTimerRef.current);
        }

        searchTimerRef.current = setTimeout(async () => {
            try {
                const products = await productService.search(trimmedValue);

                const result = Array.isArray(products) ? products : [];

                setSuggestions(result);

                setActiveIndex(result.length > 0 ? 0 : -1);
            } catch (error) {
                console.error(error);

                setSuggestions([]);
                setActiveIndex(-1);
            }
        }, 300);
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
        setActiveIndex(-1);
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
            setActiveIndex(-1);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Product not found");
            setSearchValue("");
            setSuggestions([]);
            inputRef.current?.focus();
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

    const selectSuggestedProduct = async (product, onProductAdded) => {
        try {
            const fullProduct = await productService.lookup(product.id);

            addProductToBill(fullProduct);

            onProductAdded?.(fullProduct.id);
        } catch (error) {
            console.error(error);
        }
    };

    return {
        searchValue,
        products,
        suggestions,
        activeIndex,
        setActiveIndex,

        handleProductSearch,
        handleProductLookup,
        selectSuggestedProduct,

        updateQty,
        updateSellingPrice,
        removeProduct,
        clearSuggestions,
    };
}
