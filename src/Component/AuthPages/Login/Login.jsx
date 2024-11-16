import React, { useState } from "react";
import { SubmitBtn } from "../../../SubComponents/Buttons/Button";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value.trim();

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
      const result = await signIn(email, password);
      const user = result.user;

      console.log(user);
      toast.success("Login successfully");
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          setGeneralError("Incorrect password. Please try again.");
          break;
        case "auth/user-not-found":
          setGeneralError(
            "User not found. Please check your email or sign up."
          );
          break;
        case "auth/too-many-requests":
          setGeneralError("Too many attempts. Try again later.");
          break;
        default:
          setGeneralError("Failed to log in. Please try again later.");
          break;
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-login-bg min-h-screen flex items-center justify-center px-3 md:px-7 lg:px-10">
      <div className="bg-black/80 border text-white rounded-lg shadow-lg w-full max-w-md px-8 py-14">
        {/* Heading */}
        <h2 className="text-white text-center text-2xl font-extrabold font-orbitron mb-10 uppercase">
          Login to GymWeb
        </h2>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col items-center">
          {/* Email Field */}
          <div className="mb-4 w-full">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 rounded-md border focus:outline-none focus:ring-2"
              placeholder="Enter your email"
              onChange={(e) => setEmailError("")}
            />
            {emailError && (
              <p className="text-red-500 text-xs mt-1">{emailError}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6 w-full relative">
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
              className="w-full p-3 rounded-md border focus:outline-none focus:ring-2"
              placeholder="Enter your password"
              onChange={(e) => setPasswordError("")}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-11 text-gray-400 hover:text-white focus:outline-none"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
            {passwordError && (
              <p className="text-red-500 text-xs mt-1">{passwordError}</p>
            )}
          </div>

          {generalError && (
            <p className="text-red-500 text-center text-sm mb-4">
              {generalError}
            </p>
          )}

          <SubmitBtn text="Login" className="block mt-4" />
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm mt-2">
            Don't have an account?{" "}
            <Link to="/SignUp" className="hover:underline text-orange">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
