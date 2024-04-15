import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Movies from "../components/Movies";
import axios from "axios";
function SearchResults() {
  // the query sent to the URL is being pulled out to use for backend fetch
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("query");
  const [searchedMovies, setSearchedMovies] = useState([]);

  async function searchMovies() {
    const apiUrl = `https://express-backend-movie-relax.onrender.com/search-movies/${searchQuery}`;

    const response = await axios.get(apiUrl);
    const searchResults = response.data.results;

    setSearchedMovies(searchResults);
  }

  useEffect(() => {
    searchMovies();
  }, [searchQuery, searchedMovies]);

  return (
    <div className="bg-gray-900 min-h-screen text-white font-normal lg:text-xl font-Poppins">
      <Movies
        movies={searchedMovies}
        showTitle={false}
        searchedTitle={searchQuery}
        resultsTitle={true}
        landing={false}
      />
    </div>
  );
}

export default SearchResults;
