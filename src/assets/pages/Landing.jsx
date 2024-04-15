import React, { useEffect, useState } from "react";
import Movies from "../components/Movies";
import axios from "axios";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function Landing({ index }) {
  const [moviesData, setMoviesData] = useState(null);
  const [topRatedMovies, setTopRatedMovies] = useState(null);
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);

  const toggleText = () => {
    setShowMore((prevShowMore) => !prevShowMore);
  };

  const options = {
    headers: {
      accept: "application/json",
    },
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // calling the backend to get movies and genres
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://express-backend-movie-relax.onrender.com/api/data",
          options
        );

        setMoviesData(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          "https://express-backend-movie-relax.onrender.com/api/genres"
        );
        setGenres(response.data.genres);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    const fetchTopRatedMovies = async () => {
      try {
        const response = await axios.get(
          "https://express-backend-movie-relax.onrender.com/top-rated"
        );
        setTopRatedMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    setTimeout(() => {
      fetchData();
      fetchGenres();
      fetchTopRatedMovies();
    }, 500);
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white font-normal lg:text-xl font-Poppins">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center">
          <Skeleton
            className="w-full m-auto rounded-lg"
            variant="rectangular"
            height={550}
            width={384}
            animation={"wave"}
            sx={{
              bgcolor: "grey.800",
            }}
          />

          <Skeleton
            className="w-2/3 m-auto rounded-md mt-4"
            variant="text"
            height={50}
            animation="wave"
            sx={{
              bgcolor: "grey.800",
            }}
          />

          <Skeleton
            className="w-1/2 m-auto rounded-md mt-4 mb-4"
            variant="text"
            height={50}
            animation="wave"
            sx={{
              bgcolor: "grey.800",
            }}
          />

          <Skeleton
            className="w-1/2 m-auto rounded-md mt-4 mb-4"
            variant="text"
            height={30}
            animation="wave"
            sx={{
              bgcolor: "grey.800",
            }}
          />
        </div>
      ) : (
        moviesData &&
        moviesData.length > 0 &&
        moviesData[index].poster_path !== null && (
          <div className="flex flex-col lg:flex-row justify-center items-center">
            <Link to={`/movies/${moviesData[index].id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${moviesData[index].poster_path}`}
                className="m-auto rounded-lg max-w-sm hover:-translate-y-2  transition-all lg:m-4 pt-4 cursor-pointer"
              />
            </Link>
            <div className="flex flex-col items-center justify-center">
              {showMore ? (
                <p className="p-5 text-center">
                  {moviesData[index].overview}{" "}
                  <button
                    className="text-teal-500 font-semibold"
                    onClick={toggleText}
                  >
                    Show Less
                  </button>
                </p>
              ) : (
                <p className="p-5 text-center">
                  {moviesData[index].overview.substring(0, 150)}
                  <button
                    className="text-teal-500 font-semibold"
                    onClick={toggleText}
                  >
                    {" "}
                    ...Read More
                  </button>
                </p>
              )}

              <p>
                Released:
                <span className="text-teal-500 ml-1">
                  {moviesData[index].release_date}
                </span>
              </p>

              {/* 1. The genres array is filtered using the filter method.

            2. The filter method takes a callback function that checks if the genre.id is present in the movies[index].genre_ids array using the includes method. This ensures that only genres with matching IDs are included in the filtered array.

            3. The filtered array is then mapped using the map method to render each genre 
            
            4.Commas are dynamically added if it isn't the last item in the array (so it doesn't add the extra comma at the end)
            */}

              <div className="flex py-2">
                {genres.length > 0 &&
                  genres
                    .filter((genre) =>
                      moviesData[index].genre_ids.includes(genre.id)
                    )
                    .map((genre, index, arr) => (
                      <p className="ml-1" key={genre.id}>
                        {genre.name}
                        {index !== arr.length - 1 && ","}
                      </p>
                    ))}
              </div>
            </div>
          </div>
        )
      )}

      <div className="h-1 bg-teal-500"></div>

      {/* POPULAR MOVIES, landing prop removes the 'No results found' bug on landing page */}
      <Movies movies={moviesData ? moviesData : []} landing={true} />

      {moviesData && (
        <>
          <div className="h-1 bg-teal-500"></div>

          <div className="overflow-hidden bg-gray-900">
            <h1 className="text-2xl lg:text-4xl lg:py-4 text-center py-2 font-Poppins">
              Top Rated <span className="text-teal-500">Movies</span>
            </h1>
          </div>
        </>
      )}
      {/* TOP RATED MOVIES */}
      <Movies
        movies={topRatedMovies ? topRatedMovies : []}
        landing={true}
        showTitle={false}
      />
      {moviesData && <Footer />}
    </div>
  );
}

export default Landing;
