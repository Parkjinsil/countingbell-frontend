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
    path: "register",
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
    path: "Reservation",
    element: <Layout header={<Header />} />,
    children: [
      {
        index: true,
        element: <Reservation />,
      },
    ],
  },
]);
