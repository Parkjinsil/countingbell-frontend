import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Header from "./components/Header";
import Header2 from "./components/Header2";
import Register from "./pages/member/Register";
import Find from "./pages/Find";
import RecentList from "./pages/RecentList";
import Menu from "./pages/Menu";
import RestaurantList from "./pages/RestaurantList";
import Restaurant from "./pages/Restaurant";
import ReservationCom from "./pages/ReservationCom";
import Reservation from "./pages/reservation/Reservation";
import Waiting from "./pages/Waiting";
import ResSearch from "./pages/search/ResSearch";
import MyPage from "./pages/MyPage";
import Discount from "./pages/discount/Discount";
import DiscountBoard from "./pages/discount/DiscountBoard";
import Pick from "./pages/Pick";
import AddMenu from "./pages/menus/AddMenu";
import MenuBoard from "./pages/menus/MenuBoard";
import MenuUpdate from "./pages/menus/MenuUpdate";
import AddRestaurant from "./pages/restaurants/AddRestaurant";
import LocationBoard from "./pages/location/LocationBoard";
import AddPhoto from "./pages/photo/AddPhoto";
import LocationResList from "./pages/location/LocationResList";
import LocationList from "./pages/location/LocationList";
import FoodTypeList from "./pages/food/FoodTypeList";
import FoodResList from "./pages/food/FoodResList";
import AddReview from "./pages/review/AddReview";
import MemberUpdate from "./pages/member/MemberUpdate";
import ReservationResList from "./pages/reservation/ReservationResList";
import Reser from "./pages/reser/Reser";
import ReserList from "./pages/reser/ReserList";
import ReviewList from "./pages/review/ReviewList";
import ResIdBoard from "./pages/restaurants/ResIdBoard";
import SearchByResName from "./pages/search/SearchByResName";

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
    path: "memberUpdate/:id",
    element: <Layout header={<Header2 />} />,
    children: [
      {
        index: true,
        element: <MemberUpdate />,
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
    path: "foodList",
    element: <Layout header={<Header2 />} />,
    children: [
      {
        index: true,
        element: <FoodTypeList />,
      },
    ],
  },
  {
    path: "foodResList/:foodCode",
    element: <Layout header={<Header2 />} />,
    children: [
      {
        index: true,
        element: <FoodResList />,
      },
    ],
  },
  {
    path: "location",
    element: <Layout header={<Header2 />} />,
    children: [
      {
        index: true,
        element: <LocationBoard />,
      },
    ],
  },
  {
    path: "locationList",
    element: <Layout header={<Header2 />} />,
    children: [
      {
        index: true,
        element: <LocationList />,
      },
    ],
  },
  {
    path: "locationResList/:localCode",
    element: <Layout header={<Header2 />} />,
    children: [
      {
        index: true,
        element: <LocationResList />,
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
    path: "restaurant/:resCode/addReview",
    children: [
      {
        index: true,
        element: <AddReview />,
      },
    ],
  },
  // {
  //   path: "review",
  //   element: <Layout header={<Header2 />} />,
  //   children: [
  //     {
  //       index: true,
  //       element: <Review />,
  //     },
  //   ],
  // },
  {
    path: "restaurant/:resCode",
    element: <Layout header={<Header2 />} />,
    children: [
      {
        index: true,
        element: <Restaurant />,
      },
    ],
  },
  {
    path: "ReserList/:id",
    children: [
      {
        index: true,
        element: <ReserList />,
      },
    ],
  },
  {
    path: "resIdBoard/:id",
    element: <Layout header={<Header2 />} />,
    children: [
      {
        index: true,
        element: <ResIdBoard />,
      },
    ],
  },
  {
    path: "restaurant/:resCode/reser",
    children: [
      {
        index: true,
        element: <Reser />,
      },
    ],
  },
  {
    path: "ReviewList/:id",
    element: <Layout header={<Header2 />} />,
    children: [
      {
        index: true,
        element: <ReviewList />,
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
    path: "resSearch/:keyword",
    element: <Layout header={<Header2 />} />,
    children: [
      {
        index: true,
        element: <ResSearch />,
      },
    ],
  },
  {
    path: "searchByResName/:keyword",
    element: <Layout header={<Header2 />} />,
    children: [
      {
        index: true,
        element: <SearchByResName />,
      },
    ],
  },
  {
    path: "discount",
    element: <Layout header={<Header2 />} />,
    children: [
      {
        index: true,
        element: <Discount />,
      },
    ],
  },
  {
    path: "discountboard",
    element: <Layout header={<Header2 />} />,
    children: [
      {
        index: true,
        element: <DiscountBoard />,
      },
    ],
  },
  {
    path: "pick",
    element: <Layout header={<Header2 />} />,
    children: [
      {
        index: true,
        element: <Pick />,
      },
    ],
  },
  {
    path: "myPage/:id",
    element: <Layout header={<Header2 />} />,
    children: [
      {
        index: true,
        element: <MyPage />,
      },
    ],
  },
  {
    path: "addmenu/:resCode",
    element: <Layout header={<Header2 />} />,
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
    path: "menuboard/:resCode",
    element: <Layout header={<Header2 />} />,
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
      },
    ],
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
    path: "reservationResList/:foodCode/:localCode",
    element: <Layout header={<Header2 />} />,
    children: [
      {
        index: true,
        element: <ReservationResList />,
      },
    ],
  },
]);

export default router;
