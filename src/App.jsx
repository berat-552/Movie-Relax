import { useEffect, useState } from "react";
import Nav from "./assets/components/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./assets/pages/Landing";

import SearchResults from "./assets/pages/SearchResults";
import MovieDetails from "./assets/pages/MovieDetails";
import MoreMovies from "./assets/pages/MoreMovies";
import About from "./assets/pages/About";
import Footer from "./assets/components/Footer";
import TrendingTV from "./assets/pages/TrendingTV";
function App() {
  function randomIndex() {
    return Math.floor(Math.random() * 20);
  }
  const [index, setIndex] = useState();

  useEffect(() => {
    setIndex(randomIndex());
  }, []);

  return (
    <div>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Landing index={index} />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/more-movies" element={<MoreMovies />} />
          <Route path="/about" element={<About />} />
          <Route path="/tv" element={<TrendingTV />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
