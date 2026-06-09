function LoginError({ error }) {
    if (!error) {
        return null;
    }

    return (
        <div
            className="
                bg-red-500/90
                text-white
                text-sm
                text-center
                py-3
                px-4
                rounded-xl
            "
        >
            {error}
        </div>
    );
}

export default LoginError;
