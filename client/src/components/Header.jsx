import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gradient-to-br from-blue-200 to-indigo-300">
      <div className="flex justify-between items-center mx-auto py-3 px-20 ">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-3xl">
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
            <li className="hidden sm:inline text-slate-900 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-900 hover:underline">
              About
            </li>
          </Link>
          <Link to="/sign-in">
            <li className="text-slate-900 hover:underline">Sign In</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
