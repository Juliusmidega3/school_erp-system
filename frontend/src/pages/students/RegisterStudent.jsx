import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";
import LogoText from "../../components/LogoText";


const RegisterStudent = () => {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef();

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:8000/api/students/");
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (formData, id) => {
    if (id) {
      await axios.put(`http://localhost:8000/api/students/${id}/`, formData);
    } else {
      await axios.post("http://localhost:8000/api/students/", formData);
    }
    fetchStudents();
    formRef.current.resetForm();
    setEditStudent(null);
  };

  const handleEdit = (student) => {
    setEditStudent(student);
    setShowForm(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`http://localhost:8000/api/students/${id}/`);
        fetchStudents();
      } catch (error) {
        console.error("Error deleting Teacher:", error);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditStudent(null);
  };
  const handleAddNew = () => {
    setEditStudent(null);
    setShowForm(true);
    window.scrollTo({ top: document.body.scrollIntoView, behavior: "smooth" });
  };

  const handleFormSubmit = async (formData, id) => {
    try {
      if (id) {
        await axios.put(`http://127.0.0.1:8000/api/students/${id}/`, formData);
      } else {
        await axios.post("http://127.0.0.1:8000/api/students/", formData);
      }
      fetchStudents();
      setEditStudent(null); // clear edit mode
      // setShowForm(false); ❌ leave form open after submit
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };
  return (
    <div>       
      <LogoText  />  
      {showForm && (
        <div className="mt-10 bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto border border-gray-200">
          <StudentForm
            key={editStudent ? editStudent.id : Date.now()}
            initialData={editStudent}
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
          />
        </div>
      )} 
      <div className="flex justify-between mt-3 items-center">
        <h2 className="text-xl font-bold  ">Student List</h2>
        <button onClick={handleAddNew} className="bg-white shadow p-3 rounded-lg hover:shadow-lg transition border border-gray-200 text-center">➕ Enroll a student</button> 
      </div>  
      <StudentTable students={students} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default RegisterStudent;
