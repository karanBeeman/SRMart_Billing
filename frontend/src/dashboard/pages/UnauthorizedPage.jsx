import { ShieldAlert } from "lucide-react";
import {useAuth} from "../../auth/hooks/useAuth.js";

function UnauthorizedPage() {
    return (
        <div
            className="
                min-h-screen
                bg-[#2347D9]
                flex
                flex-col
                justify-center
                items-center
                text-white
            "
        >
            <ShieldAlert size={80} />

            <h1
                className="
                    text-4xl
                    font-bold
                    mt-5
                "
            >
                Access Denied
            </h1>

            <p>You don't have permission to access this page.</p>
        </div>
    );
}

export default UnauthorizedPage;
