import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, GraduationCap, BookOpen } from "lucide-react";
import logo from "../assets/faulu-logo.png";

function WelcomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-300 via-green-100 to-white px-4 py-10">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-xl text-center border border-green-200">
        <img
          src={logo}
          alt="Faulu School Logo"
          className="w-60 h-60 object-contain mx-auto mb-6 drop-shadow-md"
        />
        <h1 className="text-2xl font-bold text-green-800 mb-2">Welcome to Faulu School</h1>
        <p className="text-green-600 text-sm mb-10">
          Select your portal to continue
        </p>

        <div className="space-y-5 text-left">
          <Link
            to="/admin-login"
            className="flex items-center gap-3 px-6 py-4 bg-green-600 text-white rounded-xl font-semibold shadow-md hover:bg-green-700 hover:scale-[1.02] transition-all duration-200"
          >
            <ShieldCheck className="w-6 h-6" />
            Admin Portal
          </Link>

          <div className="flex items-center gap-3 px-6 py-4 bg-green-100 text-green-400 rounded-xl font-medium shadow-inner cursor-not-allowed">
            <GraduationCap className="w-6 h-6" />
            Student Portal (coming soon)
          </div>

          <div className="flex items-center gap-3 px-6 py-4 bg-green-100 text-green-400 rounded-xl font-medium shadow-inner cursor-not-allowed">
            <BookOpen className="w-6 h-6" />
            Teacher Portal (coming soon)
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
