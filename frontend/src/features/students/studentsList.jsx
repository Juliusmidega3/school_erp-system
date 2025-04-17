import { useEffect, useState } from "react";
import api from "../../services/api";
import StudentForm from "./StudentForm";

const StudentList = ()=>{
    const [students, setStudents] = useState([]);

    const fetchStudents = ()=>{
        api.get("students/").
        then((res) => setStudents(res.data)).
        catch((err)=> console.error(err));
    };
    useEffect(
        ()=>{
            fetchStudents();
        }, []
    )

    return (
        <div className="p-4">
            <StudentForm onSuccess={fetchStudents} />
            <h2 className="text-2xl font-bold my-4"> Students List</h2>
            {
                students.length === 0 ? (
                    <p>No students found. </p>
                ) : (
                    <ul className="space-y-4">
                        {
                            students.map(
                                (student) => (
                                    <li key={student.id} className="bg-white p-4 rounded shadow">
                                        <p><strong>Name</strong>{student.first_name} {student.last_name}</p>
                                        <p><strong>Class</strong> {student.class_enrolled}</p>
                                        <p><strong>Guardian</strong> {student.guardian_name} ({student.guardian_phone})</p>
                                    </li>
                                )
                            )
                        }
                    </ul>
                )
            }
        </div>
    )
}

export default StudentList;