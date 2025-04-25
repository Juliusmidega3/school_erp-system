import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";
import LogoText from "../../components/LogoText";

const RegisterStudent = () => {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [classes, setClasses] = useState([]);
  const formRef = useRef();

  // Fetch all students
  const fetchStudents = async () => {
    try {
      const res = await axiosInstance.get("/students/");
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Fetch all classes for the dropdown
  const fetchClasses = async () => {
    try {
      const res = await axiosInstance.get("/classes/");
      setClasses(res.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchClasses(); // Fetch classes when the component mounts
  }, []);

  // Handle editing a student
  const handleEdit = (student) => {
    setEditStudent(student);
    setShowForm(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  // Handle deleting a student
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axiosInstance.delete(`/students/${id}/`);
        fetchStudents();
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  const handleCancel = () => {
    setEditStudent(null);
    setShowForm(false);
  };

  const handleAddNew = () => {
    setEditStudent(null);
    setShowForm(true);
    window.scrollTo({ top: document.body.scrollIntoView(), behavior: "smooth" });
  };

  // Handle submit for both creating and updating students
  const handleFormSubmit = async (formData, id) => {
    const isCreating = !id;

    const payload = {
      user: {
        email: formData.email,
        first_name: formData.first_name || '',
        last_name: formData.last_name || '',
        ...(isCreating && { password: formData.password }), // include password only on creation
      },
      class_id: formData.class_id, // Use class_id instead of class_enrolled
      gender: formData.gender,
      date_of_birth: formData.date_of_birth,
      admission_number: formData.admission_number,
      admission_date: formData.admission_date,
      guardian_name: formData.guardian_name,
      guardian_phone: formData.guardian_phone,
    };

    console.log("Payload being sent:", payload);

    try {
      if (isCreating) {
        await axiosInstance.post("/students/", payload);
      } else {
        await axiosInstance.put(`/students/${id}/`, payload);
      }

      fetchStudents();
      setEditStudent(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error saving student:", error.response?.data || error);
    }
  };

  return (
    <div>
      <LogoText />
      {showForm && (
        <div className="mt-10 bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto border border-gray-200">
          <StudentForm
            key={editStudent ? editStudent.id : Date.now()}
            initialData={editStudent}
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
            classes={classes} // Pass available classes to the form
          />
        </div>
      )}

      <div className="flex justify-between mt-3 items-center">
        <h2 className="text-xl font-bold">Student List</h2>
        <button
          onClick={handleAddNew}
          className="bg-white shadow p-3 rounded-lg hover:shadow-lg transition border border-gray-200 text-center"
        >
          ➕ Enroll a student
        </button>
      </div>

      <StudentTable students={students} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default RegisterStudent;
