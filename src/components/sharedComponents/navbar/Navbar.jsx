import React from "react";
import { NavLink } from "react-router";
import NavbarDropdown from "./NavbarDropdown";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useAuth();

  // handle sign out;

  const handleSignOut = async () => {
    try {
      await logOut();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You are Logout",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      
      });
    }
  };
  return (
    <div className="sticky top-0 z-2000 navbar bg-base-100 py-6 flex justify-between items-center px-3 lg:px-8">
      <div>
        {/* navbar left side */}
        <div className="flex justify-between items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-15 text-primary"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
            />
          </svg>
          <h2 className="text-3xl font-bold">
            Read<span className="text-primary">Reach</span>
          </h2>
        </div>
      </div>

      {/* navbar center */}
      <div className="hidden lg:block">
        <ul className="flex items-center gap-4 font-semibold">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "text-primary" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/books"
              className={({ isActive }) => (isActive ? "text-primary" : "")}
            >
              Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
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
          <label className="toggle text-base-content">
            <input
              type="checkbox"
              value="synthwave"
              className="theme-controller"
            />

            <svg
              aria-label="sun"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </g>
            </svg>

            <svg
              aria-label="moon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </g>
            </svg>
          </label>
        </div>

        {/* profile image  */}

        {user && (
          <div>
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring-2 ring-offset-2">
                <img src={user?.photoURL} />
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <NavLink to="/signup" className="font-semibold">
            Sign Up
          </NavLink>

          {user ? (
            <button onClick={handleSignOut} className="btn bg-primary font-semibold text-white">
              Sign Out
            </button>
          ) : (
            <NavLink
              to="/login"
              className="btn text-white bg-primary font-semibold "
            >
              Login
            </NavLink>
          )}
        </div>
      </div>

      {/* navbar right hamburger menu */}
      <div className="flex lg:hidden justify-between items-center gap-5">
        {/* profile */}
        {user && (
          <div>
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring-2 ring-offset-2">
                <img src={user?.photoURL} />
              </div>
            </div>
          </div>
        )}
        <div>
          <NavbarDropdown handleSignOut={handleSignOut}></NavbarDropdown>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
