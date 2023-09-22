import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />, // 에러페이지 지정
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);
export default router;
