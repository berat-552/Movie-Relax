import React from "react";

function Copyright() {
  function year() {
    return new Date().getFullYear();
  }

  return (
    <div className="bg-gray-900 text-white font-medium p-2 py-6 overflow-hidden text-md md:text-lg lg:text-xl font-Poppins">
      <div className="flex justify-center items-center">
        <span className="mx-1">
          Copyright &copy; <span className="text-teal-500">Berat Dilki </span>
          {year()}
        </span>
      </div>
    </div>
  );
}

export default Copyright;
