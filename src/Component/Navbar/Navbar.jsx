import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { PrimaryBtn } from "../../SubComponents/Buttons/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { TbLogout2, TbLayoutDashboardFilled } from "react-icons/tb";
import { IoPerson } from "react-icons/io5";
import { motion } from "framer-motion";
import useAuth from "../Hooks/useAuth";

const navLinks = [
  { label: "Class", path: "/" },
  { label: "Team", path: "/" },
  { label: "About Us", path: "/" },
  { label: "Gallery", path: "/" },
];

function Navbar() {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = () => {
    logout()
      .then(() => navigate("/Login"))
      .catch((error) => console.error("Logout error:", error));
  };

  return (
    <div className="py-8">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div>
          <h3 className="font-orbitron text-orange uppercase">GymWeb</h3>
        </div>

        <motion.ul
          className="hidden lg:flex font-medium text-base gap-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { delayChildren: 0.2, staggerChildren: 0.1 },
            },
          }}
        >
          {navLinks.map((link) => (
            <motion.li
              key={link.label}
              variants={{
                hidden: { opacity: 0, y: -10 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{
                scale: 1.1,
                color: "#FFA500",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to={link.path} className="hover:text-orange transition">
                {link.label}
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative dropdown">
              {/* Avatar */}
              <div onClick={toggleDropdown}>
                <img
                  src={
                    user.photoURL ||
                    "https://i.ibb.co/cYnd8K9/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-il.jpg"
                  }
                  alt="User Avatar"
                  className="avatar z-30 cursor-pointer w-8 h-8 rounded-full"
                />
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-10 bg-black lg:bg-black/70 rounded-lg shadow-lg w-48 z-20"
                >
                  <div className="px-4 py-2 font-out text-base text-white">
                    {user.displayName || "User"}
                  </div>
                  <hr />
                  <Link
                    to="/"
                    className="flex items-center font-out text-base gap-2 px-4 py-2 text-white hover:bg-orange"
                  >
                    <IoPerson /> Profile
                  </Link>
                  <Link
                    to="/Dashboard"
                    className="flex items-center font-out text-base gap-2 px-4 py-2 text-white hover:bg-orange"
                  >
                    <TbLayoutDashboardFilled /> Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 font-out text-base w-full px-4 py-2 text-white hover:bg-orange"
                  >
                    <TbLogout2 /> Logout
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <Link to="/Login">
              <PrimaryBtn text="Login" />
            </Link>
          )}

          {/* Hamburger Menu (Mobile) */}
          <div className="lg:hidden">
            {isMobileMenuOpen ? (
              <IoClose
                className="text-2xl cursor-pointer"
                onClick={toggleMobileMenu}
              />
            ) : (
              <GiHamburgerMenu
                className="text-2xl cursor-pointer"
                onClick={toggleMobileMenu}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ type: "spring", stiffness: 50 }}
          className="lg:hidden bg-black text-white p-4 absolute top-18 left-0 w-full z-40 shadow-lg"
        >
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <motion.li
                key={link.label}
                whileHover={{
                  scale: 1.05,
                  color: "#FFA500",
                }}
                whileTap={{ scale: 0.95 }}
                className="text-base font-thin font-out border-b border-white/30 rounded p-2"
              >
                <Link
                  to={link.path}
                  className="hover:text-orange transition"
                  onClick={toggleMobileMenu}
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}

export default Navbar;
