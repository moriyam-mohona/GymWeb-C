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
    <div className="p-6  text-white min-h-screen space-y-8">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-center">
        <div>
          <Heading
            title="Dashboard Overview"
            subtitle={`Welcome back, Admin!`}
          />
          <p className=" mt-1"></p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <button className="p-2  rounded-full">
            <FaBell className="text-xl" />
          </button>
          <button className="p-2 rounded-full">
            <FaUserCircle className="text-xl" />
          </button>
        </div>
      </header>

      {/* Stats Cards Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className=" p-6 rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Total Users</h2>
            <p className="text-3xl font-bold mt-2">1,234</p>
            <p className="text-sm mt-1">+5% since last week</p>
          </div>
          <FaUsers className="text-4xl text-orange-500" />
        </div>
        <div className="p-6 rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Tasks Completed</h2>
            <p className="text-3xl font-bold mt-2">78%</p>
            <p className="text-sm  mt-1">+12% since last month</p>
          </div>
          <FaTasks className="text-4xl text-green-500" />
        </div>
        <div className="p-6 rounded-lg shadow-lg flex items-center justify-between">
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
        <div className="p-6 rounded-lg shadow-lg lg:col-span-2">
          <h3 className="text-xl font-semibold border-b pb-4">
            Recent Activities
          </h3>
          <ul className="mt-4 space-y-4">
            <li className="flex justify-between items-center">
              <span>
                User <strong>John Doe</strong> updated their profile.
              </span>
              <span className=" text-sm">2 mins ago</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Admin approved a new user registration.</span>
              <span className="text-sm">15 mins ago</span>
            </li>
            <li className="flex justify-between items-center">
              <span>System maintenance completed successfully.</span>
              <span className="text-sm">1 hour ago</span>
            </li>
          </ul>
        </div>

        {/* Quick Actions */}
        <div className=" p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold border-b pb-4">Quick Actions</h3>
          <div className="mt-4 flex flex-col gap-4">
            <button className="w-full bg-orange-500 py-3 rounded-lg text-white hover:bg-orange-600">
              Add New User
            </button>
            <button className="w-full bg-blue-500 py-3 rounded-lg text-white hover:bg-blue-600">
              Generate Report
            </button>
            <button className="w-full bg-green-500 py-3 rounded-lg text-white hover:bg-green-600">
              Manage Tasks
            </button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="text-center text-sm pt-8">
        &copy; 2024 Admin Dashboard. All rights reserved.
      </footer>
    </div>
  );
};

export default AdminHome;
