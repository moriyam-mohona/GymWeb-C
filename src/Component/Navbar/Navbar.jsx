import { GiHamburgerMenu } from "react-icons/gi";
import { PrimaryBtn } from "../../SubComponents/Buttons/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { TbLogout2, TbLayoutDashboardFilled } from "react-icons/tb";
import { IoPerson } from "react-icons/io5";
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
  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    logout()
      .then(() => navigate("/Login"))
      .catch((error) => console.error("Logout error:", error));
  };

  const closeDropdown = (e) => {
    if (isDropdownOpen && !e.target.closest(".dropdown")) {
      setIsDropdownOpen(false);
    }
  };

  // Close dropdown when clicking outside
  document.addEventListener("click", closeDropdown);

  return (
    <div className="py-8">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div>
          <h3 className="font-orbitron text-orange uppercase">GymWeb</h3>
        </div>

        {/* Navigation Links */}
        <ul className="hidden lg:flex font-medium text-base gap-10">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link to={link.path} className="hover:text-orange transition">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative dropdown">
              {/* Avatar */}
              <div onClick={toggleDropdown}>
                <img
                  src={
                    user.photoURL ||
                    "https://i.ibb.co.com/cYnd8K9/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-il.jpg"
                  }
                  alt="User Avatar"
                  className="avatar z-30 cursor-pointer w-8 h-8 rounded-full"
                />
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-5 bg-black lg:bg-black/70 rounded-lg shadow-lg w-48 z-20">
                  <div className="px-4 py-2 font-out text-base text-white">
                    {user.displayName || "User"}
                  </div>
                  <hr className="" />
                  <Link
                    to="/UserProfile"
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
                </div>
              )}
            </div>
          ) : (
            <Link to="/Login">
              <PrimaryBtn text="Login" />
            </Link>
          )}

          {/* Hamburger Menu */}
          <div className="lg:hidden">
            <GiHamburgerMenu className="text-xl cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
