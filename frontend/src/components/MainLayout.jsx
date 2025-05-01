import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import LogoText from "../components/LogoText";
import { X, Menu } from "lucide-react";

const MainLayout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <>
      {/* Sticky Top Navigation */}
      <div className="sticky top-0 flex items-center justify-between bg-white shadow px-4 py-3 z-40">
        <LogoText />

        <button
            onClick={() => setSidebarVisible((prev) => !prev)}
            className=" hover:text-green-200 text-green-600 p-2  cursor-pointer transition-colors duration-200"
          >
            <div
              className={`transition-transform duration-300 ease-in-out ${
                sidebarVisible ? "rotate-90 scale-110" : "rotate-0 scale-100"
              }`}
             >
              {sidebarVisible ? <X size={24} /> : <Menu size={24} />}
            </div>
        </button>


      </div>

      {/* Main Content Area */}
      <div className="relative min-h-screen flex bg-gray-100">
        <main className="flex-1 p-6 w-full">
          <Outlet />
        </main>

        {/* Sidebar slides in from right */}
        <div
          className={`fixed top-0 right-0 h-full z-50 transition-transform duration-300 ${
            sidebarVisible ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Sidebar onClose={() => setSidebarVisible(false)} />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
