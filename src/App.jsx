import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./Home.jsx";
import NotFound from "./404/NotFound.jsx";
import Layout from "./layout/Layout.jsx";
import LeermoduleAdmin from "./LeermoduleAdmin.jsx";
import QuizPage from "./quiz-data/QuizPage.jsx";
import './App.css'
import Results from "./quiz-data/Results.jsx";

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
                path: "/QuizPage",
                element: <QuizPage/>,
            },
            {
                path: "/quiz/results",
                element: <Results/>
            },
            {
                path: "/quiz",
                element: <QuizPage/>
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