import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./Home.jsx";
import NotFound from "./404/NotFound.jsx";
import Layout from "./layout/Layout.jsx";
import LeermoduleAdmin from "./leermodule/LeermoduleAdmin.jsx";
import QuizPage from "./quiz-data/QuizPage.jsx";
import Categories from "./quiz-data/Categories.jsx";
import Login from "./inlog/Login.jsx";
import ProtectedRoute from "./inlog/ProtectedRoute.jsx";
import './App.css'
import Results from "./quiz-data/Results.jsx";
import UserOverview from "./usersOverview_A/usersOverview.jsx";
import Talk from "./quiz-data/Talk.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Login/>,
    },
    {
        element: <ProtectedRoute/>,
        children: [
            {
                element: <Layout/>,
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
                        path: "/quiz/talk",
                        element: <Talk/>
                    },
                    {
                        path: "/quiz/results",
                        element: <Results/>
                    },
                    {
                        path: "/quiz/start",
                        element: <QuizPage/>
                    },
                    {
                        path: "/quiz",
                        element: <Categories/>
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
        ],
    },
]);
function App() {
    return <RouterProvider router={router} />;
}

export default App