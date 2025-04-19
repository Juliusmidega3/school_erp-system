import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterStudent from "./pages/students/RegisterStudent";
import StudentList from "./pages/students/StudentList";
import RegisterTeacher from "./pages/teachers/RegisterTeacher";
import TeacherList from "./pages/teachers/TeacherList";

function App() {
  return (
    <Router>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<TeacherList />} />
          <Route path="/teachers" element={<TeacherList />} />
          <Route path="/teachers/register" element={<RegisterTeacher />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/students/register" element={<RegisterStudent />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
