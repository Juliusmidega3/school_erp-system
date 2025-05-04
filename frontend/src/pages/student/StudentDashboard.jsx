// pages/student/StudentDashboard.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("studentToken");
    if (!token) {
      navigate("/student-login");
    }
  }, [navigate]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-green-700">Welcome to the Student Portal</h1>
      <p>Access your profile, fees, and announcements here.</p>
    </div>
  );
};

export default StudentDashboard;
