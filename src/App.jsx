import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./Home.jsx";
import NotFound from "./404/NotFound.jsx";
import Layout from "./Layout.jsx";

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home/>,
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
