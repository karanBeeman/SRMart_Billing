import { toast } from "react-toastify";

import useInvoiceItems from "./useInvoiceItems";
import useProductSearch from "./useProductSearch";

export default function useSalesProducts(inputRef, invoiceNumber) {
    const search = useProductSearch();

    const items = useInvoiceItems(invoiceNumber, inputRef);

    const handleProductLookup = async () => {
        if (!search.searchValue.trim()) {
            return;
        }

        try {
            await items.addProduct(search.searchValue);

            search.setSearchValue("");

            search.clearSuggestions();
        } catch (error) {
            toast.error(error.response?.data?.message ?? "Product not found");
        }
    };

    const selectSuggestedProduct = async (product, callback) => {
        try {
            await items.addProduct(product.id);

            search.setSearchValue("");

            search.clearSuggestions();

            callback?.(product.id);
        } catch (e) {
            console.error(e);
        }
    };

    return {
        searchValue: search.searchValue,

        products: items.products,

        suggestions: search.suggestions,

        activeIndex: search.activeIndex,

        setActiveIndex: search.setActiveIndex,

        handleProductSearch: search.handleSearch,

        handleProductLookup,

        selectSuggestedProduct,

        updateQty: items.updateQty,

        updateSellingPrice: items.updateSellingPrice,

        removeProduct: items.removeProduct,

        clearSuggestions: search.clearSuggestions,

        clearProducts: items.clearProducts,

        replaceProducts: items.replaceProducts,
    };
}
