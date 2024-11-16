import React, { useState, useEffect } from "react";
import Heading from "../../../../SubComponents/Heading";
import { SubmitBtn } from "../../../../SubComponents/Buttons/Button";

const BookSchedule = () => {
  // State to hold the available schedules and the selected schedule
  const [schedules, setSchedules] = useState([
    {
      _id: "1",
      date: "2024-11-17",
      startTime: "10:00 AM",
      endTime: "12:00 PM",
      trainerName: "John Doe",
      capacity: 10,
      traineeBookings: [1, 2, 3], // Dummy bookings
    },
    {
      _id: "2",
      date: "2024-11-17",
      startTime: "1:00 PM",
      endTime: "3:00 PM",
      trainerName: "Jane Smith",
      capacity: 10,
      traineeBookings: [4, 5, 6], // Dummy bookings
    },
    {
      _id: "3",
      date: "2024-11-18",
      startTime: "9:00 AM",
      endTime: "11:00 AM",
      trainerName: "Mike Johnson",
      capacity: 10,
      traineeBookings: [], // No bookings yet
    },
    {
      _id: "4",
      date: "2024-11-18",
      startTime: "3:00 PM",
      endTime: "5:00 PM",
      trainerName: "Sara Lee",
      capacity: 10,
      traineeBookings: [7, 8], // Dummy bookings
    },
  ]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

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
                className="border bg-black col-span-12 lg:col-span-4 md:col-span-6 p-8 rounded hover:scale-95 hover:border-none hover:bg-orange "
              >
                <p className="font-orbitron text-xl font-bold">
                  {schedule.trainerName}
                </p>

                <h4>{schedule.date}</h4>
                <h4>{`${schedule.startTime} to ${schedule.endTime}`}</h4>
                <p>
                  Remaining Spots:{" "}
                  {schedule.capacity - schedule.traineeBookings.length} /{" "}
                  {schedule.capacity}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-center items-center mt-8 w-full">
        <SubmitBtn text="Book this Class" className="my-5" />
      </div>
    </div>
  );
};

export default BookSchedule;
