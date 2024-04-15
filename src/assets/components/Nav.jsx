import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import dummyImage from "../images/dummy.jpg";
import { Skeleton } from "@mui/material";
function Nav() {
  // hamburger menu
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const sendToResultsPage = async (e) => {
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    setSearchQuery(""); // hides the dropdown as the condition relies on the searchQuery being empty
  };

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // function that runs for the dropdown menu
    async function fetchSuggestions() {
      try {
        // end function searchQuery is empty
        if (searchQuery.trim() === "") {
          setSuggestions([]);
          return;
        }
        const apiUrl = `https://express-backend-movie-relax.onrender.com/search-movies/${searchQuery}`;

        const response = await axios.get(apiUrl);

        // extract necessary data from api response, .slice() used to prevent dropdown being too big
        const suggestionsData = response.data.results.map((item) => ({
          id: item.id,
          movieName: item.title,
          img: item.poster_path,
        }));

        setSuggestions(suggestionsData);
      } catch (error) {
        console.log("ERROR FETCHING SUGGESTIONS", error);
      }
    }

    fetchSuggestions();
  }, [searchQuery]);

  // if a movie on dropdown suggestions is clicked, we will take the user to the route where 'MovieDetails' is to render full details
  function selectedMovieRender(id) {
    navigate(`/movies/${encodeURIComponent(id)}`);
    setSuggestions([]);
  }

  return (
    <nav>
      <div className="bg-gray-900 text-white font-medium p-2 py-6 overflow-hidden sm:text-lg font-Poppins">
        <ul className="flex justify-around sm:justify-between lg:justify-evenly p-4 items-center">
          <li className="hover:scale-110 transition-all active:scale-90 sm:px-2">
            <Link to="/" className="text-xl sm:text-2xl lg:text-3xl">
              Movie<span className="text-teal-500">Relax</span>
            </Link>
          </li>

          <form
            onSubmit={(e) => sendToResultsPage(e.preventDefault())}
            className="flex justify-center items-center w-full"
          >
            <div className="w-2/3">
              <input
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
                type="text"
                className="outline-none text-black font-normal rounded-lg pl-1 sm: placeholder:text-sm md:placeholder:text-md text-sm lg:text-lg focus:scale-105 transition-all h-7 w-full md:w-full lg:h-10 lg:w-full"
                placeholder="Movie Name"
              />

              {/* Display the dropdown */}
              {searchQuery.trim() !== "" && (
                <div className="absolute bg-gray-900 mt-1 rounded-lg w-1/2 md:w-1/2 lg:w-1/2 top-20 left-50 text-sm z-10 overflow-y-auto max-h-60">
                  {suggestions.length > 0 &&
                    suggestions.map((suggestion) => (
                      <div
                        key={suggestion.id}
                        className="cursor-pointer px-2 py-1 hover:bg-gray-700 flex items-center justify-start"
                        onClick={() => {
                          selectedMovieRender(suggestion.id);
                          setSearchQuery("");
                        }}
                      >
                        <img
                          className="w-10 mx-1 rounded-md"
                          src={
                            (suggestion.img &&
                              `https://image.tmdb.org/t/p/w500${suggestion.img}`) ||
                            dummyImage
                          }
                        />
                        <span className="ml-2"> {suggestion.movieName}</span>
                      </div>
                    ))}
                </div>
              )}
            </div>
            <Link onClick={(e) => sendToResultsPage(e.preventDefault())}>
              <button className="hover:scale-110 transition-all active:scale-90 hidden sm:flex sm:px-4">
                <FaSearch className="text-xl lg:text-3xl lg:ml-4" />
              </button>
            </Link>
          </form>
          <div className="flex lg:px-6">
            <Link
              to="/more-movies"
              className="text-xl px-4 hidden sm:flex hover:scale-110 transition-all active:scale-90 lg:text-3xl lg:px-6"
            >
              More
            </Link>

            <Link
              to="/tv"
              className="text-xl px-4 hidden sm:flex hover:scale-110 transition-all active:scale-90 lg:text-3xl lg:px-6"
            >
              TV
            </Link>

            <Link
              to="mailto:berat.d7599@gmail.com"
              className="text-xl px-4 hidden sm:hidden hover:scale-110 transition-all active:scale-90 lg:text-3xl lg:px-6"
            >
              Contact
            </Link>
            <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
              <GiHamburgerMenu className="text-4xl sm:hidden hover:scale-110 transition-all active:scale-90" />
            </button>
          </div>

          {/* if the user clicked on hamburger menu, isMobileOpen will be true and renders whats below */}

          {isMobileMenuOpen && (
            <div className="sm:hidden bg-gray-800 fixed w-full top-0 left-0 duration-150 z-20">
              <Link
                to="/more-movies"
                className="text-center py-2 hover:bg-gray-700 transition-colors flex justify-center items-center"
              >
                More Movies
              </Link>
              <Link
                to="/tv"
                className="block text-center py-2 hover:bg-gray-700 transition-colors"
              >
                TV
              </Link>
              <Link
                to="mailto:berat.d7599@gmail.com"
                className="block text-center py-2 hover:bg-gray-700 transition-colors"
              >
                Contact
              </Link>

              <AiOutlineClose
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                className="absolute bottom-0 hover:scale-105 cursor-pointer right-4 text-3xl z-20 active:scale-95"
              />
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
