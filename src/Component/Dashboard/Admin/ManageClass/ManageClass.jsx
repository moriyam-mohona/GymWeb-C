import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Heading from "../../../../SubComponents/Heading";
import { AddBtn } from "../../../../SubComponents/Buttons/Button";
import AddSchedule from "../AddSchedule/AddSchedule";

const ManageClass = () => {
  const [trainers, setTrainers] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
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
        const response = await axiosSecure.get("/schedules");
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

  const getTrainerNameById = (trainerId) => {
    const trainer = trainers.find((trainer) => trainer._id === trainerId);
    return trainer ? trainer.Name : "Unknown Trainer";
  };

  return (
    <>
      <div className="flex justify-between items-start">
        <Heading title="Manage Class Schedule" />
        <AddBtn
          text="Add New Schedule"
          onClick={() => setEditModalOpen(true)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {schedules.map((schedule) => (
          <div
            key={schedule._id}
            className="bg-black p-6 rounded-lg shadow-lg space-y-4"
          >
            <div className="text-lg font-semibold text-white">
              Trainer: {getTrainerNameById(schedule.trainerId)}
            </div>
            <div className="text-gray-400">
              Date: {new Date(schedule.date).toLocaleDateString()}
            </div>
            <div className="text-gray-400">
              Start Time:{" "}
              {new Date(`1970-01-01T${schedule.startTime}`).toLocaleTimeString(
                [],
                { hour: "2-digit", minute: "2-digit", hour12: true }
              )}
            </div>
            <div className="text-gray-400">
              End Time:{" "}
              {new Date(`1970-01-01T${schedule.endTime}`).toLocaleTimeString(
                [],
                { hour: "2-digit", minute: "2-digit", hour12: true }
              )}
            </div>
            <div className="text-gray-400">Subject: {schedule.subject}</div>
          </div>
        ))}
      </div>

      <AddSchedule
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        trainers={trainers}
        onAddSchedule={handleAddSchedule}
      />
    </>
  );
};

export default ManageClass;
