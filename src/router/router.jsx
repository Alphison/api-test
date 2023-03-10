import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Request from "../pages/Request";
import Root from "../pages/Root";
import Single from "../pages/Single";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Home />,
                index: true
            },
            {
                path: '/single/:id',
                element: <Single />
            },
            {
                path: '/request',
                element: <Request />
            }
        ]
    }
])

export default router