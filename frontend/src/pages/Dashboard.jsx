import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoText from "../components/LogoText";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <>
      <LogoText/>

      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6 text-[#065f46]">
        Welcome, Admin 👋
      </h1>

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
