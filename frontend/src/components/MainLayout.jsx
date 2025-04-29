import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom"; // 👈 Add this

const MainLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-6 w-full min-h-screen bg-gray-100">
        <Outlet /> {/* 👈 Replace {children} with <Outlet /> */}
      </main>
    </div>
  );
};

export default MainLayout;
