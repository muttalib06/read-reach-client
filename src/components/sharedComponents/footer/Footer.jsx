import React from "react";
import {
  FaArrowRight,
  FaCopy,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="flex items-center justify-center rounded">
      <footer className="w-full bg-[#f2f0ee] p-8 md:p-12 lg:p-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Contact Section */}
          <div className="md:col-span-1">
            <div className="flex items-center">
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
              <h2 className="text-3xl font-bold text-slate-800">
                Read<span className="text-primary">Reach</span>
              </h2>
            </div>
            <p className="text-slate-800 font-semibold mb-8 leading-tight">
              Smart library delivery system that connects readers with nearby
              libraries through seamless pickup and delivery services.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <p className="text-slate-800 font-bold   text-sm  mb-6 tracking-wide">
              QUICK LINKS
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-slate-800 hover:text-black transition-colors text-base"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-800 hover:text-black transition-colors text-base"
                >
                  Books
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-800 hover:text-black transition-colors text-base"
                >
                  About US
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-800 hover:text-black transition-colors text-base"
                >
                  Blogs
                </a>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div className="md:col-span-1">
            <p className="text-slate-800 font-bold text-sm mb-6 tracking-wide">
              INFORMATION
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-slate-800 hover:text-black transition-colors text-base"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-800 hover:text-black transition-colors text-base"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-800 hover:text-black transition-colors text-base"
                >
                  Cookies Settings
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-800 text-sm">
            © READREACH 2024. ALL RIGHTS RESERVED.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-slate-800 hover:text-black transition-colors"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="#"
              className="text-slate-800 hover:text-black transition-colors"
            >
              <FaXTwitter size={20} />
            </a>
            <a
              href="#"
              className="text-slate-800 hover:text-black transition-colors"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="#"
              className="text-slate-800 hover:text-black transition-colors"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;