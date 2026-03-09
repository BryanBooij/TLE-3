import {Link, Outlet} from "react-router";
function Navigation() {
    return (
        <>
            <header>
                <nav>
                    <Link to={'/leermodule'}>Leermodules</Link>
                </nav>
            </header>
            <main>
                <Outlet/>
            </main>
        </>
    )
}

export default Navigation
