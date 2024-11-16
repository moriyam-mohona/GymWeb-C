import { motion } from "framer-motion";
import React, { useState } from "react";
import { FaBars, FaChalkboardTeacher, FaHome, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

import useAuth from "../../Hooks/useAuth";
import { MdAddTask, MdLibraryAdd, MdManageAccounts } from "react-icons/md";
import { GoPersonFill } from "react-icons/go";
import { GrScheduleNew } from "react-icons/gr";

const Sidebar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  const { user } = useAuth();
  const nameLength = user?.displayName?.length;
  const role = user?.displayName?.slice(nameLength - 7, nameLength);

  // get current pathname
  const { pathname } = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/Dashboard", icon: <FaHome /> },
    {
      name: "Manage-Trainers",
      path: "Manage-Trainers",
      icon: <MdManageAccounts />,
    },
    {
      name: "User-Profile",
      path: "User-Profile",
      icon: <GoPersonFill />,
    },
    {
      name: "Trainer-Request",
      path: "Trainer-Request",
      icon: <MdLibraryAdd />,
    },
    {
      name: "Manage-Class",
      path: "Manage-Class",
      icon: <MdAddTask />,
    },
  ];

  //   const teacherNavItems = [
  //     { name: "Dashboard", path: "/Dashboard", icon: <FaHome /> },
  //     {
  //       name: "My Student",
  //       path: "/Dashboard/myStudents",
  //       icon: <FaUserGraduate />,
  //     },
  //     {
  //       name: "Assigned Students",
  //       path: "/Dashboard/AssignedStudents",
  //       icon: <FaPeopleRoof />,
  //     },
  //     { name: "Students Result", path: "/Dashboard/Result", icon: <PiExam /> },
  //     {
  //       name: "TeacherProfile",
  //       path: "/Dashboard/TeacherProfile/MyProfile",
  //       icon: <FaUser />,
  //     },
  //     { name: "Student", path: "/Dashboard/Student", icon: <FaUserGraduate /> },
  //     {
  //       name: "Teacher",
  //       path: "/Dashboard/Teacher",
  //       icon: <FaChalkboardTeacher />,
  //     },

  //     { name: "Events", path: "/Dashboard/Events", icon: <FaCalendarAlt /> },
  //     {
  //       name: "Notices",
  //       path: "/Dashboard/Notices",
  //       icon: <GrAnnounce />,
  //     },
  //     { name: "Finance", path: "/Dashboard/Finance", icon: <FaDollarSign /> },
  //     { name: "Fee", path: "/Dashboard/Fee", icon: <MdFeed /> },
  //     { name: "Edit", path: "/Dashboard/Edit", icon: <FaPenNib /> },
  //     {
  //       name: "Application",
  //       path: "/Dashboard/Application",
  //       icon: <MdInbox />,
  //     },
  //     {
  //       name: "Application Management",
  //       path: "/Dashboard/Application-Management",
  //       icon: <MdInbox />,
  //     },
  //   ];

  //   const studentNavItems = [
  //     { name: "Results", path: "/Dashboard/Results", icon: <FaPenNib /> },
  //     {
  //       name: "Assignments",
  //       path: "/Dashboard/Assignments",
  //       icon: <MdOutlineAssignment />,
  //     },
  //     {
  //       name: "ClassSchedule",
  //       path: "/Dashboard/ClassSchedule",
  //       icon: <RiCalendarScheduleLine />,
  //     },
  //     {
  //       name: "FeesManagement",
  //       path: "/Dashboard/FeesManagement",
  //       icon: <FaMoneyBillTransfer />,
  //     },
  //     {
  //       name: "Attendence",
  //       path: "/Dashboard/Attendence",
  //       icon: <MdOutlineCoPresent />,
  //     },
  //     {
  //       name: "StudentsProfile",
  //       path: `/Dashboard/Student/My-Profile`,
  //       icon: <FaUser />,
  //     },
  //     {
  //       name: "Application",
  //       path: "/Dashboard/Application",
  //       icon: <MdInbox />,
  //     },
  //   ];

  const filteredNavItems =
    role === "Teacher"
      ? teacherNavItems
      : role === "Student"
      ? studentNavItems
      : navItems;

  return (
    <div>
      <motion.div
        className={`w-16 bg-black h-full min-h-screen text-white transition-all duration-300`}
      >
        <div className="items-center justify-between p-4">
          <div onClick={handleClick} className="z-50 bg-black">
            {!nav ? (
              <FaBars className="w-6 h-6 text-white" />
            ) : (
              <div className="absolute top-0 w-[272px] h-full bg-black">
                <div className="flex items-center ">
                  <FaTimes
                    className="w-6 h-6 mt-3 text-white"
                    onClick={handleClick}
                  />
                  <Link
                    to="/"
                    className="font-orbitron mt-3 ml-5 font-bold text-white"
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
          className="mt-2"
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

      {/* Mobile Menu */}
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
            : "absolute z-40 top-12 left-1 w-64 h-screen  text-white flex-col flex justify-start bg-black"
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
