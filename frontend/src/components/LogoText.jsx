import React from "react"
import logo from "../assets/faulu-logo.png"

function LogoText (){
    return (
        <div className="flex items-center gap-4 px-6 py-4 shadow bg-white">
            <img src={logo} alt="Faulu School Logo" className="h-12 w-12 object-contain" />
            <h1 className="text-3xl font-bold text-[#065f46]">
                 Faulu School Management System
            </h1>
        </div>
    )
}



export default LogoText