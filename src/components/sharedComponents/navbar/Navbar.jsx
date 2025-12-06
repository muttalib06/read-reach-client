import React from "react";
import { NavLink } from "react-router";
import NavbarDropdown from "./NavbarDropdown";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm flex justify-between items-center px-3 lg:px-8">
      <div>
        {/* navbar left side */}
        <div className="flex justify-between items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-15 text-yellow-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
            />
          </svg>
          <h2 className="text-3xl font-bold">
            Read<span className="text-yellow-500">Reach</span>
          </h2>
        </div>
      </div>

      {/* navbar center */}
      <div className="hidden lg:block">
        <ul className="flex items-center gap-4 font-semibold">
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "text-primary" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "text-primary" : "")}
            >
              Books
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "text-primary" : "")}
            >
              Dashboard
            </NavLink>
          </li>
        </ul>
      </div>

      {/* toggling factor */}

      {/* navbar right authentication*/}

      <div className="hidden lg:flex space-x-10 items-center">
        <div>
          <FaUser></FaUser>
        </div>
        <div className="flex items-center gap-3">
          <NavLink className="font-semibold">Sign Up</NavLink>
          <NavLink className="btn bg-primary font-semibold text-white">
            Login
          </NavLink>
        </div>
      </div>

      {/* navbar right hamburger menu */}
      <div className="flex lg:hidden justify-between items-center gap-5">
        <div>
          <FaUser></FaUser>
        </div>
        <div>
          <NavbarDropdown></NavbarDropdown>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
