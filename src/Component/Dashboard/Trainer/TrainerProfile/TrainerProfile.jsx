import React, { useEffect, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { RiUserLocationFill } from "react-icons/ri";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Heading from "../../../../SubComponents/Heading";
import Loading from "../../../../SubComponents/Loading";
import Modal from "../../../../SubComponents/Modal";

const TrainerProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    country: "",
    specialization: "",
    experience: "",
  });

  useEffect(() => {
    axiosSecure(`/user/${user.email}`)
      .then((res) => setUserData(res.data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, [user.email, axiosSecure]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const response = await axiosSecure.patch(`/edit-user/${userData._id}`, {
        Phone: formData.phone || userData.phone,
        Address: formData.address || userData.address,
        Country: formData.country || userData.country,
        Specialization: formData.specialization || userData.specialization,
        Experience: formData.experience || userData.experience,
      });

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

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="font-out text-white">
      <Heading
        title="Trainer Profile"
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
              {userData.Phone || "Not provided"}
            </p>

            <p className="flex items-center gap-4">
              <RiUserLocationFill />
              {userData.Address || "Not provided"}
            </p>
          </div>

          <div className="flex gap-5 justify-between items-center mt-2">
            <p>Specialization: {userData.Specialization || "-"}</p>
            <p>Experience: {userData.Experience || "-"}</p>
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Profile"
        content={
          <form className="flex flex-col gap-4">
            <div className="">
              <label className="block mb-2">Name</label>
              <input
                type="text"
                value={user.displayName || ""}
                disabled
                className="w-full p-2 mt-2 text-white"
              />
            </div>
            <div className="">
              <label className="block mb-2">Email</label>
              <input
                type="email"
                value={user.email || ""}
                disabled
                className="w-full p-2 mt-2 text-white"
              />
            </div>
            <div>
              <label className="block mb-2">Phone</label>
              <input
                type="text"
                name="phone"
                defaultValue={userData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Address</label>
              <input
                type="text"
                name="address"
                defaultValue={userData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Country</label>
              <input
                type="text"
                name="country"
                defaultValue={userData.country}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Specialization</label>
              <input
                type="text"
                name="specialization"
                defaultValue={userData.specialization}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Experience</label>
              <input
                type="text"
                name="experience"
                defaultValue={userData.experience}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </form>
        }
        actions={
          <>
            <button
              onClick={handleUpdateProfile}
              disabled={loading}
              className="px-4 py-2 bg-orange text-white rounded-lg"
            >
              {loading ? "Updating..." : "Update"}
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border rounded-lg text-white"
            >
              Cancel
            </button>
          </>
        }
      />
    </div>
  );
};

export default TrainerProfile;
