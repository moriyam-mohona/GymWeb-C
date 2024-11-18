import React from "react";
import {
  FaUserCircle,
  FaUsers,
  FaChartLine,
  FaTasks,
  FaBell,
} from "react-icons/fa";
import Heading from "../../../../SubComponents/Heading";

const AdminHome = () => {
  return (
    <div className=" text-white min-h-screen space-y-8">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start">
        <Heading title="Dashboard Overview" subtitle={`Welcome back!`} />
        <div className="hidden md:flex items-center gap-2 mt-4 md:mt-0">
          <button className="p-2  rounded-full">
            <FaBell className="text-xl" />
          </button>
          <button className="p-2 rounded-full">
            <FaUserCircle className="text-2xl" />
          </button>
        </div>
      </header>

      {/* Stats Cards Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className=" p-6 rounded-lg shadow-lg flex items-center justify-between border bg-black/70 hover:bg-orange hover:scale-105">
          <div>
            <h2 className="text-xl font-semibold">Total Users</h2>
            <p className="text-3xl font-bold mt-2">1,234</p>
            <p className="text-sm mt-1">+5% since last week</p>
          </div>
          <FaUsers className="text-4xl text-orange-500" />
        </div>
        <div className="p-6 rounded-lg shadow-lg flex items-center justify-between border bg-black/70 hover:bg-orange hover:scale-105">
          <div>
            <h2 className="text-xl font-semibold">Tasks Completed</h2>
            <p className="text-3xl font-bold mt-2">78%</p>
            <p className="text-sm  mt-1">+12% since last month</p>
          </div>
          <FaTasks className="text-4xl text-green-500" />
        </div>
        <div className="p-6 rounded-lg shadow-lg flex items-center justify-between border bg-black/70 hover:bg-orange hover:scale-105 ">
          <div>
            <h2 className="text-xl font-semibold">Active Sessions</h2>
            <p className="text-3xl font-bold mt-2">45</p>
            <p className="text-sm mt-1">Real-time activity</p>
          </div>
          <FaChartLine className="text-4xl text-blue-500" />
        </div>
      </section>

      {/* Main Content Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="p-6 rounded-lg shadow-lg lg:col-span-2 border">
          <h3 className="text-xl font-semibold border-b-2 rounded mb-6">
            Recent Activities
          </h3>
          <ul className="mt-4 space-y-4">
            <li className="flex justify-between items-center border-b bg-black/70 hover:bg-orange p-3 rounded">
              <span>
                User <strong>John Doe</strong> updated their profile.
              </span>
              <span className=" text-sm">2 mins ago</span>
            </li>
            <li className="flex justify-between items-center border-b bg-black/70 hover:bg-orange p-3 rounded">
              <span>Admin approved a new user registration.</span>
              <span className="text-sm">15 mins ago</span>
            </li>
            <li className="flex justify-between items-center border-b bg-black/70 hover:bg-orange p-3 rounded">
              <span>System maintenance completed successfully.</span>
              <span className="text-sm">1 hour ago</span>
            </li>
          </ul>
        </div>

        {/* Quick Actions */}
        <div className=" p-6 rounded-lg shadow-lg border">
          <h3 className="text-xl font-semibold border-b-2 rounded mb-6">
            Quick Actions
          </h3>
          <div className="mt-4 flex flex-col items-start gap-4">
            <button className="w-full border py-3 rounded-lg text-white hover:bg-orange">
              Add New User
            </button>
            <button className="w-full border py-3 rounded-lg text-white hover:bg-blue">
              Generate Report
            </button>
            <button className="w-full border  py-3 rounded-lg text-white hover:bg-green">
              Manage Tasks
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminHome;
