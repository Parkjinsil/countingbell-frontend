import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Header from "./components/Header";
import Header2 from "./components/Header2";
import Register from "./pages/Register";
import Find from "./pages/Find";
import RecentList from "./pages/RecentList";
import Menu from "./pages/Menu";
import RestaurantList from "./pages/RestaurantList";
import Restaurant from "./pages/Restaurant";
import ReservationCom from "./pages/ReservationCom";
import Review from "./pages/Review";
import Reservation from "./pages/Reservation";
import Waiting from "./pages/Waiting";
import ResSearch from "./pages/ResSearch";
import MyPage from "./pages/MyPage";
import AddMenu from "./pages/menus/AddMenu";
import MenuBoard from "./pages/menus/MenuBoard";
import MenuUpdate from "./pages/menus/MenuUpdate";
import AddRestaurant from "./pages/restaurants/AddRestaurant";
import LocationBoard from "./pages/location/LocationBoard";
import AddPhoto from "./pages/photo/AddPhoto";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout header={<Header />} />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "signup",
    element: <Layout header={<Header2 />} />,
    children: [
      {
        index: true,
        element: <Register />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "find",
    element: <Layout header={<Header2 />} />,
    children: [
      {
        index: true,
        element: <Find />,
      },
    ],
  },
  {
    path: "recentList",
    element: <Layout header={<Header2 />} />,
    children: [
      {
        index: true,
        element: <RecentList />,
      },
    ],
  },
  {
    path: "menu",
    element: <Layout header={<Header2 />} />,
    children: [
      {
        index: true,
        element: <Menu />,
      },
    ],
  },
  {
    path: "restaurantList",
    element: <Layout header={<Header2 />} />,
    children: [
      {
        index: true,
        element: <RestaurantList />,
      },
    ],
  },
  {
    path: "reservationcom",
    element: <Layout header={<Header2 />} />,
    children: [
      {
        index: true,
        element: <ReservationCom />,
      },
    ],
  },
  {
    path: "review",
    element: <Layout header={<Header2 />} />,
    children: [
      {
        index: true,
        element: <Review />,
      },
    ],
  },
  {
    path: "restaurant",
    element: <Layout header={<Header2 />} />,
    children: [
      {
        index: true,
        element: <Restaurant />,
      },
    ],
  },
  {
    path: "reservation",
    element: <Layout header={<Header2 />} />,
    children: [
      {
        index: true,
        element: <Reservation />,
      },
    ],
  },

  {
    path: "waiting",
    element: <Layout header={<Header2 />} />,
    children: [
      {
        index: true,
        element: <Waiting />,
      },
      {
        index: true,
        element: <ResSearch />,
      },
    ],
  },
  {
    path: "myPage",
    children: [
      {
        index: true,
        element: <MyPage />,
      },
    ],
  },
  {
    path: "addmenu",
    children: [
      {
        index: true,
        element: <AddMenu />,
      },
    ],
  },
  {
    path: "updatemenu",
    children: [
      {
        index: true,
        element: <MenuUpdate />,
      },
    ],
  },
  {
    path: "menuboard",
    children: [
      {
        index: true,
        element: <MenuBoard />,
      },
    ],
  },
  {
    path: "addRestaurant",
    children: [
      {
        index: true,
        element: <AddRestaurant />,
      }
    ]
  },
  {
    path: "location",
    children: [
      {
        index: true,
        element: <LocationBoard />,
      },
    ],
  },
  {
    path: "addPhoto",
    children: [
      {
        index: true,
        element: <AddPhoto />,
      },
    ],
  },
]);
export default router;
