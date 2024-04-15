import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiMoviePlay } from "react-icons/bi";
import Footer from "../components/Footer";
function About() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="bg-gray-900 text-white font-normal lg:text-xl font-Poppins overflow-hidden">
      <div className="flex flex-col justify-start items-center min-h-screen my-5 sm:text-lg md:text-xl lg:text-2xl">
        <Link
          to="/"
          className="text-xl sm:text-2xl lg:text-3xl hover:scale-110 transition-all active:scale-90 sm:px-2 my-4"
        >
          Movie<span className="text-teal-500">Relax</span>
        </Link>

        <p className="my-4 text-center">
          This web application was built by{" "}
          <span className="text-teal-500 font-medium">Berat Dilki</span>
        </p>

        <p className="text-center mx-4 my-4">
          This application was built with{" "}
          <span className="text-teal-500 font-medium">
            HTML, CSS, JavaScript, ReactJS, TailwindCSS, NodeJS, ExpressJS,
            MaterialUI
          </span>
        </p>

        <p className="text-center mx-4 my-4">
          Movie Trailers are provided only if the API Limit has not been
          exceeded{" "}
          <span className="text-teal-500 font-medium">(Youtube Data API)</span>
        </p>

        <p className="my-4">
          Powered by <span className="text-teal-500 font-medium">TMDb API</span>{" "}
        </p>

        <p className="my-4">
          Feel free to contact me{" "}
          <a
            href="mailto:berat.d7599@gmail.com"
            className="text-teal-500 font-medium underline"
          >
            here
          </a>
        </p>

        <BiMoviePlay className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl my-8 animate-bounce" />
      </div>

      <Footer />
    </div>
  );
}

export default About;
