import React, { useEffect, useState } from "react";
import axios from "axios";
import Serie from "../components/Serie";
function TrendingTV() {
  const [trendingSeries, setTrendingSeries] = useState([]);

  useEffect(() => {
    async function fetchTrending() {
      try {
        const url = `https://express-backend-movie-relax.onrender.com/series`;

        const response = await axios.get(url);

        setTrendingSeries(response.data.results);
      } catch (error) {
        console.log(`error fetching tv: ${error}`);
      }
    }
    // on mount fetches tv series
    fetchTrending();
  }, []);

  return (
    <div>
      <div className="bg-gray-900 min-h-screen text-white flex flex-col justify-center items-center">
        <div>
          <h1 className="text-2xl lg:text-4xl lg:py-4 text-center py-2 font-Poppins">
            Trending <span className="text-teal-500"> TV Series</span>
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 justify-center items-center">
          {trendingSeries.map((serie) => (
            <Serie serie={serie} key={serie.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrendingTV;
