import { createBrowserRouter } from "react-router-dom";
import Menu from "./pages/Menu";
import RestaurantList from "./pages/RestaurantList";

const router = createBrowserRouter([
    {
        path: "menu",
        // element: <Layout header={<Header2 />} />,
        children: [
          {
            index: true,
            element: <Menu />,
          },
        ],
    },
    {
      path: "restaurantList",
      // element: <Layout header={<Header2 />} />,
      children: [
        {
          index: true,
          element: <RestaurantList />,
        },
      ],
    },
]);
export default router;