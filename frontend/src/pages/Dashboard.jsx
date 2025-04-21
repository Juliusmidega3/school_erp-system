import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LogoText from "../components/LogoText";

function Dashboard() {
  const [stats, setStats] = useState({ students: 0, teachers: 0, staff: 0 });
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.get("http://127.0.0.1:8000/api/dashboard-stats/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };
  
    fetchStats();
  }, []);
  

  return (
    <>
      <LogoText/>

      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6 text-[#065f46]">
        Welcome, Admin 👋
      </h1>

      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
        <div className="bg-white p-4 shadow rounded text-center">
          <h2 className="text-lg font-semibold text-gray-600">Total Students</h2>
          <p className="text-2xl font-bold text-green-700">{stats.students}</p>
        </div>
        <div className="bg-white p-4 shadow rounded text-center">
          <h2 className="text-lg font-semibold text-gray-600">Total Teachers</h2>
          <p className="text-2xl font-bold text-green-700">{stats.teachers}</p>
        </div>
        <div className="bg-white p-4 shadow rounded text-center">
          <h2 className="text-lg font-semibold text-gray-600">Total Staff</h2>
          <p className="text-2xl font-bold text-green-700">{stats.staff}</p>
        </div>
      </div>      

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        <Link
          to="/students"
          className="bg-white shadow p-6 rounded-lg hover:shadow-lg transition border border-gray-200 text-center"
        >
          📚 View Students
        </Link>
        <Link
          to="/teachers"
          className="bg-white shadow p-6 rounded-lg hover:shadow-lg transition border border-gray-200 text-center"
        >
          👩‍🏫 View Teachers
        </Link>
        <Link
          to="/staffs"
          className="bg-white shadow p-6 rounded-lg hover:shadow-lg transition border border-gray-200 text-center"
        >
          👩‍🏫 View Staff
        </Link>
      </div>

      <button
        onClick={handleLogout}
        className="mt-8 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
    </>
  );
}

export default Dashboard;
