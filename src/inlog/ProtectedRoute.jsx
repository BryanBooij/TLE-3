import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedLayout() {
    const isAuthenticated = localStorage.getItem("token");

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}