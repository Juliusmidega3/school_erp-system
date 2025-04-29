import React from "react";

const StudentTable = ({ students, onEdit, onDelete }) => {
  return (
    <div className="mt-6">
      
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4">#</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">DOB</th>
            <th className="py-2 px-4">Gender</th>
            <th className="py-2 px-4">Parent's Name</th>
            <th className="py-2 px-4">Parent's Tel</th>
            <th className="py-2 px-4">Enrolled Class</th>
            <th className="py-2 px-4">Admission No</th>  
            <th className="border px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length ? (
            students.map((student, i) => (
              <tr key={student.id}>
                <td className="border px-2 py-1 text-center">{i + 1}</td>
                <td className="border px-2 py-1">{student.first_name} {student.last_name}</td>
                <td className="border px-2 py-1">{student.date_of_birth}</td>
                <td className="border px-2 py-1">{student.gender}</td>
                <td className="border px-2 py-1">{student.parent_name}</td>
                <td className="border px-2 py-1">{student.parent_phone}</td>
                <td className="border px-2 py-1">{student.enrolled_class}</td>
                <td className="border px-2 py-1">{student.admission_number}</td>
                <td className="border px-2 py-1 space-x-2 text-center">
                  <button onClick={() => onEdit(student)} className="bg-yellow-400 text-white px-3 py-1 rounded">Edit</button>
                  <button onClick={() => onDelete(student.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="8" className="text-center py-3">No students found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
