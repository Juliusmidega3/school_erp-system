import React from "react";
import  { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import RegisterStudent from "./pages/students/RegisterStudent"
import StudentList from "./pages/students/StudentList";

function App (){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterStudent/>} />
        <Route path="/students" element={<StudentList/>} />
      </Routes>
    </Router>
  )
}

export default App;