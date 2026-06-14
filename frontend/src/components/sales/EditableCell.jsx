function EditableCell({ value, onChange, inputRef, type = "text" }) {
    return (
        <input
            ref={inputRef}
            type={type}
            value={value}
            onChange={onChange}
            className="
                w-20
                p-2
                rounded
                bg-white/10
                border
                border-white/10
                text-white
                text-center
            "
        />
    );
}

export default EditableCell;
