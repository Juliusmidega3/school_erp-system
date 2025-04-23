import React from "react";
import { Navigate, useLocation } from "react-router-dom";

/**
 * Protects teacher-only routes.
 * Requires "teacherToken" to be present in localStorage.
 */
function TeacherRoute({ children }) {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("teacherToken") !== null;

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/teacher-login" state={{ from: location }} replace />
  );
}

export default TeacherRoute;
