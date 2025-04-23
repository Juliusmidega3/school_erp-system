import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import RegisterStudent from "./pages/students/RegisterStudent";
import StudentList from "./pages/students/StudentList";
import RegisterTeacher from "./pages/teachers/RegisterTeacher";
import TeacherList from "./pages/teachers/TeacherList";
import RegisterStaff from "./pages/staff/RegisterStaff";
import StaffList from "./pages/staff/StaffList";
import WelcomePage from "./pages/WelcomePage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import Announcements from "./pages/announcements/Announcements";
import TeacherLogin from "./pages/teachers/TeacherLogin";
import StudentLogin from "./pages/students/StudentLogin";
import TeacherDashboard from "./pages/teachers/TeacherDashboard";

// Layout & Route Guards
import PrivateRoute from "./components/PrivateRoute";
import TeacherRoute from "./components/TeacherRoute"; // ⬅️ NEW
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />

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

        {/* Teacher-only Dashboard */}
        <Route
          path="/teacher-dashboard"
          element={
            <TeacherRoute>
              <MainLayout>
                <TeacherDashboard />
              </MainLayout>
            </TeacherRoute>
          }
        />

        {/* 404 fallback */}
        <Route path="*" element={<div className="p-6">404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
