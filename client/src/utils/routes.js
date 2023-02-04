import { createBrowserRouter } from "react-router-dom";
import { MainPage, CategoryPage, SignsPage } from "../pages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
    },
    {
        path: "/categories",
        element: <CategoryPage />,
    },
    {
        path: "/categories/:categoryid",
        element: <SignsPage />,
    },
]);

export default router;
