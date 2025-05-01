import React from "react";

const StudentTable = ({ students, onEdit, onDelete }) => {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border border-gray-300 text-sm rounded-lg shadow-md">
        <thead className="bg-[#065f46] text-white">
          <tr>
            <th className="py-3 px-4 text-left">#</th>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">DOB</th>
            <th className="py-3 px-4 text-left">Gender</th>
            <th className="py-3 px-4 text-left">Parent's Name</th>
            <th className="py-3 px-4 text-left">Parent's Tel</th>
            <th className="py-3 px-4 text-left">Enrolled Class</th>
            <th className="py-3 px-4 text-left">Admission No</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length ? (
            students.map((student, i) => (
              <tr key={student.id} className="hover:bg-gray-100 transition-all ease-in-out duration-200">
                <td className="border px-3 py-2 text-center">{i + 1}</td>
                <td className="border px-3 py-2">{student.first_name} {student.last_name}</td>
                <td className="border px-3 py-2">{student.date_of_birth}</td>
                <td className="border px-3 py-2">{student.gender}</td>
                <td className="border px-3 py-2">{student.parent_name}</td>
                <td className="border px-3 py-2">{student.parent_phone}</td>
                <td className="border px-3 py-2">{student.enrolled_class}</td>
                <td className="border px-3 py-2">{student.admission_number}</td>
                <td className="border px-3 py-2 text-center space-x-2">
                  <button
                    onClick={() => onEdit(student)}
                    lassName="bg-yellow-400 text-white px-4 py-1 rounded-md shadow hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(student.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center py-3 text-gray-500">No students found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
