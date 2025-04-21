import React from "react";

const StaffTable = ({ staffs, onEdit, onDelete }) => {
  return (
    <div className="mt-6">
      
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-3 py-2">#</th>
            <th className="border px-3 py-2">Name</th>
            <th className="border px-3 py-2">Gender</th>
            <th className="border px-3 py-2">Email</th>
            <th className="border px-3 py-2">Phone</th>
            <th className="border px-3 py-2">Marital</th>
            <th className="border px-3 py-2">Role</th>
            <th className="border px-3 py-2">Empl Date</th>
            <th className="border px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffs.length ? (
            staffs.map((staff, i) => (
              <tr key={staff.id}>
                <td className="border px-2 py-1 text-center">{i + 1}</td>
                <td className="border px-2 py-1">{staff.first_name} {staff.last_name}</td>
                <td className="border px-2 py-1">{staff.gender}</td>
                <td className="border px-2 py-1">{staff.email}</td>
                <td className="border px-2 py-1">{staff.phone_number}</td>
                <td className="border px-2 py-1">{staff.marital_status}</td>
                <td className="border px-2 py-1">{staff.role}</td>
                <td className="border px-2 py-1">{staff.date_of_employment}</td>
                <td className="border px-2 py-1 space-x-2 text-center">
                  <button onClick={() => onEdit(staff)} className="bg-yellow-400 text-white px-3 py-1 rounded">Edit</button>
                  <button onClick={() => onDelete(staff.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="8" className="text-center py-3">No staffs found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StaffTable;
