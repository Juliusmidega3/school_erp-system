import { useState } from "react";
import api from "../../services/api"
const StudentForm = ({onSuccess}) => {
    const [formData, setFormData] = useState(
        {
            first_name: "",
            last_name: "",
            class_enrolled: "",
            guardian_name: "",
            guardian_phone: ""
        }
    )
    const handleChange = (e)=> {
        setFormData(
            (prev) =>({
                ...prev,
                [e.target.name]: e.target.value
            })
        )
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await api.post("students/", formData);
            alert("student added successfully!");
            setFormData({
                first_name: "",
                last_name: "",
                class_enrolled: "",
                guardian_name: "",
                guardian_phone: ""
            });
            onSuccess();
        } catch (err){
            console.error(err);
            alert("Error adding students")
        }
    }

    return(
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Register New Student</h2>
            {
                ["first_name","last_name","class_enrolled","guardian_name","guardian_phone"].
                map(
                    (field) => (
                        <input
                         key={field}
                         name={field}
                         value={FormData[field]}
                         onChange={handleChange}
                         placeholder={field.replace("_", " ").toUpperCase()}
                         className="w-full p-2 border rounded"
                         required
                        />
                    )
                )
            }
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
    
            </button>
        </form>
    )
}

export default StudentForm;