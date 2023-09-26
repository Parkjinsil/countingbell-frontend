import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Header from "./components/Header";
import Header2 from "./components/Header2";

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
  // {
  //   path: "login",
  //   element: <Layout header={<Header2 />} />,
  //   children: [
  // {
  //   index: true,
  //   element: <Login />,
  // },
  //   ],
  // },
  {
    path: "login",
    element: <Login />,
  },
]);
export default router;
