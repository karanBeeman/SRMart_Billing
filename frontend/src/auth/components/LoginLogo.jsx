import { ShoppingCart } from "lucide-react";

function LoginLogo() {
    return (
        <div className="flex flex-col items-center mb-10">
            <ShoppingCart size={64} color="white" strokeWidth={1.7} />

            <h1 className="mt-3 text-4xl font-extrabold tracking-wide text-white">
                SR MART
            </h1>

            <p className="mt-1 text-sm text-white/70">
                Billing & Inventory System
            </p>
        </div>
    );
}

export default LoginLogo;
