import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Heading from "../../../../SubComponents/Heading";
import { AddBtn } from "../../../../SubComponents/Buttons/Button";
import AddSchedule from "../AddSchedule/AddSchedule";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import Modal from "../../../../SubComponents/Modal"; // import your modal component
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const ManageClass = () => {
  const [trainers, setTrainers] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); // state for delete modal
  const [selectedSchedule, setSelectedSchedule] = useState(null); // state to store selected schedule for delete
  const axiosPublic = useAxiosPublic();
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

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axiosPublic.get("/schedules");
        setSchedules(response.data);
      } catch (error) {
        console.error("Error fetching class schedules:", error);
      }
    };
    fetchSchedules();
  }, []);

  const handleAddSchedule = async (newSchedule) => {
    try {
      const response = await axiosSecure.post("/schedules", newSchedule);
      setSchedules([...schedules, response.data]);
    } catch (error) {
      console.error("Error adding schedule:", error);
    }
  };

  const handleDeleteSchedule = async () => {
    if (!selectedSchedule) return;

    try {
      const response = await axiosSecure.delete(
        `/schedule/${selectedSchedule._id}`
      );
      if (response.status === 200) {
        toast.success("Schedule deleted successfully!");

        // First update the UI (state) to remove the deleted schedule
        setSchedules((prevSchedules) =>
          prevSchedules.filter(
            (schedule) => schedule._id !== selectedSchedule._id
          )
        );

        // After state update is complete, close the modal
        setDeleteModalOpen(false);
      } else {
        toast.error("Failed to delete schedule.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the schedule.");
    }
  };

  useEffect(() => {
    if (selectedSchedule && !isDeleteModalOpen) {
      // After the modal is closed, reset selectedSchedule to null
      setSelectedSchedule(null);
    }
  }, [isDeleteModalOpen, selectedSchedule]);

  const getTrainerNameById = (trainerId) => {
    const trainer = trainers.find((trainer) => trainer._id === trainerId);
    return trainer ? trainer.Name : "Unknown Trainer";
  };

  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <>
      <div className="flex justify-between items-start font-out text-white">
        <Heading title="Manage Class Schedule" />
        <AddBtn
          text="Add New Schedule"
          onClick={() => setEditModalOpen(true)}
        />
      </div>

      {schedules.length === 0 ? (
        <p className="text-red text-lg">
          No available schedules at the moment....
        </p>
      ) : (
        <div className="grid grid-cols-12 gap-5">
          {schedules.map((schedule) => (
            <div
              key={schedule._id}
              className="border bg-black col-span-12 lg:col-span-4 md:col-span-6 p-8 rounded hover:scale-95 hover:border-none hover:bg-black/70"
            >
              <div className="font-orbitron font-semibold text-lg flex justify-between items-center text-white">
                Trainer: {getTrainerNameById(schedule.trainerId)}
                <FaTrash
                  className="text-red hover:text-white cursor-pointer"
                  onClick={() => {
                    setSelectedSchedule(schedule); // Set the selected schedule
                    setDeleteModalOpen(true); // Open delete modal
                  }}
                />
              </div>
              <div>Date: {new Date(schedule.date).toLocaleDateString()}</div>
              <div>
                {timeFormatter.format(
                  new Date(`1970-01-01T${schedule.startTime}`)
                )}{" "}
                -{" "}
                {timeFormatter.format(
                  new Date(`1970-01-01T${schedule.endTime}`)
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <AddSchedule
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        trainers={trainers}
        onAddSchedule={handleAddSchedule}
      />

      {/* Modal for delete confirmation */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)} // This should close the modal
        title="Delete Confirmation"
        content={
          <p className="font-out text-lg">
            Are you sure you want to remove this schedule for{" "}
            <span className="font-bold text-red-500">
              {selectedSchedule?.trainerId &&
                getTrainerNameById(selectedSchedule?.trainerId)}
            </span>
            ?
          </p>
        }
        actions={
          <div className="flex justify-between items-center w-full font-out">
            <button
              className="text-white border hover:border-none hover:bg-white/90 hover:text-orange px-8 py-2 rounded"
              onClick={() => setDeleteModalOpen(false)} // Close modal on cancel
            >
              Cancel
            </button>
            <button
              className="bg-red text-white px-8 py-2 rounded"
              onClick={handleDeleteSchedule} // Trigger delete on confirmation
            >
              Yes, Remove
            </button>
          </div>
        }
      />
    </>
  );
};

export default ManageClass;
