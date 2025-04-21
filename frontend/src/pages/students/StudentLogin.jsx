import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/faulu-logo.png";  // Adjust the path

function StudentLogin() {
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/student-login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admission_number: admissionNumber, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("studentToken", data.access); // Store the token
        navigate("/student-dashboard"); // Redirect to the student dashboard
      } else {
        const errorData = await response.json();
        setError("Login failed: " + (errorData.detail || "Unknown error"));
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login error. Please try again later.");
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
          Student Login
        </h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-700 mb-1">Admission Number</label>
            <input
              type="text"
              value={admissionNumber}
              onChange={(e) => setAdmissionNumber(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#065f46]"
              placeholder="Enter your admission number"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#065f46]"
              placeholder="Enter your password"
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

        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-[#065f46] hover:underline font-medium"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

export default StudentLogin;
