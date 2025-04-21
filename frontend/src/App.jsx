import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RegisterStudent from "./pages/students/RegisterStudent";
import StudentList from "./pages/students/StudentList";
import RegisterTeacher from "./pages/teachers/RegisterTeacher";
import TeacherList from "./pages/teachers/TeacherList";
import RegisterStaff from "./pages/staff/RegisterStaff";
import StaffList from "./pages/staff/StaffList";
import WelcomePage from "./pages/WelcomePage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";

import PrivateRoute from "./components/PrivateRoute";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
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
          path="/students"
          element={
            <PrivateRoute>
              <MainLayout>
                <StudentList />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/students/register"
          element={
            <PrivateRoute>
              <MainLayout>
                <RegisterStudent />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/teachers"
          element={
            <PrivateRoute>
              <MainLayout>
                <TeacherList />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/teachers/register"
          element={
            <PrivateRoute>
              <MainLayout>
                <RegisterTeacher />
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

        {/* TODO: Add /announcements and /calendar route soon */}

        {/* 404 fallback */}
        <Route path="*" element={<div className="p-6">404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
