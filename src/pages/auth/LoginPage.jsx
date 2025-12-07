import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import libraryImg from "../../assets/library-image-auth.jpg";
import { NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Spinner from "../../components/sharedComponents/spinner/Spinner";

const LoginPage = () => {
  const { signIn, signInWithGoogle } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // react hook form to maintain login form;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // helper function to handle error;

  const handleError = (error) => {
    if (!error) return setError("");
    if (error.code) {
      switch (error.code) {
        // ========== Email/Password Login Errors ==========
        case "auth/invalid-email":
          setError("Invalid email format.");
          break;

        case "auth/user-not-found":
          setError("No account found with this email.");
          break;

        case "auth/wrong-password":
          setError("Incorrect password. Please try again.");
          break;

        case "auth/user-disabled":
          setError("This account has been disabled. Contact support.");
          break;

        case "auth/invalid-credential":
          setError("Invalid email or password. Please try again.");
          break;

        // ========== Google Sign-in Errors ==========
        case "auth/popup-closed-by-user":
          setError("Google sign-in was cancelled. Please try again.");
          break;

        case "auth/popup-blocked":
          setError("Popup was blocked. Please allow popups and try again.");
          break;

        case "auth/cancelled-popup-request":
          setError("Sign-in was cancelled. Please try again.");
          break;

        case "auth/account-exists-with-different-credential":
          setError(
            "An account exists with this email using a different sign-in method."
          );
          break;

        case "auth/credential-already-in-use":
          setError("This Google account is already linked to another user.");
          break;

        case "auth/operation-not-allowed":
          setError("Google sign-in is not enabled. Contact support.");
          break;

        case "auth/unauthorized-domain":
          setError("This domain is not authorized for Google sign-in.");
          break;

        // ========== Common Errors (Both Methods) ==========
        case "auth/too-many-requests":
          setError("Too many failed login attempts. Please try again later.");
          break;

        case "auth/network-request-failed":
          setError("Network error. Check your internet connection.");
          break;

        case "auth/timeout":
          setError("Sign-in timed out. Please try again.");
          break;

        default:
          setError("Login failed. Please try again.");
      }
    }
  };

  // sign in

  const formSubmit = async (data) => {
    setError("");
    setLoading(true);

    try {
      const email = data.email;
      const password = data.password;
      //  sign In with firebase;
      await signIn(email, password);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // sign In with google;

  const handleSignInWithGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // page start at the top position;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <Spinner></Spinner>;
  }
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

                <form onSubmit={handleSubmit(formSubmit)}>
                  {/* Email Input */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: "Invalid email address",
                        },
                      })}
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-300 focus:bg-white transition-colors"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password Input */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        {...register("password", {
                          required: "Password is required",
                        })}
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

                  <p className="text-red-500 text-sm mb-2">{error}</p>

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
                  <button
                    type="submit"
                    className="w-full bg-primary text-black py-3 rounded-lg font-medium mb-4"
                  >
                    Sign In
                  </button>
                </form>

                {/* Google Sign In */}
                <button
                  onClick={handleSignInWithGoogle}
                  className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors mb-8"
                >
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
};

export default LoginPage;
