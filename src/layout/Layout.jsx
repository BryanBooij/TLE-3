import {Outlet, useNavigate} from "react-router";
import "./Layout.css";
import ButtonMain from "../buttons/ButtonMain.jsx";
import ButtonGreen from "../buttons/ButtonGreen.jsx";

function Layout() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="layout-container">
            <header className="layout-header">
                <nav className="layout-nav">
                    <ButtonMain alt="Home" label="Home" onClick={() => navigate("/Home")} />
                    <ButtonMain alt="Leermodules" label="Leermodules" onClick={() => navigate("/Leermodule")} />
                    <ButtonMain alt="Quiz" label="Quiz" onClick={() => navigate("/QuizPage")} />
                    <ButtonMain alt="Profile" label="Profile" onClick={() => navigate("/")} />
                    <ButtonMain alt="Familie" label="Familie" onClick={() => navigate("/")} />
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