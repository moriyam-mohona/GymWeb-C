import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Heading from "../../../../SubComponents/Heading";
import Modal from "../../../../SubComponents/Modal";

import {
  AddBtn,
  SecondaryBtn,
  SubmitBtn,
} from "../../../../SubComponents/Buttons/Button";

const ManageClass = () => {
  const [trainers, setTrainers] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [newSchedule, setNewSchedule] = useState({
    trainerId: "",
    date: "",
    startTime: "",
    endTime: "",
    subject: "",
  });
  const [error, setError] = useState("");
  const [selectedDay, setSelectedDay] = useState(""); // New state to store the selected day
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

  // Fetch class schedules
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axiosSecure.get("/classSchedules");
        setSchedules(response.data);
      } catch (error) {
        console.error("Error fetching class schedules:", error);
      }
    };
    fetchSchedules();
  }, []);

  const handleEdit = (e, trainer) => {
    e.preventDefault();
    setSelectedTrainer(trainer);
    setEditForm({
      Salary: trainer?.Salary || "",
    });
    setEditModalOpen(true);
  };

  const handleSubmitEditForm = async (e) => {
    e.preventDefault();
    const updatedSalary = editForm.Salary;
    try {
      const response = await axiosSecure.patch(
        `/trainer/${selectedTrainer._id}`,
        {
          Salary: updatedSalary,
        }
      );

      if (response.status === 200) {
        setTrainers((prev) =>
          prev.map((trainer) =>
            trainer._id === selectedTrainer._id
              ? { ...trainer, Salary: updatedSalary }
              : trainer
          )
        );
        setEditModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating salary:", error);
      alert("Failed to update the salary.");
    }
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

  // Add a new class schedule
  const handleNewScheduleChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSchedule = async (e) => {
    e.preventDefault();

    // Validate: Max 5 schedules per day, 2-hour class duration
    const existingSchedules = schedules.filter(
      (schedule) => schedule.date === newSchedule.date
    );

    if (existingSchedules.length >= 5) {
      setError("You cannot add more than 5 schedules per day.");
      return;
    }

    const startTime = new Date(`1970-01-01T${newSchedule.startTime}:00`);
    const endTime = new Date(`1970-01-01T${newSchedule.endTime}:00`);
    const duration = (endTime - startTime) / (1000 * 60 * 60); // Convert to hours

    if (duration !== 2) {
      setError("Class duration must be exactly 2 hours.");
      return;
    }

    try {
      const response = await axiosSecure.post("/classSchedules", newSchedule);
      setSchedules([...schedules, response.data]);
      setNewSchedule({
        trainerId: "",
        date: "",
        startTime: "",
        endTime: "",
        subject: "",
      });
      setError("");
    } catch (error) {
      console.error("Error adding schedule:", error);
      setError("Failed to add the schedule.");
    }
  };

  // Filter schedules by selected day
  const filterSchedulesByDay = (day) => {
    setSelectedDay(day);
  };

  // Helper function to format the day of the week
  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return daysOfWeek[date.getDay()];
  };

  const filteredSchedules = schedules.filter((schedule) =>
    selectedDay ? getDayOfWeek(schedule.date) === selectedDay : true
  );

  return (
    <>
      <div className="flex justify-between items-start">
        <Heading title="Manage Class Schedule" />
        <AddBtn
          text="Add New Schedule"
          onClick={() => setEditModalOpen(true)}
        />
      </div>

      {/* Day Buttons */}
      <div className="mb-4">
        {[
          "Saturday",
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ].map((day) => (
          <button
            key={day}
            onClick={() => filterSchedulesByDay(day)}
            className={`btn ${selectedDay === day ? "btn-active" : ""}`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="font-out text-base">
            <tr>
              <th>Trainer</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Subject</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="font-out text-white">
            {filteredSchedules.map((schedule) => (
              <tr key={schedule._id}>
                <td>{schedule.trainerId}</td>
                <td>{schedule.date}</td>
                <td>{schedule.startTime}</td>
                <td>{schedule.endTime}</td>
                <td>{schedule.subject}</td>
                <td>
                  <button onClick={() => handleEdit(null, schedule)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button onClick={() => confirmDelete(schedule)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Add Schedule Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Add New Class Schedule"
        content={
          <form onSubmit={handleAddSchedule} className="flex flex-col gap-4">
            <select
              name="trainerId"
              value={newSchedule.trainerId}
              onChange={handleNewScheduleChange}
              className="input input-bordered"
            >
              <option value="">Select Trainer</option>
              {trainers.map((trainer) => (
                <option key={trainer._id} value={trainer._id}>
                  {trainer.Name}
                </option>
              ))}
            </select>
            <input
              type="date"
              name="date"
              value={newSchedule.date}
              onChange={handleNewScheduleChange}
              className="input input-bordered"
            />
            <input
              type="time"
              name="startTime"
              value={newSchedule.startTime}
              onChange={handleNewScheduleChange}
              className="input input-bordered"
            />
            <input
              type="time"
              name="endTime"
              value={newSchedule.endTime}
              onChange={handleNewScheduleChange}
              className="input input-bordered"
            />
            <input
              type="text"
              name="subject"
              value={newSchedule.subject}
              onChange={handleNewScheduleChange}
              className="input input-bordered"
            />
            <SubmitBtn text="Add Schedule" />
          </form>
        }
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Schedule"
        content={
          <>
            <p>Are you sure you want to delete this schedule?</p>
            <div className="flex justify-between">
              <SecondaryBtn
                text="Cancel"
                onClick={() => setDeleteModalOpen(false)}
              />
              <button onClick={handleDelete} className="btn btn-danger">
                Yes, Delete
              </button>
            </div>
          </>
        }
      />
    </>
  );
};

export default ManageClass;
