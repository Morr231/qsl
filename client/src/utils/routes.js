import { createBrowserRouter } from "react-router-dom";
import { MainPage, CategoryPage, SignsPage, LandingPage } from "../pages";

const router = createBrowserRouter([
    // {
    //     path: "/",
    //     element: <MainPage />,
    // },
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/categories/:categoryid",
        element: <SignsPage />,
    },
]);

export default router;
