import LoginForm from "../components/LoginForm";
import AppBackground from "../../shared/AppBackground.jsx";

function LoginPage() {
    return (
        <AppBackground>
            <div className="min-h-screen flex items-center justify-center">
                <LoginForm />
            </div>
        </AppBackground>
    );
}

export default LoginPage;
