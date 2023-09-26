import { Outlet } from "react-router-dom";

const Layout = ({ header, children }) => {
  return (
    <>
      {header}
      <Outlet />
    </>
  );
};
export default Layout;
