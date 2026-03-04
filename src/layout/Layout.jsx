import {Outlet, useNavigate} from "react-router";
import "./Layout.css";
import ButtonMain from "../buttons/ButtonMain.jsx";
import ButtonHeader from "../buttons/ButtonHeader.jsx";
import ButtonFooter from "../buttons/ButtonFooter.jsx";
import ButtonGreen from "../buttons/ButtonGreen.jsx";

function Layout() {
    const navigate = useNavigate();

    return (
        <div className="layout-container">
            <header className="layout-header">
                <nav className="layout-nav">
                    <ButtonMain alt="Home" label="Home" onClick={() => navigate("/")} />
                    <ButtonMain alt="Leermodules" label="Leermodules" onClick={() => navigate("/")} />
                    <ButtonMain alt="Quiz" label="Quiz" onClick={() => navigate("/")} />
                    <ButtonGreen alt="Profile" label="Profile" onClick={() => navigate("/")} />
                    <ButtonHeader alt="Familie" label="Familie" onClick={() => navigate("/")} />
                </nav>
            </header>
            <main className="layout-main">
                <Outlet />
            </main>
            <footer className="layout-footer">
                <ButtonFooter alt="Footer" label="Footer" onClick={() => navigate("/")} />
            </footer>
        </div>
    );
}

export default Layout;