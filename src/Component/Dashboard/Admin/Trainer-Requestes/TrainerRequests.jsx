import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Heading from "../../../../SubComponents/Heading";
import Modal from "../../../../SubComponents/Modal";

const TrainerRequests = () => {
  const [trainers, setTrainers] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAcceptModalOpen, setAcceptModalOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [editForm, setEditForm] = useState({});
  const axiosSecure = useAxiosSecure();

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

  const handleAccept = async (trainer) => {
    try {
      const response = await axiosSecure.patch(`/user/${trainer._id}`, {
        Status: "Accepted",
        Role: "Trainer",
      });

      console.log(response.data.message);
      setTrainers((prevTrainers) =>
        prevTrainers.map((t) =>
          t._id === trainer._id
            ? { ...t, Status: "Accepted", Role: "Trainer" }
            : t
        )
      );

      setSelectedTrainer(null);
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error accepting trainer:", error);
    }
  };

  const handleEdit = (e, trainer) => {
    e.preventDefault();
    setSelectedTrainer(trainer);
    setEditForm({
      salary: trainer?.salary || "",
    });
    setEditModalOpen(true);
  };

  const confirmAccept = (trainer) => {
    setSelectedTrainer(trainer);
    setEditModalOpen(true);
  };
  if (!trainers) return <p>"No Request Found"</p>;
  return (
    <>
      <Heading title="Trainers Requests" />
      {trainers &&
      trainers.filter((trainer) => trainer.Status === "Pending").length ===
        0 ? (
        <div
          role="alert"
          className="alert alert-error bg-red text-white font-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>No Pending request Found.</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="font-out text-base">
              <tr>
                <th>Name</th>
                <th>Specialization</th>
                <th>Experience</th>
                <th>Email</th>
                <th>Role</th>
                <th>Detail</th>
                <th>Accept</th>
                <th>Reject</th>
              </tr>
            </thead>
            <tbody className="font-out text-white">
              {trainers
                .filter((trainer) => trainer.Status === "Pending")
                .map((trainer) => (
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
                          <div className="font-bold">
                            {trainer?.Name || "-"}
                          </div>
                          <div className="text-sm opacity-50">
                            {trainer?.country || "-"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{trainer?.specialization || "-"}</td>
                    <td>{trainer?.experience || "-"}</td>
                    <td>{trainer?.Email || "-"}</td>
                    <td>{trainer?.Role || "-"}</td>
                    <td>
                      <button onClick={(e) => handleEdit(e, trainer)}>
                        Details
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleAccept(trainer)}
                        className="border hover:bg-green px-5 py-2 rounded"
                      >
                        Accept
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => confirmDelete(trainer)}
                        className="border hover:bg-red px-5 py-2 rounded"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

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
              className="bg-red text-white px-8 py-2 rounded"
              onClick={handleDelete}
            >
              Yes, Remove
            </button>
          </div>
        }
      />

      {/* Accept Modal */}
      <Modal
        isOpen={isAcceptModalOpen}
        onClose={() => setAcceptModalOpen(false)}
        title={`Are you sure you want to accept ${selectedTrainer?.Name}?`}
        content={
          <div>
            <p>Specialization: {selectedTrainer?.specialization || "-"}</p>
            <p>Experience: {selectedTrainer?.experience || "-"} years</p>
            <p>Email: {selectedTrainer?.Email || "-"}</p>
          </div>
        }
        actions={
          <div className="flex justify-between items-center w-full font-out">
            <button
              className="text-white border hover:border-none hover:bg-red hover:text-white px-8 py-2 rounded"
              onClick={() => setAcceptModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-green text-white px-8 py-2 rounded"
              onClick={() => confirmAccept(trainer)}
            >
              Accept
            </button>
          </div>
        }
      />
    </>
  );
};

export default TrainerRequests;
