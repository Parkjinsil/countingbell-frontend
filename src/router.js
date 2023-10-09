import { createBrowserRouter } from "react-router-dom";
import Restaurant from "./pages/Restaurant";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import ReservationCom from "./pages/ReservationCom";
import Review from "./pages/Review";

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
      {
        path: "review",
        element: <Review />,
      },
    ],
  },
  {
    path: "/reservationcom",
    element: <ReservationCom />,
  },
]);

export default router;
