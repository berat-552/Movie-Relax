import React, { useEffect, useState } from "react";
import axios from "axios";
import Movies from "../components/Movies";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Footer from "../components/Footer";
function MoreMovies() {
  const [movies, setMovies] = useState([]);
  // default page = 1
  const [currentPage, setCurrentPage] = useState(2);
  const [originalMovies, setOriginalMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  async function fetchMoreMovies(page) {
    const response = await axios.get(
      `https://express-backend-movie-relax.onrender.com/more-movies?page=${page}`
    );

    const moreMoviesData = response.data;
    setMovies(moreMoviesData);
    setOriginalMovies(moreMoviesData);
  }

  function nextPage() {
    setCurrentPage((prevPageNum) => prevPageNum + 1);
  }

  function prevPage() {
    setCurrentPage((prevPageNum) => prevPageNum - 1);
  }

  // handles filtering of movies by genre
  function handleGenreChange(e) {
    // genre id
    const selectedGenre = e.target.value;

    // e.g. first select - action (8 elements)
    // second select - history (2 elements)
    // go back to - action, (2 elements) avoid bug
    // original list prevents this behaviour
    if (selectedGenre === "" || selectedGenre === null) {
      // If no genre is selected, reset the movies to the original list
      setMovies(originalMovies);
    } else {
      // Filter movies by genre using the selected genre ID
      // each movie object contains an array 'genre_ids', if selectedGenre exists within it, it will be stored in filtered movies
      const filteredMovies = originalMovies.filter((movie) =>
        movie.genre_ids.includes(+selectedGenre)
      );
      setMovies(filteredMovies);
    }
  }

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          "https://express-backend-movie-relax.onrender.com/api/genres"
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  // more movies are fetched everytime the page changes
  useEffect(() => {
    fetchMoreMovies(currentPage);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  return (
    <div className="bg-gray-900 min-h-screen text-white font-normal lg:text-xl font-Poppins overflow-hidden">
      <div className="flex justify-end items-center my-4 mx-10 text-sm sm:text-lg md:text-xl">
        <select
          className="bg-gray-900 rounded-lg focus:outline-none"
          onChange={(e) => handleGenreChange(e)}
        >
          {/* dynamically adding genres */}
          <option value="" defaultValue="">
            - Select Genre -
          </option>
          {genres &&
            genres.map((genre) => (
              <option value={genre.id} key={genre.id}>
                {genre.name}
              </option>
            ))}
        </select>
      </div>

      {movies.length === 0 ? (
        <h1 className="flex items-center justify-center text-2xl md:text-3xl lg:text-4xl mb-6 text-white">
          No movies
        </h1>
      ) : (
        <Movies movies={movies} showTitle={false} />
      )}

      <div className="flex items-center justify-center text-2xl md:text-3xl lg:text-4xl mb-6 text-teal-500">
        <div
          className="mx-4 hover:scale-110 transition-all cursor-pointer"
          onClick={prevPage}
        >
          <FaArrowLeft />
        </div>
        <div className="text-white">{currentPage}</div>
        <div
          className="mx-4 hover:scale-110 transition-all cursor-pointer"
          onClick={nextPage}
        >
          <FaArrowRight />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MoreMovies;
