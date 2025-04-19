import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Students
import RegisterStudent from "./pages/students/RegisterStudent";
import StudentList from "./pages/students/StudentList";

// Teachers
import RegisterTeacher from "./pages/teachers/RegisterTeacher";
import TeacherList from "./pages/teachers/TeacherList";

// Auth Pages
import WelcomePage from "./pages/WelcomePage"; // Admin login
import RegisterPage from "./pages/RegisterPage"; // Admin registration

// Dashboard
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <div className="p-4">
        <Routes>
          {/* Authentication */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Students */}
          <Route path="/students" element={<StudentList />} />
          <Route path="/students/register" element={<RegisterStudent />} />

          {/* Teachers */}
          <Route path="/teachers" element={<TeacherList />} />
          <Route path="/teachers/register" element={<RegisterTeacher />} />

          {/* 404 Fallback */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
