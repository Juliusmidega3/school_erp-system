import React from "react";
import logo from "../assets/faulu-logo.png";

function LogoText() {
  return (
    <div className="px-4 py-3 bg-white rounded-md flex items-center">
      <img
        src={logo}
        alt="Faulu School Logo"
        className="h-20 w-auto object-contain"
      />
    </div>
  );
}

export default LogoText;
