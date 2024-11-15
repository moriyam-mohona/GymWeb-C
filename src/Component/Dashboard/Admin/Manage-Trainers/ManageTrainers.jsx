import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import Heading from "../../../../SubComponents/Heading";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const trainers = [
  {
    id: 1,
    name: "Hart Hagerty",
    country: "United States",
    specialization: "Strength Training",
    experience: "5 years",
    email: "hart@example.com",
    avatar: "https://img.daisyui.com/images/profile/demo/2@94.webp",
  },
  {
    id: 2,
    name: "Alex Johnson",
    country: "Canada",
    specialization: "Yoga",
    experience: "3 years",
    email: "alex@example.com",
    avatar: "https://img.daisyui.com/images/profile/demo/1@94.webp",
  },
  {
    id: 3,
    name: "Maria Lee",
    country: "Australia",
    specialization: "Cardio & Endurance",
    experience: "4 years",
    email: "maria@example.com",
    avatar: "https://img.daisyui.com/images/profile/demo/3@94.webp",
  },
];

const ManageTrainers = () => {
  const [trainers, setTrainers] = useState([]);
  const axiosSecure = useAxiosSecure();
  // Fetch trainers data
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axiosSecure.get("/users"); // Adjust the endpoint if needed
        setTrainers(response.data);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    };
    fetchTrainers();
  }, []);
  const handleEdit = (id) => {
    console.log(`Editing trainer with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Deleting trainer with ID: ${id}`);
  };

  return (
    <div className="overflow-x-auto p-5">
      {/* <h2 className="text-2xl font-bold mb-5">Manage Gym Trainers</h2> */}
      <Heading title="Manage Gym Trainers" />
      <div className=" overflow-x-auto">
        <table className="table">
          {/* Table Head */}
          <thead className="font-out text-base">
            <tr>
              <th>Name</th>
              <th>Specialization</th>
              <th>Experience</th>
              <th>Email</th>
              <th>Country</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="font-out text-white">
            {trainers.map((trainer) => (
              <tr key={trainer.id}>
                {/* Trainer Details */}
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
                      <div className="font-bold">{trainer?.Name || "-"}</div>
                      <div className="text-sm opacity-50">
                        {trainer?.country || "-"}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{trainer?.specialization || "-"}</td>
                <td>{trainer?.experience || "-"}</td>
                <td>{trainer?.Email || "-"}</td>
                <td>{trainer?.country || "-"}</td>
                {/* Action Buttons */}
                <td>
                  <button onClick={() => handleEdit(trainer.id)}>
                    <FaEdit className="text-white text-lg" />
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(trainer.id)}>
                    <FaTrashCan className="text-orange text-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTrainers;
