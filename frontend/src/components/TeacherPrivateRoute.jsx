import React from "react";
import { Route, Navigate } from "react-router-dom";

function TeacherPrivateRoute({ element, ...rest }) {
  const token = localStorage.getItem("teacherToken");

  return (
    <Route
      {...rest}
      element={token ? element : <Navigate to="/teacher-login" />}
    />
  );
}

export default TeacherPrivateRoute;
