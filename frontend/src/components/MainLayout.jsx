import React from "react";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-6 w-full min-h-screen bg-gray-100">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
