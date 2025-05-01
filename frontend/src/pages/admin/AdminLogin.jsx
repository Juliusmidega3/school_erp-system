import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/faulu-logo.png";
import axios from "axios";

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

      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      navigate("/app/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 to-green-50 p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md border border-green-100">
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="Faulu School Logo" className="w-28 mb-4 drop-shadow" />
          <h1 className="text-2xl font-bold text-green-800">Admin Login</h1>
          <p className="text-sm text-gray-500 mt-1">Enter your credentials to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="bg-red-100 text-red-700 text-sm p-3 rounded-lg border border-red-300">
              {error}
            </div>
          )}

          <div>
            <label className="block mb-1 text-sm font-semibold text-green-700">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-green-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg shadow transition-all duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
