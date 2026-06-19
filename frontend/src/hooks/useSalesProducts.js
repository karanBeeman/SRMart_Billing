import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import productService from "../services/productService";
import invoiceItemService from "../api/invoiceItemService";

export default function useSalesProducts(inputRef, invoiceNumber) {
    useEffect(() => {
        if (!invoiceNumber) {
            return;
        }

        loadInvoiceItems();
    }, [invoiceNumber]);

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

    const loadInvoiceItems = async () => {
        try {
            const response = await invoiceItemService.getItems(invoiceNumber);

            const items = response.data || [];

            setProducts(
                items.map((item) => ({
                    id: item.productId,

                    invoiceItemId: item.id,

                    productName: item.productName,

                    qty: item.qty,

                    mrpPrice: item.mrpPrice,

                    sellingPrice: item.sellingPrice,

                    cgstPercentage: item.cgstPercentage,

                    sgstPercentage: item.sgstPercentage,

                    stockQuantity: item.stockQuantity,

                    total: item.lineTotal,
                }))
            );
        } catch (error) {
            console.error(error);
        }
    };

    const addProductToState = (product, savedItem) => {
        console.log("saved", savedItem);
        setProducts((previous) => {
            const existing = previous.find((item) => item.id === product.id);

            if (existing) {
                console.log(
                    "existing item",
                    existing,
                    "product.id",
                    product.id
                );
                return previous.map((item) =>
                    item.id === product.id
                        ? {
                              ...item,
                              qty: savedItem.qty,
                              total: savedItem.lineTotal,
                          }
                        : item
                );
            }

            return [
                ...previous,
                {
                    id: product.id,

                    invoiceItemId: savedItem.id,

                    productName: product.productName,

                    qty: savedItem.qty,

                    mrpPrice: product.mrpPrice,

                    sellingPrice: product.sellingPrice,

                    cgstPercentage: product.cgstPercentage,

                    sgstPercentage: product.sgstPercentage,

                    stockQuantity: product.stockQuantity,

                    total: savedItem.lineTotal,
                },
            ];
        });
    };

    const handleProductLookup = async () => {
        if (!searchValue.trim()) {
            return;
        }

        try {
            const product = await productService.lookup(searchValue);

            const response = await invoiceItemService.addItem(
                invoiceNumber,
                product.id
            );
            console.log("saved item", response.data);

            console.log("api response", response.data);

            addProductToState(product, response.data);

            setSearchValue("");
            clearSuggestions();

            inputRef.current?.focus();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Product not found");
        }
    };

    const updateSellingPrice = async (productId, newPrice) => {
        const product = products.find((p) => p.id === productId);

        if (!product) {
            return;
        }

        try {
            const response = await invoiceItemService.updateItem(
                product.invoiceItemId,
                product.qty,
                newPrice
            );

            const updated = response.data;

            setProducts((previous) =>
                previous.map((item) =>
                    item.id === productId
                        ? {
                              ...item,
                              sellingPrice: updated.sellingPrice,
                              total: updated.lineTotal,
                          }
                        : item
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    const updateQty = async (productId, qty) => {
        const product = products.find((p) => p.id === productId);

        if (!product) {
            return;
        }

        try {
            const response = await invoiceItemService.updateItem(
                product.invoiceItemId,
                qty,
                product.sellingPrice
            );

            const updated = response.data;

            setProducts((previous) =>
                previous.map((item) =>
                    item.id === productId
                        ? {
                              ...item,
                              qty: updated.qty,
                              total: updated.lineTotal,
                          }
                        : item
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    const removeProduct = async (productId) => {
        const product = products.find((p) => p.id === productId);

        if (!product) {
            return;
        }

        try {
            await invoiceItemService.deleteItem(product.invoiceItemId);

            setProducts((previous) =>
                previous.filter((item) => item.id !== productId)
            );
        } catch (error) {
            console.error(error);
        }
    };

    const selectSuggestedProduct = async (product, onProductAdded) => {
        try {
            const fullProduct = await productService.lookup(product.id);

            const response = await invoiceItemService.addItem(
                invoiceNumber,
                fullProduct.id
            );

            console.log("api", response.data);

            addProductToState(fullProduct, response.data);

            setSearchValue("");
            clearSuggestions();

            onProductAdded?.(fullProduct.id);

            inputRef.current?.focus();
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
