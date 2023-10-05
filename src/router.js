import { createBrowserRouter } from "react-router-dom";
import Restaurant from "./pages/Restaurant";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <Restaurant />,
            },
       
      ],
    },
]);

export default router;