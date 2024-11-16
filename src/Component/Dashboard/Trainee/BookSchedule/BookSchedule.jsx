import React, { useState, useEffect } from "react";
import Heading from "../../../../SubComponents/Heading";
import { SubmitBtn } from "../../../../SubComponents/Buttons/Button";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Loading from "../../../../SubComponents/Loading";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const BookSchedule = () => {
  // State to hold the available schedules and the selected schedule
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [error, setError] = useState("");
  const [trainers, setTrainers] = useState([]);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  // Fetch schedules from the API using useAxiosPublic
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

  // Handle booking a class
  const handleBooking = () => {
    if (!selectedSchedule) {
      alert("Please select a schedule to book.");
      return;
    }

    // Simulate the booking process
    if (selectedSchedule.traineeBookings.length >= selectedSchedule.capacity) {
      alert("This class is full. Please select another schedule.");
    } else {
      alert("You have successfully booked the class!");
    }
  };

  // Fetch Trainers
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
                  {/* {schedule.trainerName} */}
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
                {/* <p>
                  Remaining Spots:{" "}
                  {schedule.capacity - schedule.traineeBookings.length} /{" "}
                  {schedule.capacity}
                </p> */}
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
