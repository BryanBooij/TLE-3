import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./Home.jsx";
import NotFound from "./404/NotFound.jsx";
import Layout from "./layout/Layout.jsx";
import LeermoduleAdmin from "./leermodule/LeermoduleAdmin.jsx";
import QuizPage from "./quiz-data/QuizPage.jsx";
import './App.css'
import userOverview from "./usersOverview_A/usersOverview.jsx";
import UserOverview from "./usersOverview_A/usersOverview.jsx";

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
                path: "*",
                element: <NotFound/>,
            },
            {
                path:"/userOverview",
                element: <UserOverview/>
            }
        ],
    },
]);
function App() {
    return <RouterProvider router={router} />;
}

export default App
