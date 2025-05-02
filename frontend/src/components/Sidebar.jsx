import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/faulu-logo.png";
import { toast, Toaster } from "react-hot-toast";
import { X } from "lucide-react"; // Keep 'X' for close button

function Sidebar({ onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/admin-login"), 1200);
  };

  const linkClasses = (path) =>
    `flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
      location.pathname.includes(path)
        ? "bg-indigo-100 text-indigo-800 font-semibold"
        : "text-gray-700 hover:bg-indigo-100 hover:text-indigo-900"
    }`;

  return (
    <div className="w-72 h-screen p-6 bg-gradient-to-b from-indigo-50 to-white shadow-xl flex flex-col justify-between relative overflow-y-auto">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Logo and Close */}
      <div>
        <div className="flex justify-between items-center mb-8">
          <img
            src={logo}
            alt="Faulu Logo"
            className="w-32 h-auto object-contain"
          />
          {onClose && (
            <button
              onClick={onClose}
              className="text-indigo-700 hover:text-red-400 transition"
            >
              <X size={24} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <Link to="/app/dashboard" className={linkClasses("dashboard")}>
            <span className="text-lg">🏠</span>
            <span>Dashboard</span>
          </Link>

          <p className="text-indigo-400 text-xs uppercase mt-6 mb-2 tracking-wider px-1">
            Management
          </p>

          <div className="space-y-1 pl-1">
            <Link to="/app/students" className={linkClasses("students")}>
              <span className="text-lg">📘</span>
              <span>Students</span>
            </Link>

            <Link to="/app/teachers" className={linkClasses("teachers")}>
              <span className="text-lg">🧑‍🏫</span>
              <span>Teachers</span>
            </Link>

            <Link to="/app/staffs" className={linkClasses("staffs")}>
              <span className="text-lg">👥</span>
              <span>Staff</span>
            </Link>

            <Link
              to="/app/announcements"
              className={linkClasses("announcements")}
            >
              <span className="text-lg">📢</span>
              <span>Announcements</span>
            </Link>
          </div>
        </nav>
      </div>

      {/* Logout */}
      <motion.button
        onClick={handleLogout}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="mt-6 bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2 py-2 px-4 rounded-xl font-medium shadow-md"
      >
        <span className="text-lg">🚪</span>
        Logout
      </motion.button>
    </div>
  );
}

export default Sidebar;
