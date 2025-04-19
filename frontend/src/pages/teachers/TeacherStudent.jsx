import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";

const RegisterStudent = () => {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
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
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/api/students/${id}/`);
    fetchStudents();
  };

  const handleCancel = () => {
    setEditStudent(null);
    formRef.current.resetForm();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        {editStudent ? "Edit Student" : "Register Student"}
      </h1>
      <StudentForm
        ref={formRef}
        initialData={editStudent}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
      <StudentTable students={students} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default RegisterStudent;
