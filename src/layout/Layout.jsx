import {Outlet, useNavigate, useLocation} from "react-router";
import "./Layout.css";
import ButtonMain from "../buttons/ButtonMain.jsx";
import ButtonGreen from "../buttons/ButtonGreen.jsx";

function Layout() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    // Helper function to check if a path is active
    const isActive = (path) => location.pathname === path;

    return (
        <div className="layout-container">
            <header className="layout-header">
                <nav className="layout-nav">
                    <ButtonMain alt="Home" label="Home" onClick={() => navigate("/Home")} isActive={isActive("/Home")} />
                    <ButtonMain alt="Leermodules" label="Leermodules" onClick={() => navigate("/Leermodule")} isActive={isActive("/Leermodule")} />
                    <ButtonMain alt="Quiz" label="Quiz" onClick={() => navigate("/quiz")} isActive={isActive("/quiz")} />
                    <ButtonMain alt="Profile" label="Profile" onClick={() => navigate("/Home")} />
                    <ButtonMain alt="Familie" label="Familie" onClick={() => navigate("/Home")} />
                    <ButtonGreen alt="Logout" label="Logout" onClick={handleLogout} />
                </nav>
            </header>
            <main className="layout-main">
                <Outlet />
            </main>
            <footer className="layout-footer">
                <ButtonMain alt="Footer" label="Footer" onClick={() => navigate("/")} />
            </footer>
        </div>
    );
}

export default Layout;