import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Heading from "../../../../SubComponents/Heading";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";

const AssignedSchedule = () => {
  const [trainers, setTrainers] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); // Get logged-in user

  // Fetch all trainers
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
  console.log(user);
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axiosPublic.get("/schedules");
        setSchedules(response.data);

        const filtered = response.data.filter(
          (schedule) =>
            trainers.find((trainer) => trainer._id === schedule.trainerId)
              ?.Email === user?.email
        );
        setFilteredSchedules(filtered); // Set filtered schedules
      } catch (error) {
        console.error("Error fetching class schedules:", error);
      }
    };
    fetchSchedules();
  }, [trainers, user?.email]);

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
        <Heading title="Assigned Schedule" />
      </div>

      {filteredSchedules.length === 0 ? (
        <p className="text-red text-lg">
          No available schedules at the moment....
        </p>
      ) : (
        <div className="grid grid-cols-12 gap-5">
          {filteredSchedules.map((schedule) => (
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
    </>
  );
};

export default AssignedSchedule;
