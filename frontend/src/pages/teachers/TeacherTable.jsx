import React from "react";

const TeacherTable = ({ teachers, onEdit, onDelete }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Teacher List</h2>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-3 py-2">#</th>
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
          {teachers.length ? (
            teachers.map((teacher, i) => (
              <tr key={teacher.id}>
                <td className="border px-2 py-1 text-center">{i + 1}</td>
                <td className="border px-2 py-1">{teacher.first_name} {teacher.last_name}</td>
                <td className="border px-2 py-1">{teacher.class_enrolled}</td>
                <td className="border px-2 py-1">{teacher.date_of_birth}</td>
                <td className="border px-2 py-1">{teacher.gender}</td>
                <td className="border px-2 py-1">{teacher.guardian_name}</td>
                <td className="border px-2 py-1">{teacher.guardian_phone}</td>
                <td className="border px-2 py-1 space-x-2 text-center">
                  <button onClick={() => onEdit(teacher)} className="bg-yellow-400 text-white px-3 py-1 rounded">Edit</button>
                  <button onClick={() => onDelete(teacher.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="8" className="text-center py-3">No teachers found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherTable;
