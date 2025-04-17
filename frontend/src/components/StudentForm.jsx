import React from "react";

const StudentForm = ({student, handleChange, handleSubmit }) =>(
    <form onSubmit={handleSubmit} className="w-1/2 bg-white p-6 rounded-lg shadow-lg" >
        <h2 className="text-2xl font-bold text-center mb-6"> Register Students</h2>
        <input
         type="text" 
         name="first_name"
         placeholder="First Name"
         value={student.first_name}
         onChange={handleChange}         
         className="w-full mb-4 p-2 border rounded"
         required
        />
        
        <input
         type="text" 
         name="last_name"
         placeholder="Last Name"
         value={student.last_name}
         onChange={handleChange}         
         className="w-full mb-4 p-2 border rounded"
         required
        />

        <input
         type="text" 
         name="class_enrolled"
         placeholder="Class Enrolled"
         value={student.class_enrolled}
         onChange={handleChange}         
         className="w-full mb-4 p-2 border rounded"
         required
        />


        <input
         type="text"
         name="admission_number"
         placeholder="Admission Number"
         value={student.admmission_number}
         onChange={handleChange}
         className="w-full mb-4 p-2 border rounded"
         required
        />

        <input
         type="date"
         name="date_of_birth"
         value={student.date_of_birth}
         onChange={handleChange}
         className="w-full mb-4 p-2 border rounded"
         required
        />
        
        <input
         type="text"
         name="guardian_name"
         value={student.guardian_name}
         placeholder="Guardian's Name"
         onChange={handleChange}
         className="w-full mb-4 p-2 border rounded" 
        />

        <input
         type="text"
         name="guardian_phone"
         value={student.guardian_phone}
         placeholder="Guardian'sPhone"
         onChange={handleChange}
         className="w-full mb-4 p-2 border rounded" 
        />

        <select
         name="gender"
         value={student.gender}
         onChange={handleChange}
         required
        >
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
        </select>
               
        <button
         type="submit" 
         className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-800 transition" >
            Register
        </button>

    </form>
);
 export default StudentForm;