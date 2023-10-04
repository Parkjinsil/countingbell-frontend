import { createBrowserRouter } from "react-router-dom";
import Restaurant from "./pages/Restaurant";

const router = createBrowserRouter([
    {
        path: "/restaurant",
        element: <Restaurant />
    },
]);

export default router;