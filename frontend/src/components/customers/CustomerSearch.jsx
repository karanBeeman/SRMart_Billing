import { Search } from "lucide-react";

function CustomerSearch({ onSearch }) {
    return (
        <div
            className="
                relative
                mb-6
            "
        >
            <Search
                className="
                    absolute
                    top-4
                    left-4
                    text-white
                "
            />

            <input
                placeholder="Search customer by name or phone"
                onChange={onSearch}
                className="
                    w-full
                    pl-12
                    py-4
                    rounded-xl
                    bg-white/10
                    border
                    border-white/20
                    text-white
                    placeholder:text-gray-300
                    outline-none
                "
            />
        </div>
    );
}

export default CustomerSearch;
