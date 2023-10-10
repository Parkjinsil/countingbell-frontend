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
]);
export default router;
