import React, { useEffect, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { RiUserLocationFill } from "react-icons/ri";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Heading from "../../../../SubComponents/Heading";
import Loading from "../../../../SubComponents/Loading";
import Modal from "../../../../SubComponents/Modal";
import toast from "react-hot-toast";

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [userData, setUserData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch user data
    axiosSecure(`/user/${user.email}`)
      .then((res) => setUserData(res.data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, [user.email, axiosSecure]);

  if (!user) {
    return <Loading />;
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      Phone: e.target.phone.value,
      Address: e.target.address.value,
    };

    try {
      const response = await axiosSecure.patch(
        `/edit-user/${userData._id}`, // Use the user's ID for the request
        updatedData
      );

      setUserData(response.data.updatedUser); // Update state with new data
      toast.success("Profile updated successfully!");
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="font-out text-white">
      <Heading
        title="Admin Profile"
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

      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 border hover:bg-orange text-white rounded-lg"
        >
          Edit Profile
        </button>
      </div>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Profile"
        content={
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm">Name</label>
              <input
                type="text"
                value={user.displayName || ""}
                disabled
                className="w-full p-2 mt-2 bg-gray-700 text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm">Email</label>
              <input
                type="email"
                value={user.email || ""}
                disabled
                className="w-full p-2 mt-2 bg-gray-700 text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm">Phone</label>
              <input
                type="text"
                name="phone"
                defaultValue={userData.Phone || ""}
                className="w-full p-2 mt-2 bg-gray-700 text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm">Address</label>
              <input
                type="text"
                name="address"
                defaultValue={userData.Address || ""}
                className="w-full p-2 mt-2 bg-gray-700 text-white"
              />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 text-white rounded-lg"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 border hover:bg-red-500 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        }
      />
    </div>
  );
};

export default AdminProfile;
