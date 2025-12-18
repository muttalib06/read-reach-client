import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { NavLink } from "react-router";

const Footer = () => {
  return (
    <div className="flex items-center justify-center">
      <footer className="w-full bg-[#f2f0ee]">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 mb-12">
            {/* Brand Section */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-primary flex-shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                  />
                </svg>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 ml-2">
                  Read<span className="text-primary">Reach</span>
                </h2>
              </div>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-6">
                Smart library delivery system that connects readers with nearby
                libraries through seamless pickup and delivery services.
              </p>

              {/* Social Links - Mobile */}
              <div className="flex items-center gap-4 sm:hidden">
                <a
                  href="#"
                  className="text-slate-700 hover:text-primary transition-colors duration-200 p-2 hover:bg-white rounded-full"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={18} />
                </a>
                <a
                  href="#"
                  className="text-slate-700 hover:text-primary transition-colors duration-200 p-2 hover:bg-white rounded-full"
                  aria-label="Twitter"
                >
                  <FaXTwitter size={18} />
                </a>
                <a
                  href="#"
                  className="text-slate-700 hover:text-primary transition-colors duration-200 p-2 hover:bg-white rounded-full"
                  aria-label="Instagram"
                >
                  <FaInstagram size={18} />
                </a>
                <a
                  href="#"
                  className="text-slate-700 hover:text-primary transition-colors duration-200 p-2 hover:bg-white rounded-full"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-slate-900 font-bold text-sm md:text-base mb-4 md:mb-6 tracking-wide">
                QUICK LINKS
              </h3>
              <ul className="space-y-2 md:space-y-3">
                <li>
                  <NavLink
                    to="/"
                    className="text-slate-700 hover:text-primary transition-colors duration-200 text-sm md:text-base inline-block"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/books"
                    className="text-slate-700 hover:text-primary transition-colors duration-200 text-sm md:text-base inline-block"
                  >
                    Books
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/aboutUs"
                    className="text-slate-700 hover:text-primary transition-colors duration-200 text-sm md:text-base inline-block"
                  >
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/blogs"
                    className="text-slate-700 hover:text-primary transition-colors duration-200 text-sm md:text-base inline-block"
                  >
                    Blogs
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Information */}
            <div>
              <h3 className="text-slate-900 font-bold text-sm md:text-base mb-4 md:mb-6 tracking-wide">
                INFORMATION
              </h3>
              <ul className="space-y-2 md:space-y-3">
                <li>
                  <NavLink
                    to="/terms-services"
                    className="text-slate-700 hover:text-primary transition-colors duration-200 text-sm md:text-base inline-block"
                  >
                    Terms of Service
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/privacy-policy"
                    className="text-slate-700 hover:text-primary transition-colors duration-200 text-sm md:text-base inline-block"
                  >
                    Privacy Policy
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/cookies-settings"
                    className="text-slate-700 hover:text-primary transition-colors duration-200 text-sm md:text-base inline-block"
                  >
                    Cookies Settings
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-slate-900 font-bold text-sm md:text-base mb-4 md:mb-6 tracking-wide">
                CONTACT
              </h3>
              <ul className="space-y-2 md:space-y-3">
                <li className="text-slate-700 text-sm md:text-base">
                  <span className="block text-slate-900 font-semibold mb-1">
                    Email
                  </span>
                  <a
                    href="mailto:info@readreach.com"
                    className="hover:text-primary transition-colors duration-200"
                  >
                    info@readreach.com
                  </a>
                </li>
                <li className="text-slate-700 text-sm md:text-base">
                  <span className="block text-slate-900 font-semibold mb-1">
                    Phone
                  </span>
                  <a
                    href="tel:+1234567890"
                    className="hover:text-primary transition-colors duration-200"
                  >
                    +123 456 7890
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-slate-700 text-xs md:text-sm text-center sm:text-left">
                © {new Date().getFullYear()} READREACH. ALL RIGHTS RESERVED.
              </p>

              {/* Social Links - Desktop */}
              <div className="hidden sm:flex items-center gap-4">
                <a
                  href="https://web.facebook.com/?_rdc=1&_rdr#"
                  className="text-slate-700 hover:text-primary transition-colors duration-200 p-2 hover:bg-white rounded-full"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={18} />
                </a>
                <a
                  href="https://x.com/"
                  className="text-slate-700 hover:text-primary transition-colors duration-200 p-2 hover:bg-white rounded-full"
                  aria-label="Twitter"
                >
                  <FaXTwitter size={18} />
                </a>
                <a
                  href="https://www.instagram.com/accounts/login/?hl=en"
                  className="text-slate-700 hover:text-primary transition-colors duration-200 p-2 hover:bg-white rounded-full"
                  aria-label="Instagram"
                >
                  <FaInstagram size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/feed/"
                  className="text-slate-700 hover:text-primary transition-colors duration-200 p-2 hover:bg-white rounded-full"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
