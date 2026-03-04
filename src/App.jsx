import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./Home.jsx";
import NotFound from "./NotFound.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "*",
        element: <NotFound />,
    }
]);
function App() {
    return <RouterProvider router={router} />;
}

export default App
