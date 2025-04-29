import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import LogoText from "../components/LogoText"

const MainLayout = () => {
  return (
    <>
      <LogoText/>
          <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/5 bg-white shadow-md border-r border-gray-200">
        <Sidebar />
      </div>
      <main className="w-4/5 p-6">
        <Outlet />
      </main>
    </div>
    </>
  );
};

export default MainLayout;
