import { createBrowserRouter } from "react-router-dom";
import { MainPage, CategoryPage, SignsPage, LangindPage } from "../pages";
import { MainPageLayout } from "../layouts";

const router = createBrowserRouter([
    // {
    //     path: "/",
    //     element: <MainPage />,
    // },
    // {
    //     path: "/",
    //     element: <CategoryPage />,
    // },
    // {
    //     path: "/categories/:categoryid",
    //     element: <SignsPage />,
    // },
    // {
    //     path: "/",
    //     element: <LangindPage />,
    // },
    {
        path: "/",
        element: (
            <MainPageLayout>
                <CategoryPage />
            </MainPageLayout>
        ),
    },
]);

export default router;
