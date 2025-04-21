import React from "react";

const StudentTable = ({ students, onEdit, onDelete }) => {
  return (
    <div className="mt-6">
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-3 py-2">#</th>
            <th className="border px-3 py-2">Username</th>
            <th className="border px-3 py-2">Name</th>
            <th className="border px-3 py-2">Class</th>
            <th className="border px-3 py-2">DOB</th>
            <th className="border px-3 py-2">Gender</th>
            <th className="border px-3 py-2">Guardian</th>
            <th className="border px-3 py-2">Phone</th>
            <th className="border px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length ? (
            students.map((student, i) => (
              <tr key={student.id}>
                <td className="border px-2 py-1 text-center">{i + 1}</td>
                <td className="border px-2 py-1 text-center">{student.user?.username || "-"}</td>
                <td className="border px-2 py-1 text-center">
                  {student.first_name} {student.last_name}
                </td>
                <td className="border px-2 py-1 text-center">{student.class_enrolled}</td>
                <td className="border px-2 py-1 text-center">{student.date_of_birth}</td>
                <td className="border px-2 py-1 text-center">{student.gender}</td>
                <td className="border px-2 py-1 text-center">{student.guardian_name}</td>
                <td className="border px-2 py-1 text-center">{student.guardian_phone}</td>
                <td className="border px-2 py-1 space-x-2 text-center">
                  <button
                    onClick={() => onEdit(student)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(student.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center py-3">
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
