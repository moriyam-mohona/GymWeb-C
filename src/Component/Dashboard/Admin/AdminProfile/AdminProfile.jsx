import React, { useEffect, useState } from "react";

import { FaPhoneAlt } from "react-icons/fa";
import { RiUserLocationFill } from "react-icons/ri";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Heading from "../../../../SubComponents/Heading";
import Loading from "../../../../SubComponents/Loading";

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    axiosSecure(`/user/${user.email}`)
      .then((res) => setUserData(res.data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, [user.email, axiosSecure]);

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="font-out text-white">
      <Heading
        title="Admin Profile"
        subtitle="Manage your personal information and keep your profile updated."
      />
      <div className="shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="relative">
          <img
            src={user.photoURL || "https://via.placeholder.com/150"}
            alt={user.displayName || "User Avatar"}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4"
          />
        </div>
        <div className="flex-grow">
          <h2 className="text-xl md:text-2xl font-bold mb-2">
            {user.displayName || "User Name"}
          </h2>
          <p className="text-sm md:text-base font-thin text-white/80 mb-4">
            {user.email || "No email provided"}
          </p>

          <div className="space-y-2">
            <p className="flex items-center gap-4">
              <FaPhoneAlt />
              {user.phone || "Not provided"}
            </p>

            <p className="flex items-center gap-4">
              <RiUserLocationFill />
              {user.address || "Not provided"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() =>
            alert("Edit Profile functionality is not implemented yet.")
          }
          className="px-6 py-2 border hover:bg-orange text-white rounded-lg"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;
