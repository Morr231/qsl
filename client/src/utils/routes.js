import { createBrowserRouter } from "react-router-dom";
import { MainPage, CategoryPage } from "../pages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
    },
    {
        path: "/:categoryname",
        element: <CategoryPage />,
    },
]);

export default router;
