import React, { useState, useEffect } from "react";
import Heading from "../../../../SubComponents/Heading";
import { SubmitBtn } from "../../../../SubComponents/Buttons/Button";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";

const BookSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosSecure.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const getTrainerNameById = (trainerId) => {
    const trainer = users.find((trainer) => trainer._id === trainerId);
    return trainer ? trainer.Name : "Unknown Trainer";
  };

  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const handleBooking = async () => {
    if (!selectedSchedule) {
      toast.error("Please select a schedule to book.");
      return;
    }

    const trainee = users.find((trainee) => trainee.Email === user.email);

    if (!trainee) {
      toast.error("Trainee not found.");
      return;
    }

    const bookingsCount = selectedSchedule.Bookings
      ? selectedSchedule.Bookings.length
      : 0;

    if (bookingsCount >= 10) {
      toast.error("This class is full. Please select another schedule.");
      return;
    }

    try {
      const response = await axiosSecure.patch(
        `/booking-schedule/${selectedSchedule._id}`,
        { userId: trainee._id }
      );

      if (response.data.message === "Booking added successfully.") {
        toast.success("You have successfully booked the class!");

        const updatedSchedules = schedules.map((schedule) => {
          if (schedule._id === selectedSchedule._id) {
            return {
              ...schedule,
              Bookings: [...schedule.Bookings, trainee._id],
            };
          }
          return schedule;
        });

        setSchedules(updatedSchedules);
      }
    } catch (error) {
      console.error("Error booking the class:", error);
    }
  };

  return (
    <div>
      <Heading title="Book a Schedule" />
      <div className="font-out text-white">
        <h3 className="mb-5 font-out font-bold text-2xl text-orange">
          Available Schedules
        </h3>
        {schedules.length === 0 ? (
          <p>No available schedules at the moment.</p>
        ) : (
          <div className="grid grid-cols-12 gap-5">
            {schedules.map((schedule) => (
              <div
                key={schedule._id}
                onClick={() => setSelectedSchedule(schedule)}
                className={`border bg-black col-span-12 lg:col-span-4 md:col-span-6 p-8 rounded hover:scale-95 hover:border-none ${
                  selectedSchedule?._id === schedule._id
                    ? "bg-orange"
                    : "hover:bg-orange"
                }`}
              >
                <p className="font-orbitron text-xl font-bold">
                  {getTrainerNameById(schedule.trainerId)}
                </p>

                <h4>{schedule.date}</h4>
                <div>
                  {timeFormatter.format(
                    new Date(`1970-01-01T${schedule.startTime}`)
                  )}{" "}
                  -{" "}
                  {timeFormatter.format(
                    new Date(`1970-01-01T${schedule.endTime}`)
                  )}
                </div>

                <p>
                  Remaining Spots:{" "}
                  {10 - (schedule.Bookings ? schedule.Bookings.length : 0)} / 10
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-center items-center mt-8 w-full">
        <SubmitBtn
          text="Book this Class"
          onClick={handleBooking}
          className="my-5"
        />
      </div>
    </div>
  );
};

export default BookSchedule;
