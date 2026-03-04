import {Outlet, useNavigate} from "react-router";
import "./Layout.css";
import ButtonMain from "./buttons/ButtonMain.jsx";

function Layout() {
    const navigate = useNavigate();

    return (
        <div className="layout-container">
            <header className="layout-header">
                <nav className="layout-nav">
                    <ButtonMain label="Home" onClick={() => navigate("/")} />
                    <ButtonMain label="Leermodules" onClick={() => navigate("/")} />
                    <ButtonMain label="Quiz" onClick={() => navigate("/")} />
                    <ButtonMain label="Profile" onClick={() => navigate("/")} />
                    <ButtonMain label="Familie" onClick={() => navigate("/")} />
                </nav>
            </header>
            <main className="layout-main">
                <Outlet />
            </main>
            <footer className="layout-footer">Footer</footer>
        </div>
    );
}

export default Layout;