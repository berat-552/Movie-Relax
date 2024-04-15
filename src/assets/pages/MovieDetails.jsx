import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { AiFillStar } from "react-icons/ai";
import { FaArrowLeft, FaYoutube, FaTimes } from "react-icons/fa";
import dummyImage from "../images/dummy.jpg";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  async function getMovie() {
    try {
      // pass id to the url, which is then retrieved by the backend with req.params.id
      const apiUrl = `https://express-backend-movie-relax.onrender.com/movies/${encodeURIComponent(
        id
      )}`;

      const response = await axios.get(apiUrl);

      const movieData = response.data;
      setMovie(movieData);
    } catch (error) {
      // Handle the error
      console.error("Error fetching movie details:", error.message);
    }
  }

  useEffect(() => {
    getMovie();
    window.scrollTo({
      top: 25,
      behavior: "smooth",
    });
  }, [id]);

  function calculateStars() {
    const stars = [];
    const voteRating = movie.vote_average;
    const maxRating = 10;
    const numStars = 10;
    const filledStars = Math.floor((voteRating / maxRating) * numStars);

    // pushes stars into the array until index is larger (resembles rating)
    for (let i = 0; i < numStars; i++) {
      const starKey = `${movie.id}-star-${i}`;
      if (i < filledStars) {
        stars.push(<AiFillStar key={starKey} className="text-teal-500" />);
      }
    }

    return stars;
  }

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false); // set loading state to false after delay
    }, 1250);

    // clean up the timer on unmount
    return () => clearTimeout(loadingTimer);
  }, []);

  function randomNum() {
    return Math.floor(Math.random() * 99999);
  }

  return (
    <div
      className="bg-gray-900 min-h-screen overflow-hidden text-white"
      key={`${movie.id}-${randomNum()}`}
    >
      <div className="flex flex-col items-center justify-center text-xl">
        {isLoading ? (
          <div>
            <Skeleton
              className="mx-auto rounded-lg"
              variant="rectangular"
              height={600}
              width={500}
              animation="wave"
              sx={{
                bgcolor: "grey.800",
              }}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center relative">
            <Link
              to="/"
              className="flex items-center justify-center text-2xl hover:scale-105 transition-all group md:absolute left-5 top-0"
            >
              <FaArrowLeft className="mx-3 text-2xl sm:text-3xl sm:mx-4 md:text-4xl md:mx-5 lg:text-5xl lg:mx-6" />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-sm sm:text-md md:text-lg">
                Home
              </span>
            </Link>

            <h1 className="text-2xl m-4 font-bold text-teal-500 lg:text-4xl lg:m-6">
              {movie && movie.title}
            </h1>
            <div className="lg:flex lg:justify-center lg:items-center">
              <img
                src={
                  (movie &&
                    movie.poster_path &&
                    `https://image.tmdb.org/t/p/w500${movie.poster_path}`) ||
                  dummyImage
                }
                className="rounded-lg max-w-xs w-full md:max-w-sm lg:ml-3 mx-auto"
              />

              <div className="flex items-center justify-center flex-col lg:justify-start lg:items-start lg:text-2xl xl:items-center">
                <div className="text-center lg:text-start m-3 my-4 text-md leading-6 xl:text-center">
                  <p>{movie && movie.overview}</p>
                </div>
                {movie && movie.trailerUrl ? (
                  <button
                    onClick={() => setShowTrailer(!showTrailer)}
                    className="flex items-center"
                    target="_blank"
                  >
                    Trailer:
                    <FaYoutube className="ml-2 text-5xl text-teal-500 hover:scale-105 active:scale-95 transition-all" />
                  </button>
                ) : (
                  <p className="text-teal-500">No Trailer Found</p>
                )}

                {showTrailer && (
                  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-75">
                    <div className="fixed">
                      <div>
                        <FaTimes
                          className="text-3xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
                          onClick={() => setShowTrailer(false)}
                        />
                      </div>
                      <iframe
                        className="relative w-96 h-52 sm:w- sm:h-54"
                        title="Movie Trailer"
                        src={movie.trailerUrl}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}

                <div className="lg:pl-4 my-2">
                  <p className="mb-2">
                    Release Date: {movie && movie.release_date}
                  </p>
                </div>
                <div className="lg:pl-4 my-2">
                  {movie?.genres &&
                    movie.genres.length > 0 &&
                    movie.genres.map((genre, index, arr) => (
                      <span className="text-teal-500 ml-1" key={genre.id}>
                        {genre.name}

                        {index !== arr.length - 1 && ","}
                      </span>
                    ))}
                </div>
                <div className="my-2 lg:pl-4">
                  <span>Runtime: {movie.runtime} Mins</span>
                </div>
                {/* renders each language with it's english name and a comma between each */}
                <div className="my-2 lg:pl-4">
                  {movie &&
                    movie.spoken_languages &&
                    movie.spoken_languages.map((language, index, arr) => (
                      <span className="ml-1" key={randomNum()}>
                        {language.english_name}
                        {index !== arr.length - 1 && ","}
                      </span>
                    ))}
                </div>
                <div className="flex items-center justify-center text-teal-500 text-2xl lg:pl-4 lg:items-center lg:justify-center my-2">
                  {/* mapping over the stars array that is returned from the function and rendering */}
                  {calculateStars().map((star, index) => (
                    <span key={index}>{star}</span>
                  ))}
                  <div>
                    <span className="ml-2">
                      {movie &&
                        movie.vote_average &&
                        movie.vote_average.toFixed(1)}
                      /10
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
