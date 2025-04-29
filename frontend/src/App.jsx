import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import WelcomePage from "./pages/WelcomePage";
import AdminLogin from "./pages/admin/AdminLogin"
import RegisterStaff from "./pages/staff/RegisterStaff";
import StaffList from "./pages/staff/StaffList";
import RegisterStudent from "./pages/student/RegisterStudent";
import StudentList from "./pages/student/StudentList";
import RegisterTeacher from "./pages/teacher/RegisterTeacher";
import TeacherList from "./pages/teacher/TeacherList";
import Dashboard from "./pages/Dashboard";
import Announcements from "./pages/announcements/Announcements";

// Layout & Route Guards
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/admin-login" element={<AdminLogin />} /> {/* <-- new */}

        {/* Protected Routes */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="staffs" element={<StaffList />} />
          <Route path="staffs/register" element={<RegisterStaff />} />
          <Route path="students" element={<StudentList />} />
          <Route path="students/register" element={<RegisterStudent />} />
          <Route path="teachers" element={<TeacherList />} />
          <Route path="teachers/register" element={<RegisterTeacher />} />
          <Route path="announcements" element={<Announcements />} />
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<div className="p-6">404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
