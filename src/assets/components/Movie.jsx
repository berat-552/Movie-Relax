import React, { useEffect, useState } from "react";
import dummyImage from "../images/dummy.jpg";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
function Movie({ movies, index }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false); // set loading state to false after delay
    }, 1250);

    // clean up the timer on unmount
    return () => clearTimeout(loadingTimer);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center px-4 py-2 sm:w-full max-w-md m-auto text-center">
          <Skeleton
            variant="rectangular"
            height={400}
            width={300}
            animation="wave"
            sx={{
              bgcolor: "grey.800",
            }}
          />
          <Skeleton
            variant="text"
            height={30}
            width={300}
            animation="wave"
            sx={{
              bgcolor: "grey.800",
            }}
          />
        </div>
      ) : (
        movies.length > 0 && (
          <Link to={`/movies/${movies[index].id}`}>
            <div
              key={movies[index].id}
              className="flex flex-col items-center px-4 py-2 cursor-pointer hover:-translate-y-2 duration-150 ease-in sm:w-full max-w-md m-auto text-center"
            >
              <img
                src={
                  movies[index].poster_path
                    ? `https://image.tmdb.org/t/p/w500${movies[index].poster_path}`
                    : dummyImage
                }
                className="rounded-2xl max-w-xs sm:w-72 md:w-56 lg:w-80"
              />
              <p className="py-2 text-md">{movies[index].title}</p>
            </div>
          </Link>
        )
      )}
    </>
  );
}

export default Movie;
