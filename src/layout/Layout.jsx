import {Outlet, useNavigate, useLocation} from "react-router";
import "./Layout.css";
import ButtonMain from "../buttons/ButtonMain.jsx";
import ButtonGreen from "../buttons/ButtonGreen.jsx";
import BigButton from "../buttons/BigButton.jsx";

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
                    <BigButton alt="Home" label="Home" onClick={() => navigate("/Home")} isActive={isActive("/Home")} />
                    <BigButton alt="Leermodules" label="Leermodules" onClick={() => navigate("/Leermodule")} isActive={isActive("/Leermodule")} />
                    {/*<BigButton alt="Quiz" label="Quiz" onClick={() => navigate("/quiz")} isActive={isActive("/quiz")} />*/}
                    <BigButton alt="Familie" label="Familie" onClick={() => navigate("/Family")} />
                    <BigButton alt="Profile" label="Profile" onClick={() => navigate("/Profile")} />
                    <BigButton alt="Logout" label="Logout" onClick={handleLogout} />
                </nav>
            </header>
            <main className="layout-main">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;