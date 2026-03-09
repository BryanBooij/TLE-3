import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./Home.jsx";
import NotFound from "./404/NotFound.jsx";
import Layout from "./layout/Layout.jsx";
import LeermoduleAdmin from "./LeermoduleAdmin.jsx";
import QuizPage from "./quiz-data/QuizPage.jsx";
import Login from "./inlog/Login.jsx";
import ProtectedRoute from "./inlog/ProtectedRoute.jsx";
import './App.css'

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Login/>,
            },
            {
                element: <ProtectedRoute/>,
                children: [
                    {
                        path: "/Home",
                        element: <Home/>,
                    },
                    {
                        path: "/Leermodule",
                        element: <LeermoduleAdmin/>
                    },
                    {
                        path: "/QuizPage",
                        element: <QuizPage/>,
                    },
                    {
                        path: "*",
                        element: <NotFound/>,
                    },
                ],
            }

        ],
    },
]);
function App() {
    return <RouterProvider router={router} />;
}

export default App
