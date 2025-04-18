import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterStudent from "./pages/students/RegisterStudent";
import StudentList from "./pages/students/StudentList";

function App() {
  return (
    <Router>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/students" element={<RegisterStudent />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

