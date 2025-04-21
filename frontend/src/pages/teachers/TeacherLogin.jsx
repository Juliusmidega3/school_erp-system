// src/pages/teachers/TeacherLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import logo from "../../assets/faulu-logo.png";  // Assuming logo is in the assets folder

const TeacherLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/teacher-login/", {
        username,
        password,
      });

      // Assuming the response contains the token
      localStorage.setItem("teacherToken", response.data.token);
      navigate("/teacher-dashboard");
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="mb-10">
        <img
          src={logo}
          alt="Faulu School Logo"
          className="h-[300px] w-[300px] object-contain"
        />
      </div>

      {/* Login Form */}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-6 text-[#065f46]">
          Teacher Login
        </h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-1">Username</label>
            <input
              type="text"
              id="username"
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#065f46]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#065f46]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#065f46] text-white py-2 rounded hover:bg-[#044f3b] transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherLogin;
