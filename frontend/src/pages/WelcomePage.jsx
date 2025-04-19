import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/faulu-logo.png";

function WelcomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {/* Enlarged & Centered Logo - 40% bigger */}
      <div className="mb-10">
        <img
          src={logo}
          alt="Faulu School Logo"
          className="h-[224px] w-[224px] object-contain"
        />
      </div>

      {/* Login Form Box */}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-6 text-[#065f46]">
          Sign In
        </h2>

        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Username</label>
            <input
              type="text"
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#065f46]"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#065f46]"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#065f46] text-white py-2 rounded hover:bg-[#044f3b] transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Not an admin?{" "}
          <Link
            to="/students"
            className="text-[#065f46] hover:underline font-medium"
          >
            Continue as User
          </Link>
        </p>
      </div>
    </div>
  );
}

export default WelcomePage;
