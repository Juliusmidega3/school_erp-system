import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("adminToken") !== null;
  return isAuthenticated ? children : <Navigate to="/" />;
}

export default PrivateRoute;
