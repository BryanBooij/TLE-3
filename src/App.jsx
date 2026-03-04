import {createBrowserRouter, RouterProvider} from "react-router";
import LeermoduleAdmin from "./LeermoduleAdmin.jsx";
import Navigation from "./Navigation.jsx";

import './App.css'

    const router = createBrowserRouter([
        {
            element: <Navigation/>,
            children: [
                {
                    //path: "/home",
                    //element: <Home/>,//either remove or make a home page for admin
                },
                {
                    path: "/leermodule",
                    element: <LeermoduleAdmin/>
                },
                {
                    //path: "/users",
                    //element: <UsersAdmin/>, //change this to the right page
                },
            ],
        },
    ]);

    function App() {
        return <RouterProvider router={router}/>;
    }

export default App