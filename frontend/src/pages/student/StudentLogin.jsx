// pages/student/StudentLogin.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/student-login/", {
        admission_number: admissionNumber,
        password: password,
      });

      // Store JWT tokens in localStorage
      localStorage.setItem("studentToken", res.data.access);
      localStorage.setItem("studentRefreshToken", res.data.refresh);

      // Navigate to the student dashboard after successful login
      navigate("/student/dashboard");
    } catch (err) {
      // Handle login error
      setError("Invalid admission number or password.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Student Login</h2>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Admission Number"
          value={admissionNumber}
          onChange={(e) => setAdmissionNumber(e.target.value)}
          className="border p-2 mb-4 w-full rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4 w-full rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default StudentLogin;
