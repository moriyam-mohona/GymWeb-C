import React, { useState } from "react";
import Modal from "../../../../SubComponents/Modal";
import { SubmitBtn } from "../../../../SubComponents/Buttons/Button";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AddSchedule = ({ isOpen, onClose, trainers, onAddSchedule }) => {
  const [error, setError] = useState("");
  const [suggestedEndTime, setSuggestedEndTime] = useState(""); // To store suggested end time
  const axiosSecure = useAxiosSecure();

  // Function to calculate suggested end time (2 hours after start time)
  const calculateSuggestedEndTime = (startTime) => {
    const start = new Date(`1970-01-01T${startTime}:00`);
    start.setHours(start.getHours() + 2); // Adding 2 hours to start time

    // Format time in 12-hour AM/PM format
    let hours = start.getHours();
    let minutes = start.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;

    const formattedEndTime = `${hours}:${minutes} ${ampm}`;
    return formattedEndTime;
  };

  // Function to handle the addition of schedule
  const handleAddSchedule = async (e) => {
    e.preventDefault();

    const form = e.target;

    // Capture form data
    const newSchedule = {
      trainerId: form.trainerName.value,
      date: form.date.value,
      startTime: form.startTime.value,
      endTime: form.endTime.value,
    };

    console.log("New Schedule Data:", newSchedule);

    // Clear any existing error messages
    setError("");

    // Validate for missing fields
    if (
      !newSchedule.trainerId ||
      !newSchedule.date ||
      !newSchedule.startTime ||
      !newSchedule.endTime
    ) {
      setError("Please fill in all fields.");
      return;
    }

    // Validate for maximum 5 schedules per day
    const existingSchedules = trainers.filter(
      (schedule) => schedule.date === newSchedule.date
    );

    if (existingSchedules.length >= 5) {
      setError("You cannot add more than 5 schedules per day.");
      return;
    }

    // Calculate duration for the class
    const start = new Date(`1970-01-01T${newSchedule.startTime}:00`);
    const end = new Date(`1970-01-01T${newSchedule.endTime}:00`);
    const duration = (end - start) / (1000 * 60 * 60); // Duration in hours

    // Check if the duration is exactly 2 hours
    if (duration !== 2) {
      setError(
        `Class duration must be exactly 2 hours. Suggested end time is ${suggestedEndTime}`
      );
      return; // If the duration is wrong, stop further execution
    }

    // Send the data to the API using axiosSecure
    try {
      const response = await axiosSecure.post("/schedule", newSchedule);
      console.log(response);
      if (response.status === 200) {
        toast.success("Schedule added successfully!");
        onAddSchedule(newSchedule); // Pass valid schedule data to the parent function
        form.reset();
        onClose();
      } else {
        setError(response.data.message || "Failed to add schedule.");
      }
    } catch (error) {
      console.error("Error adding schedule:", error);
      setError("An error occurred while adding the schedule.");
    }
  };

  // Handle start time change to update suggested end time
  const handleStartTimeChange = (e) => {
    const startTime = e.target.value;
    setSuggestedEndTime(calculateSuggestedEndTime(startTime));
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
              {trainers.map((trainer) => (
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
              onChange={handleStartTimeChange} // Update suggested end time when start time changes
            />
            <input
              type="time"
              name="endTime"
              className="input input-bordered"
            />
            {/* Display suggested end time */}
            {suggestedEndTime && (
              <p className="text-base text-red">
                Suggested end time: {suggestedEndTime}
              </p>
            )}
            <SubmitBtn text="Add Schedule" />
          </form>
        </>
      }
    />
  );
};

export default AddSchedule;
