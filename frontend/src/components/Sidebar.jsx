import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import { Home, Users, UserPlus, BookOpen, Megaphone, LogOut } from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    toast.success("Logged out successfully!");

    setTimeout(() => {
      navigate("/admin-login");
    }, 1200);
  };

  const linkClasses = (path) =>
    `flex items-center space-x-3 p-2 rounded-lg transition ${
      location.pathname.includes(path)
        ? "bg-green-200 text-green-900 font-semibold"
        : "hover:bg-green-100 text-white"
    }`;

  return (
    <div className="h-full p-4 bg-[#065f46] flex flex-col justify-between">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="space-y-8">
        {/* Logo */}
        <div className="text-white text-2xl font-bold text-center">
          Faulu School
        </div>

        {/* Navigation */}
        <nav className="space-y-4">
          <Link to="/app/dashboard" className={linkClasses("dashboard")}>
            <Home size={20} />
            <span>Dashboard</span>
          </Link>

          <div>
            <p className="text-green-100 text-xs uppercase mb-2 ml-2">Manage</p>
            <div className="space-y-2 ml-2">
              <Link to="/app/students" className={linkClasses("students")}>
                <BookOpen size={20} />
                <span>Students</span>
              </Link>
              <Link to="/app/teachers" className={linkClasses("teachers")}>
                <UserPlus size={20} />
                <span>Teachers</span>
              </Link>
              <Link to="/app/staffs" className={linkClasses("staffs")}>
                <Users size={20} />
                <span>Staffs</span>
              </Link>
              <Link to="/app/announcements" className={linkClasses("announcements")}>
                <Megaphone size={20} />
                <span>Announcements</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Logout Button */}
      <motion.button
        onClick={handleLogout}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2 py-2 px-4 rounded-lg mt-6 w-full"
      >
        <LogOut size={20} />
        Logout
      </motion.button>
    </div>
  );
}

export default Sidebar;
