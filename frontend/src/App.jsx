import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import RegisterStudent from "./pages/students/RegisterStudent";
import StudentList from "./pages/students/StudentList";
import RegisterTeacher from "./pages/teachers/RegisterTeacher";
import TeacherList from "./pages/teachers/TeacherList";
import WelcomePage from "./pages/WelcomePage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";

// Route Guard
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <div className="p-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/students"
            element={
              <PrivateRoute>
                <StudentList />
              </PrivateRoute>
            }
          />
          <Route
            path="/students/register"
            element={
              <PrivateRoute>
                <RegisterStudent />
              </PrivateRoute>
            }
          />
          <Route
            path="/teachers"
            element={
              <PrivateRoute>
                <TeacherList />
              </PrivateRoute>
            }
          />
          <Route
            path="/teachers/register"
            element={
              <PrivateRoute>
                <RegisterTeacher />
              </PrivateRoute>
            }
          />

          {/* 404 fallback */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
