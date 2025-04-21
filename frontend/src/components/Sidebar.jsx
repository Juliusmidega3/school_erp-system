import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LogoText from "./LogoText";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  const links = [
    { to: "/dashboard", label: "🏠 Dashboard" },
    { to: "/students", label: "📚 Students" },
    { to: "/teachers", label: "👩‍🏫 Teachers" },
    { to: "/staffs", label: "🧑‍💼 Staff" },
    { to: "/announcements", label: "📢 Announcements" },
    { to: "/calendar", label: "🗓️ Calendar" },
  ];

  return (
    <div className="h-screen w-64 bg-white shadow-md border-r border-gray-200 p-4 fixed top-0 left-0 z-10">
      <LogoText />
      <nav className="mt-8 space-y-4">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg font-medium transition ${
                isActive
                  ? "bg-[#065f46] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 mt-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          🚪 Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
