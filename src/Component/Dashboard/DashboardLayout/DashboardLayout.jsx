import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <div className="fixed top-0 bottom-0 left-0 z-50 bg-blue-900">
        <Sidebar />
      </div>
      <div className="flex-1 w-full max-w-full p-3 mx-auto ml-16 overflow-x-hidden md:p-5 lg:p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
