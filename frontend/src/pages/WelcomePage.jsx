import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/faulu-logo.png";
import axiosInstance from "../utils/axiosInstance";

function WelcomePage() {
  const [email, setEmail] = useState("");  // Changed from username to email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Ensure backend accepts 'email' instead of 'username'
      const response = await axiosInstance.post("/login/", {
        email,  // Changed to email
        password,
      });

      const data = response.data;
      localStorage.setItem("adminToken", data.access);  // Save token in localStorage
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } catch (err) {
      console.error("Login error:", err);
      // Ensure error structure matches expected data
      setError(
        err?.response?.data?.detail ||
        "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
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
          Admin Sign In
        </h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-700 mb-1">Email</label> {/* Changed to Email */}
            <input
              type="email"  
              value={email}
              onChange={(e) => setEmail(e.target.value)}  
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#065f46]"
              placeholder="Enter your email"  
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
            disabled={loading}
            className={`w-full ${loading ? "bg-gray-400" : "bg-[#065f46] hover:bg-[#044f3b]"} text-white py-2 rounded transition`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-[#065f46] hover:underline font-medium"
          >
            Register
          </Link>
        </p>

        {/* Links for Student and Teacher login */}
        <div className="mt-8 text-center">
          <p className="text-lg text-gray-600">For Students and Teachers:</p>
          <div className="space-x-4">
            <Link
              to="/student-login"
              className="text-[#065f46] hover:underline font-medium"
            >
              Student Login
            </Link>
            <span>|</span>
            <Link
              to="/teacher-login"
              className="text-[#065f46] hover:underline font-medium"
            >
              Teacher Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
