function LoginInput({
    icon: Icon,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
}) {
    return (
        <div className="relative">
            <Icon
                size={20}
                className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-white
                "
            />

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required
                autoComplete="off"
                className="
                    w-full
                    h-14
                    pl-12
                    pr-4
                    rounded-xl
                    bg-white/10
                    border
                    border-white/30
                    text-white
                    placeholder:text-gray-200
                    outline-none
                    focus:border-white
                    focus:bg-white/15
                    transition-all
                "
            />
        </div>
    );
}

export default LoginInput;
