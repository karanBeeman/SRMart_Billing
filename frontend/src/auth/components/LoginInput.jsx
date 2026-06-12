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
    text-cyan-300
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

    bg-slate-900/50

    border
    border-blue-500/20

    text-white
    placeholder:text-slate-400

    outline-none

    focus:border-cyan-400
    focus:ring-2
    focus:ring-cyan-500/20

    transition-all
                "
            />
        </div>
    );
}

export default LoginInput;
