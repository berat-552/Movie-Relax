import React from "react";
import { Link, useLocation } from "react-router-dom";

function Footer() {
  function year() {
    return new Date().getFullYear();
  }

  const { pathname } = useLocation();
  // using parameter to avoid a duplicate function for a different path
  function handleClick(path) {
    if (pathname === path) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  return (
    <div className="bg-gray-900">
      <div className="w-full h-1 bg-teal-500"></div>
      <div className="flex justify-evenly items-center text-white font-medium py-5 bg-gray-900 text-md sm:text-lg md:text-xl lg:2xl">
        <div className="hover:scale-105 transition-all active:scale-95">
          <Link to="/about" onClick={() => handleClick("/about")}>
            About
          </Link>
        </div>
        <div className="hover:scale-105 transition-all active:scale-95">
          <Link to="mailto:berat.d7599@gmail.com">Contact</Link>
        </div>
        <div className="hover:scale-105 transition-all active:scale-95">
          <Link to="/" onClick={() => handleClick("/")}>
            Home
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-lg sm:text-xl lg:text-2xl pb-4">
        <span className="mx-1 text-white">
          Copyright &copy; <span className="text-teal-500">Berat Dilki </span>
          {year()}
        </span>
      </div>
    </div>
  );
}

export default Footer;
