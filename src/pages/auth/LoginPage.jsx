import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import libraryImg from "../../assets/library-image-auth.jpg";
import { NavLink } from "react-router";

export default function ModernLogin() {

  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen  flex items-center justify-center py-5">
      <div className="relative w-full max-w-5xl">
        {/* Gradient Background Glow */}
        <div className="absolute inset-0  opacity-30 blur-3xl"></div>

        {/* Main Card Container */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Gradient Banner */}
            <div
              className="flex justify-center items-center lg:w-1/2 relative p-8 lg:p-10 flex-col  min-h-[350px] lg:min-h-[500px] bg-cover bg-center bg-no-repeat rounded-2xl"
              style={{ backgroundImage: `url(${libraryImg})` }}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/50 rounded-2xl"></div>
              <div className="relative z-10">
                <h1 className="text-white font-bold text-4xl">
                  The Library Comes to You
                </h1>
                <p className="font-bold text-white">
                  Browse, borrow, and enjoy thousands of books delivered
                  straight to your doorstep. Return just as easily—no late fees,
                  no hassle.
                </p>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="lg:w-1/2 rounded-2xl bg-white p-4 lg:p-8 flex items-center justify-center">
              <div className="w-full max-w-md">
                {/* Welcome Text */}
                <div className="mb-8">
                  <h2 className="text-4xl font-serif text-gray-900 mb-2">
                    Welcome Back
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Enter your email and password to access your account
                  </p>
                </div>

                {/* Email Input */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-300 focus:bg-white transition-colors"
                  />
                </div>

                {/* Password Input */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={open ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-300 focus:bg-white transition-colors"
                    />
                    <button
                      onClick={() => setOpen(!open)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {open ? (
                        <FaEyeSlash size={18}></FaEyeSlash>
                      ) : (
                        <FaEye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between mb-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Forget Password
                  </a>
                </div>

                {/* Sign In Button */}
                <button className="w-full bg-primary text-white py-3 rounded-lg font-medium mb-4">
                  Sign In
                </button>

                {/* Google Sign In */}
                <button className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors mb-8">
                  <FcGoogle className="text-red-500" size={18} />
                  <span className="font-medium">Sign in with Google</span>
                </button>

                {/* Sign Up Link */}
                <p className="text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <NavLink
                    to="/signup"
                    href="#"
                    className="text-gray-900 font-medium hover:underline"
                  >
                    Sign Up
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
