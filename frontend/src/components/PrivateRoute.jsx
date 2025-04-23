import React from "react";
import { Navigate, useLocation } from "react-router-dom";

/**
 * Protects admin-only routes.
 * Requires "adminToken" to be present in localStorage.
 */
function PrivateRoute({ children }) {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("adminToken") !== null;

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/register" state={{ from: location }} replace />
  );
}

export default PrivateRoute;
