import React, { useState } from "react";
import StudentForm from "../../components/StudentForm";
import api from "../../services/api"

const RegisterStudent = () => {
    const [student, setStudent] = useState({
        name: "",
        gender: "",
        date_of_birth: "",
        admission_number: "",
        guardian_phone: "",
        guardian_name: ""
    })
    const handleChange = (e) => {
        e.preventDefault();
        api.post("students/", student).
        then(
            (res) => {
                alert("Student registered successfully!");
                setStudent({
                  name: "",
                  gender: "",
                  date_of_birth: "",
                  admission_number: "",
                  guardian_phone: "",
                  guardian_name: ""
                });                
            }
        ).catch(
            (err) => {
                if (err.response) {
                    alert("Error:" + JSON.stringify(err.response.data));
                } else {
                    console.error ("Error:", err.message);
                }
            }
        );
    };

    return (
        <div className="flex justify-center mt-10">
            <StudentForm
                student={student}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}

export default RegisterStudent;