import { useRef, useState } from "react";
import productService from "../services/productService";

export default function useProductSearch() {
    const [searchValue, setSearchValue] = useState("");

    const [suggestions, setSuggestions] = useState([]);

    const [activeIndex, setActiveIndex] = useState(-1);

    const timer = useRef();

    const clearSuggestions = () => {
        setSuggestions([]);
        setActiveIndex(-1);
    };

    const handleSearch = (value) => {
        setSearchValue(value);

        const text = value.trim();

        if (!text || /^\d+$/.test(text) || text.length < 3) {
            clearSuggestions();
            return;
        }

        clearTimeout(timer.current);

        timer.current = setTimeout(async () => {
            try {
                const result = await productService.search(text);

                setSuggestions(result ?? []);

                setActiveIndex(result.length ? 0 : -1);
            } catch {
                clearSuggestions();
            }
        }, 300);
    };

    return {
        searchValue,
        suggestions,
        activeIndex,

        setActiveIndex,

        handleSearch,

        setSearchValue,

        clearSuggestions,
    };
}
