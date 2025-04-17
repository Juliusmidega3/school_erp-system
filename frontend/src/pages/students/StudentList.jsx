import React, { useEffect, useState } from "react";
import api from "../../services/api"

const StudentList = () => {
    const [students, setStudents] = useState([]);

    useEffect(
        () => {
            api.get("students/")
            .then((res)=> {
                setStudents(res.data);
            }).catch((err) =>{
                console.error("Error fetching the students", err)
            });
        }, []
    ); 

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Registered Students</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-grey-100">
                    <tr>
                        <th className="py-2 px-4 border">First Name</th>
                        <th className="py-2 px-4 border">Last Name</th>
                        <th className="py-2 px-4 border">Gender</th>
                        <th className="py-2 px-4 border">Class</th>
                        <th className="py-2 px-4 border">Admission Number</th>
                        <th className="py-2 px-4 border">D.O.B</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.map((s)=>(
                            <tr key={s.id} className="text-center">
                                <td className="py-2 px-4 border">{s.first_name}</td>
                                <td className="py-2 px-4 border">{s.last_name}</td>
                                <td className="py-2 px-4 border">{s.gender}</td>
                                <td className="py-2 px-4 border">{s.class_enrolled}</td>
                                <td className="py-2 px-4 border">{s.admission_number}</td>
                                <td className="py-2 px-4 border">{s.date_of_birth}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default StudentList