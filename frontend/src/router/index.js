
import {
    createBrowserRouter
} from "react-router-dom";
import PageLayout from "../components/Layout";
import Home from "../components/Home";

const router = createBrowserRouter([
    {
        element: <PageLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
        ],
    },
]);

export default router;