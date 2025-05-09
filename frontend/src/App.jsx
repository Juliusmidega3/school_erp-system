import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import WelcomePage from "./pages/WelcomePage";
import AdminLogin from "./pages/admin/AdminLogin";
import RegisterStaff from "./pages/staff/RegisterStaff";
import StaffList from "./pages/staff/StaffList";
import RegisterStudent from "./pages/student/RegisterStudent";
import StudentList from "./pages/student/StudentList";
import RegisterTeacher from "./pages/teacher/RegisterTeacher";
import TeacherList from "./pages/teacher/TeacherList";
import Dashboard from "./pages/Dashboard";
import Announcements from "./pages/announcements/Announcements";

// Fees Pages
import FeesDashboard from "./pages/fees/FeesDashboard";
import AddPayment from "./pages/fees/AddPayment";
import FeeStructure from "./pages/fees/FeeStructure";
import StudentFeeProfile from "./pages/fees/StudentFeeProfile";

// Layout & Route Guards
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/MainLayout";

// Student Portal
import StudentLogin from "./pages/student/StudentLogin";
import StudentDashboard from "./pages/student/StudentDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />

        {/* Protected Admin Routes */}
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

          {/* Fees Routes */}
          <Route path="fees" element={<FeesDashboard />} />
          <Route path="fees/add-payment" element={<AddPayment />} />
          <Route path="fees/structure" element={<FeeStructure />} />
          <Route path="fees/student/:studentId" element={<StudentFeeProfile />} />
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<div className="p-6">404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
