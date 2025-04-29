import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/faulu-logo.png";
import axios from "axios";  // Added axios for making API requests

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/token/", {
        username: username,
        password: password,
      });

      // If login is successful, store the access token
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      
      // Navigate to the dashboard page
      navigate("/app/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <img src={logo} alt="Faulu School Logo" className="w-24 mb-4" />

      <h1 className="text-2xl font-bold text-green-800 mb-6">Admin Login</h1>

      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Username</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
