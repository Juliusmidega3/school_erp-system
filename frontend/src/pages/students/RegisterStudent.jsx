import React, { useRef } from "react";
import StudentForm from "../../components/StudentForm";
import axios from "axios";

const RegisterStudent = () => {
  const formRef = useRef();

  const handleSubmit = async (formData) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/students/", formData);
      console.log("Student registered:", response.data);
      alert("Student registered successfully!");

      // Reset form after success
      if (formRef.current) {
        formRef.current.resetForm();
      }
    } catch (error) {
      console.error("Error registering student", error);
      if (error.response && error.response.status === 400) {
        const errorData = error.response.data;
        const messages = Object.entries(errorData)
          .map(([field, errors]) => `${field}: ${errors.join(", ")}`)
          .join("\n");
        alert("Form submission failed:\n\n" + messages);
      } else {
        alert("Unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-b-lg shadow-md w-1/2">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-4">Register Students</h2>
        
        {/* Student Form */}
        <StudentForm ref={formRef} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default RegisterStudent;
