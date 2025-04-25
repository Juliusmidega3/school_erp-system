import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Pages

import RegisterStaff from "./pages/staff/RegisterStaff";
import StaffList from "./pages/staff/StaffList";
import WelcomePage from "./pages/WelcomePage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import Announcements from "./pages/announcements/Announcements";

// Layout & Route Guards
import PrivateRoute from "./components/PrivateRoute";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<RegisterPage />} />


        {/* Admin Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </PrivateRoute>
          }
        />

    
        <Route
          path="/staffs"
          element={
            <PrivateRoute>
              <MainLayout>
                <StaffList />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/staffs/register"
          element={
            <PrivateRoute>
              <MainLayout>
                <RegisterStaff />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/announcements"
          element={
            <PrivateRoute>
              <MainLayout>
                <Announcements />
              </MainLayout>
            </PrivateRoute>
          }
        />



        {/* 404 fallback */}
        <Route path="*" element={<div className="p-6">404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
