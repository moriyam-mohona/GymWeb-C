import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import Heading from "../../../../SubComponents/Heading";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Modal from "../../../../SubComponents/Modal";
import { SubmitBtn } from "../../../../SubComponents/Buttons/Button";

const ManageTrainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [editForm, setEditForm] = useState({});
  const axiosSecure = useAxiosSecure();

  // Fetch trainers data
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axiosSecure.get("/users");
        setTrainers(response.data);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    };
    fetchTrainers();
  }, []);

  const handleEdit = (e, trainer) => {
    e.preventDefault();

    setSelectedTrainer(trainer);
    setEditForm({
      salary: trainer?.salary || "",
    });

    // Open the edit modal
    setEditModalOpen(true);
  };

  const confirmDelete = (trainer) => {
    setSelectedTrainer(trainer);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      const response = await axiosSecure.delete(
        `/users/${selectedTrainer._id}`
      );
      console.log(response.data.message);
      setTrainers((prev) =>
        prev.filter((trainer) => trainer._id !== selectedTrainer._id)
      );
      setDeleteModalOpen(false);
      setSelectedTrainer(null);
    } catch (error) {
      console.error("Error deleting trainer:", error);
    }
  };

  return (
    <>
      <Heading title="Manage Gym Trainers" />
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="font-out text-base">
            <tr>
              <th>Name</th>
              <th>Specialization</th>
              <th>Experience</th>
              <th>Email</th>
              <th>Country</th>
              <th>Detail</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="font-out text-white">
            {trainers.map((trainer) => (
              <tr key={trainer._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={
                            trainer.avatar ||
                            "https://img.daisyui.com/images/profile/demo/2@94.webp"
                          }
                          alt={trainer.name}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{trainer?.Name || "-"}</div>
                      <div className="text-sm opacity-50">
                        {trainer?.country || "-"}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{trainer?.specialization || "-"}</td>
                <td>{trainer?.experience || "-"}</td>
                <td>{trainer?.Email || "-"}</td>
                <td>{trainer?.country || "-"}</td>
                <td>
                  <button onClick={(e) => handleEdit(e, trainer)}>
                    Details
                  </button>
                </td>
                <td>
                  <button onClick={(e) => handleEdit(e, trainer)}>
                    <FaEdit className="text-white text-lg" />
                  </button>
                </td>
                <td>
                  <button onClick={() => confirmDelete(trainer)}>
                    <FaTrashCan className="text-orange text-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Confirmation"
        content={
          <p className="font-out text-lg">
            Are you sure you want to remove{" "}
            <span className="font-bold text-red-500">
              {selectedTrainer?.Name}
            </span>
            ?
          </p>
        }
        actions={
          <div className="flex justify-between items-center w-full font-out">
            <button
              className="text-white border hover:border-none hover:bg-white/90 hover:text-orange px-8 py-2 rounded"
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-orange text-white px-8 py-2 rounded"
              onClick={handleDelete}
            >
              Yes, Remove
            </button>
          </div>
        }
      />

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Trainer Details"
        content={
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Updated Salary:", editForm.salary);
              setEditModalOpen(false);
            }}
            className="flex flex-col items-center gap-4 mx-auto"
          >
            <input
              type="text"
              name="name"
              value={selectedTrainer?.Name || ""}
              placeholder="Trainer Name"
              className="w-full input input-bordered"
              readOnly
            />
            <input
              type="text"
              name="specialization"
              value={selectedTrainer?.specialization || ""}
              placeholder="Specialization"
              className="w-full input input-bordered"
              readOnly
            />
            <input
              type="text"
              name="experience"
              value={selectedTrainer?.experience || ""}
              placeholder="Experience"
              className="w-full input input-bordered"
              readOnly
            />

            {/* Editable Salary Field */}
            <input
              type="number"
              name="salary"
              value={editForm.salary || selectedTrainer?.salary || ""}
              placeholder="Salary"
              className="w-full input input-bordered"
              onChange={(e) =>
                setEditForm((prev) => ({
                  ...prev,
                  salary: e.target.value, // Update salary
                }))
              }
            />

            <SubmitBtn type="submit" text="Submit" />
          </form>
        }
      />
    </>
  );
};

export default ManageTrainers;
