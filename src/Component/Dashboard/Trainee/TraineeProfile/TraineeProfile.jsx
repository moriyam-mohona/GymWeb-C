import React, { useEffect, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { RiUserLocationFill } from "react-icons/ri";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Heading from "../../../../SubComponents/Heading";
import Loading from "../../../../SubComponents/Loading";
import Modal from "../../../../SubComponents/Modal";

const TraineeProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axiosSecure(`/user/${user.email}`)
      .then((res) => {
        setUserData(res.data);
        // Dynamically populate the formData from user data
        setFormData({
          phone: res.data.phone || "",
          address: res.data.address || "",
        });
      })
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

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const response = await axiosSecure.patch(
        `/edit-user/${userData._id}`,
        formData
      );

      if (response.data.message === "User updated successfully.") {
        setUserData(response.data.updatedUser);
        toast.success("Profile updated successfully!");
        setIsModalOpen(false);
      } else {
        toast.error(response.data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="font-out text-white">
      <Heading
        title="Trainee Profile"
        subtitle="Manage your personal information and keep your profile updated."
      />
      <div className="shadow-md rounded-lg p-6 flex flex-col items-center gap-6">
        <div className="relative">
          <img
            src={user.photoURL || "https://via.placeholder.com/150"}
            alt={user.displayName || "User Avatar"}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4"
          />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-xl md:text-2xl font-bold mb-2">
            {user.displayName || "User Name"}
          </h2>
          <p className="text-sm md:text-base font-thin text-white/80 mb-4">
            {user.email || "No email provided"}
          </p>

          <div className="flex items-center gap-8">
            <p className="flex items-center gap-4">
              <FaPhoneAlt />
              {userData.Phone || "-"}
            </p>

            <p className="flex items-center gap-4">
              <RiUserLocationFill />
              {userData.Address || "-"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
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
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 border hover:bg-orange text-white rounded-lg"
        >
          Edit Profile
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Profile"
        content={
          <form className="flex flex-col gap-4">
            <div>
              <label className="block mb-2">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone || ""}
                onInput={handleInput} // Using onInput instead of onChange or onBlur
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address || ""}
                onInput={handleInput} // Using onInput instead of onChange or onBlur
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <button
              type="button"
              onClick={handleUpdateProfile}
              className="bg-orange text-white py-2 px-4 rounded"
            >
              Update Profile
            </button>
          </form>
        }
      />
    </div>
  );
};

export default TraineeProfile;
