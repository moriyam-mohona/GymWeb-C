import React, { useState } from "react";
import { SubmitBtn } from "../../../SubComponents/Buttons/Button";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, updatePro } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;

    setEmailError("");
    setPasswordError("");
    setGeneralError("");

    if (!email.includes("@")) {
      setEmailError("Please enter a valid email.");
      return;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }

    try {
      // Call createUser function to register the user
      const result = await createUser(email, password);
      const token = result.token;

      // Store the token in localStorage
      localStorage.setItem("access-token", token);

      const user = result.user;

      // Update user profile
      await updatePro(name);

      // Create user data for backend
      const userInfo = {
        Name: name,
        Email: email,
      };

      // Send user data to backend
      const response = await axiosPublic.post("/user", userInfo);

      if (response.data && response.data.insertedId) {
        toast.success("User Created Successfully");
        navigate("/");
      } else {
        // Log if response doesn't have insertedId
        console.error("Error: User creation failed.");
      }
    } catch (error) {
      console.error(error);

      if (error.response && error.response.data) {
        // Handle specific error from the backend if available
        if (error.response.data.message === "User already exists") {
          setGeneralError("User with this email already exists.");
        } else {
          setGeneralError("Failed to sign up. Please try again.");
        }
      } else {
        setGeneralError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(value.includes("@") ? "" : "Please enter a valid email.");
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(
      value.length >= 6 ? "" : "Password must be at least 6 characters long."
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-login-bg min-h-screen flex items-center justify-center px-3 md:px-7 lg:px-10">
      <div className="bg-black/80 border text-white rounded-lg shadow-lg w-full max-w-md px-8 py-14">
        {/* Heading */}
        <h2 className="text-white text-center text-2xl font-extrabold font-orbitron mb-10 uppercase">
          Sign Up for GymWeb
        </h2>

        {/* Sign-Up Form */}
        <form className="flex flex-col items-center" onSubmit={handleSignup}>
          {/* Name Field */}
          <div className="mb-4 w-full">
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full p-3 rounded-md border focus:outline-none focus:ring-2"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4 w-full">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={handleEmailChange}
              className="w-full p-3 rounded-md border focus:outline-none focus:ring-2"
              placeholder="Enter your email"
            />
            {emailError && (
              <p className="text-red-500 text-xs mt-1">{emailError}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4 w-full relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              value={password}
              onChange={handlePasswordChange}
              className="w-full p-3 rounded-md border focus:outline-none focus:ring-2"
              placeholder="Enter your password"
            />
            {/* Toggle Password Button */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-11 hover:text-white focus:outline-none"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
            {passwordError && (
              <p className="text-red-500 text-xs mt-1">{passwordError}</p>
            )}
          </div>

          {/* Submit Button */}
          <SubmitBtn text="Sign Up" className="block mt-4" />

          {/* General Error Message */}
          {generalError && (
            <p className="text-red-500 text-center text-sm mt-4">
              {generalError}
            </p>
          )}
        </form>

        {/* Already Registered Link */}
        <div className="mt-6 text-center">
          <p className="text-sm mt-2">
            Already have an account?{" "}
            <Link to="/Login" className=" hover:underline text-orange">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
