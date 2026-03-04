import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./Home.jsx";
import NotFound from "./404/NotFound.jsx";
import Layout from "./layout/Layout.jsx";
import LeermoduleAdmin from "./LeermoduleAdmin.jsx";
import Navigation from "./Navigation.jsx";
import './App.css'

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/leermodule",
                element: <LeermoduleAdmin/>
            },
            {
                path: "*",
                element: <NotFound/>,
            }
        ],
    },
]);
function App() {
    return <RouterProvider router={router} />;
}

export default App
