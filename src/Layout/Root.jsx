import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Component/Navbar/Navbar";
import Footer from "../Component/Footer/Footer";

const Root = () => {
  const location = useLocation();

  const noHeaderFooter =
    location.pathname.includes("Login") || location.pathname.includes("SignUp");
  return (
    <div className="overflow-x-hidden">
      {/* {noHeaderFooter || <Navbar />} */}

      {/* Outlet  */}

      <Outlet />

      {noHeaderFooter || <Footer />}
    </div>
  );
};

export default Root;
