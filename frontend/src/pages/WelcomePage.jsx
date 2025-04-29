import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/faulu-logo.png"; // <-- update with your correct path

function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <img src={logo} alt="Faulu School Logo" className="w-32 mb-6" />

      <h1 className="text-4xl font-bold text-green-800 mb-8">Welcome to Faulu School System</h1>

      <div className="flex flex-col space-y-4 w-full max-w-xs">
        <Link
          to="/admin-login"
          className="w-full bg-green-700 text-white py-3 rounded text-center hover:bg-green-800 transition"
        >
          Admin
        </Link>
        <button
          className="w-full bg-green-500 text-white py-3 rounded text-center opacity-70 cursor-not-allowed"
          disabled
        >
          Student
        </button>
        <button
          className="w-full bg-green-500 text-white py-3 rounded text-center opacity-70 cursor-not-allowed"
          disabled
        >
          Teacher
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;
