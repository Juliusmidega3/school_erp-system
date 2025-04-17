import React from "react";
import  { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import RegisterStudent from "./pages/students/RegisterStudent"

function App (){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterStudent/>} />
      </Routes>
    </Router>
  )
}

export default App;