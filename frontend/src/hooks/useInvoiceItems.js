import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import invoiceItemService from "../services/invoiceItemService";
import productService from "../services/productService";

import { mapInvoiceItem } from "../mappers/invoiceItemMapper";

export default function useInvoiceItems(invoiceNumber, inputRef) {
    const [products, setProducts] = useState([]);

    const loadItems = async (invoiceNo = invoiceNumber) => {
        try {
            const items = await invoiceItemService.getItems(invoiceNo);

            setProducts(items.map(mapInvoiceItem));
        } catch (e) {
            console.error(e);
        }
    };

    const replaceProducts = (items) => {
        setProducts(items);
    };

    const clearProducts = () => setProducts([]);

    const addProduct = async (productId) => {
        const product = await productService.lookup(productId);

        const savedItem = await invoiceItemService.addItem(
            invoiceNumber,
            product.id
        );
        upsertProduct(savedItem);

        inputRef.current?.focus();

        return product;
    };

    const updateQty = async (productId, qty) => {
        const product = products.find((p) => p.id === productId);

        if (!product) return;

        const savedItem = await invoiceItemService.updateQtyItem(
            product.invoiceItemId,
            qty
        );
        upsertProduct(savedItem);
    };

    const updateSellingPrice = async (productId, price) => {
        const product = products.find((p) => p.id === productId);

        if (!product) return;

        const savedItem = await invoiceItemService.updateSellingPrice(
            product.invoiceItemId,
            price
        );
        upsertProduct(savedItem);
    };

    const removeProduct = async (productId) => {
        const product = products.find((p) => p.id === productId);

        if (!product) return;

        await invoiceItemService.deleteItem(product.invoiceItemId);

        setProducts((previous) => previous.filter((p) => p.id !== productId));
    };

    const upsertProduct = (invoiceItem) => {
        setProducts((previous) => {
            const mapped = mapInvoiceItem(invoiceItem);

            const index = previous.findIndex((p) => p.id === mapped.id);

            if (index === -1) {
                return [...previous, mapped];
            }

            const copy = [...previous];
            copy[index] = mapped;

            return copy;
        });
    };

    return {
        products,

        addProduct,

        updateQty,

        updateSellingPrice,

        removeProduct,

        clearProducts,

        loadItems,
        replaceProducts,
    };
}
