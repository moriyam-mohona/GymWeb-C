import React, { useState } from "react";
import Modal from "../../../../SubComponents/Modal";
import { SubmitBtn } from "../../../../SubComponents/Buttons/Button";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AddSchedule = ({ isOpen, onClose, trainers, onAddSchedule }) => {
  const [error, setError] = useState("");
  const [suggestedEndTime, setSuggestedEndTime] = useState("");
  const axiosSecure = useAxiosSecure();

  const calculateSuggestedEndTime = (startTime) => {
    const start = new Date(`1970-01-01T${startTime}:00`);
    start.setHours(start.getHours() + 2);

    let hours = start.getHours();
    let minutes = start.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${hours}:${minutes} ${ampm}`;
  };

  const handleStartTimeChange = (e) => {
    const startTime = e.target.value;
    setSuggestedEndTime(calculateSuggestedEndTime(startTime));
  };

  const handleAddSchedule = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newSchedule = {
      trainerId: form.trainerName.value,
      date: form.date.value,
      startTime: form.startTime.value,
      endTime: form.endTime.value,
    };

    setError("");

    if (
      !newSchedule.trainerId ||
      !newSchedule.date ||
      !newSchedule.startTime ||
      !newSchedule.endTime
    ) {
      setError("Please fill in all fields.");
      return;
    }

    const existingSchedules = trainers.filter(
      (schedule) => schedule.date === newSchedule.date
    );
    if (existingSchedules.length >= 5) {
      setError("You cannot add more than 5 schedules per day.");
      return;
    }

    const start = new Date(`1970-01-01T${newSchedule.startTime}:00`);
    const end = new Date(`1970-01-01T${newSchedule.endTime}:00`);
    const duration = (end - start) / (1000 * 60 * 60);
    if (duration !== 2) {
      setError(
        `Class duration must be exactly 2 hours. Suggested end time is ${suggestedEndTime}`
      );
      return;
    }

    try {
      const response = await axiosSecure.post("/schedule", newSchedule);
      if (response.status === 200) {
        toast.success("Schedule added successfully!");
        onAddSchedule(newSchedule);
        form.reset();
        onClose();
      } else {
        setError(response.data.message || "Failed to add schedule.");
      }
    } catch (error) {
      setError("An error occurred while adding the schedule.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Class Schedule"
      content={
        <>
          <form onSubmit={handleAddSchedule} className="flex flex-col gap-4">
            <select name="trainerName" className="input input-bordered">
              <option value="">Select Trainer</option>
              {trainers
                .filter((trainer) => trainer.Role === "Trainer")
                .map((trainer) => (
                  <option key={trainer._id} value={trainer._id}>
                    {trainer.Name}
                  </option>
                ))}
            </select>
            <input type="date" name="date" className="input input-bordered" />
            <input
              type="time"
              name="startTime"
              className="input input-bordered"
              onChange={handleStartTimeChange}
            />
            <input
              type="time"
              name="endTime"
              className="input input-bordered"
            />
            {suggestedEndTime && (
              <p className="text-red">Suggested end time: {suggestedEndTime}</p>
            )}
            <SubmitBtn text="Add Schedule" />
          </form>
        </>
      }
    />
  );
};

export default AddSchedule;
