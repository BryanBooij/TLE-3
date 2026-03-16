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
import CreateLeermodule from "./leermodule/CreateLeermodule.jsx";
import DetailsLeermodule from "./leermodule/DetailsLeermodule.jsx";
import UpdateLeermodule from "./leermodule/UpdateLeermodule.jsx";
import Talk from "./quiz-data/Talk.jsx";
import Profile from "./profile/Profile.jsx";
import Family from "./family/Family.jsx";
import FamilyProfiles from "./family/FamilyProfiles.jsx";


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
                        path: "/Leermodule/create",
                        element: <CreateLeermodule/>
                    },
                    {
                        path: "/Leermodule/details/:id",
                        element: <DetailsLeermodule/>
                    },
                    {
                        path: "/Leermodule/update/:id",
                        element: <UpdateLeermodule/>
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
                    },
                    {
                        path:"/Profile",
                        element: <Profile/>
                    },
                    {
                        path:"/Family",
                        element: <Family/>
                    },
                    {
                        path: "/Family/Profiles/:id",
                        element: <FamilyProfiles/>
                    },
                ],
            },
        ],
    },
]);
function App() {
    return <RouterProvider router={router} />;
}

export default App