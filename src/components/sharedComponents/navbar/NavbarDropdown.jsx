import {
  FiEdit,
  FiChevronDown,
  FiTrash,
  FiShare,
  FiPlusSquare,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink } from "react-router";
import { AiOutlineHome } from "react-icons/ai";
import { IoBookOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";
import useAuth from "../../../hooks/useAuth";

const NavbarDropdown = ({ handleSignOut }) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-center bg-white">
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <button
          onClick={() => setOpen((pv) => !pv)}
          className="flex items-center text-2xl py-2 rounded-md  text-black transition-colors"
        >
          <RxHamburgerMenu />
          <motion.span variants={iconVariants}>
            <FiChevronDown />
          </motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top" }}
          className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] right-0 w-48 overflow-hidden space-y-3 z-15"
        >
          <li className="flex justify-between items-center">
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2"
            >
              <AiOutlineHome className="text-xl" />
              Home
            </NavLink>
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
          </li>

          <li>
            <NavLink
              to="/books"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2"
            >
              <IoBookOutline className="text-xl" />
              Books
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2"
            >
              <MdOutlineDashboard className="text-xl" />
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              className="font-semibold flex items-center gap-2"
              to="/signup"
              onClick={() => setOpen(false)}
            >
              <FiUserPlus className="text-xl" />
              Sign Up
            </NavLink>
          </li>

          <li>
            {user ? (
              <button
                className="font-semibold flex items-center gap-2"
                to="/login"
                onClick={() => {
                  setOpen(false);
                  handleSignOut();
                }}
              >
                <IoMdLogOut className="text-2xl" />
                Sign Out
              </button>
            ) : (
              <NavLink
                className="font-semibold flex items-center gap-2"
                to="/login"
                onClick={() => setOpen(false)}
              >
                <IoMdLogIn className="text-2xl" />
                Login
              </NavLink>
            )}
          </li>
        </motion.ul>
      </motion.div>
    </div>
  );
};

const Option = ({ text, Icon, setOpen }) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => setOpen(false)}
      className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
    >
      <motion.span variants={actionIconVariants}>
        <Icon />
      </motion.span>
      <span>{text}</span>
    </motion.li>
  );
};

export default NavbarDropdown;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
