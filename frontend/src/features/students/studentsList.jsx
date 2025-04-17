import { useEffect, useState } from "react";
import api from "../../services/api";

const StudentList = ()=>{
    const [students, setStudents] = useState([]);

    useEffect(() => {
        api.get("students/")
        .then((response) => setStudents(response.data))
        .catch((error)=> console.error("Error fetching the students", error));
    }, []);

    return(
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Student List</h2>
            {
                students.length === 0? (
                    <p>No students found</p>
                ): (
                    <ul className="space-y-4">
                        {
                            students.map((student)=>(
                                <li key={student.id} className="bg-white p-4 rounded shadow">
                                    <p>
                                        <strong>Name</strong>
                                        {student.first_name}{student.last_name}
                                    </p>
                                    <p>
                                        <strong>Class</strong>
                                        {student.class_enrolled}
                                    </p>
                                    <p>
                                        <strong>Guardian</strong>
                                        {student.guardian_name} ({student.guardian_phone})
                                    </p>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
        </div>
    )
};

export default StudentList;