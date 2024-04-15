import React from "react";
import Movie from "./Movie";
function Movies({
  movies,
  showTitle = true,
  searchedTitle = false,
  resultsTitle = false,
  landing = true,
}) {
  const moviesArray = movies || [];

  return (
    <div className="overflow-hidden bg-gray-900">
      {showTitle && (
        <h1 className="text-2xl lg:text-4xl lg:py-4 text-center py-2 font-Poppins">
          Popular <span className="text-teal-500">Movies</span>
        </h1>
      )}

      {resultsTitle && moviesArray.length > 0 && (
        <h1 className="text-2xl lg:text-4xl lg:py-4 text-center py-2 font-Poppins">
          Results for{" "}
          <span className="text-teal-500">
            "{searchedTitle && searchedTitle}"
          </span>
        </h1>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 justify-center items-center">
        {moviesArray.length > 0 ? (
          moviesArray.map((movie, index) => (
            <Movie movies={movies} index={index} key={movie.id} />
          ))
        ) : (
          <div className="flex justify-center items-center w-screen">
            {moviesArray.length === 0 && !landing && (
              <h1 className="text-2xl lg:text-4xl lg:py-4 text-center py-2 font-Poppins">
                No Results found for{" "}
                <span className="text-teal-500">"{searchedTitle}"</span>
              </h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Movies;
