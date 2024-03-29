import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-slate-200">
      <div className="flex justify-between items-center mx-auto py-3 px-20 ">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl">
            <span>Vivid</span>
            <span>Space</span>
          </h1>
        </Link>

        <form className="flex items-center bg-slate-100 p-3 rounded-md">
          <input
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            type="text"
            placeholder="Search..."
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <Link to="/sign-out">
            <li className="text-slate-700 hover:underline">Sign In</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;