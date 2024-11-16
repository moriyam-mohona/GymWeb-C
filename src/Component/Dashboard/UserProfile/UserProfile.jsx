import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import Heading from "../../../SubComponents/Heading";
import { FaPhoneAlt } from "react-icons/fa";
import { RiUserLocationFill } from "react-icons/ri";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../../SubComponents/Loading";

const UserProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    axiosSecure(`/user/${user.email}`)
      .then((res) => setUserData(res.data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, [user.email, axiosSecure]);

  const handleRequestTrainer = async () => {
    if (user.email !== userData.Email) {
      toast.error("User data mismatch.");
      return;
    }
    console.log(userData._id);
    setLoading(true);
    try {
      const response = await axiosSecure.patch(`/user/${userData._id}`, {
        Status: "Pending",
      });
      if (
        response.data.message ===
        "Trainer request sent successfully, status set to Pending."
      ) {
        setUserData({ ...userData, Status: "Pending" });
        // toast.success("Trainer request sent successfully!");
      } else {
        toast.error(response.data.message || "Failed to send trainer request.");
      }
    } catch (error) {
      console.error("Error sending trainer request:", error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="font-out text-white">
      <Heading
        title="Your Profile"
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

        <button
          onClick={handleRequestTrainer}
          className={`px-6 py-2 rounded-lg ${
            userData.Status === "Pending"
              ? "border text-white cursor-not-allowed"
              : userData.Status === "Accepted"
              ? "bg-green text-white cursor-not-allowed"
              : "bg-orange hover:border text-white"
          }`}
          disabled={
            loading ||
            userData.Status === "Pending" ||
            userData.Status === "Accepted"
          }
        >
          {loading
            ? "Requesting..."
            : userData.Status === "Pending"
            ? "Pending..."
            : userData.Status === "Accepted"
            ? "Request Accepted"
            : "Join as Trainer"}
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
