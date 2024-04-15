import React from "react";

function ResultsTitle(searchTerm) {
  return (
    <div>
      <h1 className=" text-2xl lg:text-4xl lg:py-4 text-center py-2 font-Poppins">
        Results for <span className="text-teal-500">"{searchTerm}"</span>
      </h1>
    </div>
  );
}

export default ResultsTitle;
