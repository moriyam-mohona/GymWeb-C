import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaBars, FaHome, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import {
  MdAddTask,
  MdEventNote,
  MdLibraryAdd,
  MdManageAccounts,
} from "react-icons/md";
import { GoPersonFill } from "react-icons/go";
import { LuBookPlus } from "react-icons/lu";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Sidebar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosSecure.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    if (user) {
      const fetchedRole = getUserRole(user.email);
      setRole(fetchedRole);
    }
  }, [user, users]);

  const getUserRole = (userEmail) => {
    const foundUser = users.find((user) => user.Email === userEmail);
    return foundUser ? foundUser.Role : "Undefined";
  };

  const { pathname } = useLocation();

  const adminNavItems = [
    { name: "Dashboard", path: "/Dashboard", icon: <FaHome /> },
    {
      name: "Manage-Trainers",
      path: "Manage-Trainers",
      icon: <MdManageAccounts />,
    },
    { name: "Admin-Profile", path: "Admin-Profile", icon: <GoPersonFill /> },
    {
      name: "Trainer-Request",
      path: "Trainer-Request",
      icon: <MdLibraryAdd />,
    },
    { name: "Manage-Class", path: "Manage-Class", icon: <MdAddTask /> },
  ];

  const trainerNavItems = [
    {
      name: "Trainer-Profile",
      path: "Trainer-Profile",
      icon: <GoPersonFill />,
    },
    {
      name: "Assigned-Schedule",
      path: "Assigned-Schedule",
      icon: <MdEventNote />,
    },
    { name: "Book-Schedule", path: "Book-Schedule", icon: <LuBookPlus /> },
  ];

  const traineeNavItems = [
    {
      name: "Trainee-Profile",
      path: "Trainee-Profile",
      icon: <GoPersonFill />,
    },
    { name: "Book-Schedule", path: "Book-Schedule", icon: <LuBookPlus /> },
  ];

  const filteredNavItems =
    role === "Admin"
      ? adminNavItems
      : role === "Trainer"
      ? trainerNavItems
      : role === "Trainee"
      ? traineeNavItems
      : [];

  return (
    <div>
      <motion.div
        className={`w-16 bg-black h-full min-h-screen text-white transition-all duration-300`}
      >
        <div className="items-center justify-between p-4">
          <div onClick={handleClick} className="z-50 bg-black">
            {!nav ? (
              <FaBars className="w-6 h-6 text-white mt-8" />
            ) : (
              <div className="absolute top-0 mt-0 w-[272px] h-full bg-black">
                <div className="flex items-center ">
                  <FaTimes
                    className="w-6 h-6 mt-8 text-white"
                    onClick={handleClick}
                  />
                  <Link
                    to="/"
                    className="font-orbitron mt-8 ml-5 font-bold text-white"
                  >
                    GYMWEB
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Items */}
        <ul
          className="mt-8"
          style={{
            overflowY: "auto",
            height: "calc(100vh - 72px)",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {filteredNavItems.map((item, index) => (
            <li key={index} className="relative my-1">
              <Link
                to={item.path}
                className={`flex items-center px-4 py-2 hover:text-yellow-300 ${
                  pathname === item.path ? "text-yellow-300" : ""
                }`}
              >
                <span className={`text-xl`}>{item.icon}</span>
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.ul
        style={{
          overflowY: "auto",
          height: "calc(100vh - 64px)",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        }}
        className={
          !nav
            ? "hidden"
            : "absolute z-40 top-16 left-1 w-64 h-screen text-white flex-col flex justify-start bg-black"
        }
        initial={{ x: "-100%" }}
        animate={{ x: nav ? "0%" : "-100%" }}
        transition={{ duration: 0.5 }}
      >
        {filteredNavItems.map((item, index) => (
          <motion.li
            key={index}
            className="relative w-full my-1 text-2xl hover:text-yellow-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, rotateX: 5, rotateY: 5 }}
            transition={{ type: "spring", stiffness: 100, damping: 7 }}
          >
            <Link
              to={item.path}
              className={`flex items-center px-4 py-2 hover:text-yellow-300 ${
                pathname === item.path ? "text-yellow-300" : ""
              }`}
              onClick={() => setNav(false)}
            >
              <span className={`text-xl mr-2`}>{item.icon}</span>
              <span className={`text-base mr-2`}>{item.name}</span>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default Sidebar;
