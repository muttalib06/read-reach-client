import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import libraryImg from "../../assets/library-image-auth.jpg";
import { NavLink, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import axios from "axios";
import Spinner from "../../components/sharedComponents/spinner/Spinner";
import useAxios from "../../hooks/useAxios";

const SignupPage = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const location = useLocation();
  // read the redirect state;
  const from = location.state?.from?.pathname || "/";

  // react hook form to maintain register form;
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
        case "auth/email-already-in-use":
          setError(
            "This email is already registered. Please login or use another email."
          );
          break;

        case "auth/invalid-email":
          setError("Invalid email format.");
          break;
        case "auth/weak-password":
          setError("Password is too weak. Must be at least 6 characters.");
          break;
        case "auth/user-not-found":
          setError("No account found with this email. Please sign up first.");
          break;
        case "auth/popup-closed-by-user":
          setError("Google sign-in was cancelled. Please try again.");
          break;
        case "auth/network-request-failed":
          setError("Network error! Check your internet connection.");
          break;
        default:
          setError("Something went wrong. Please try again.");
      }
    } else {
      setError("An unexpected error occurred.");
    }
  };

  // handle submit of registration form;

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);
    try {
      const name = data.name;
      const image = data.image[0];
      const phone = data.phone;
      const address = data.address;
      const email = data.email;
      const password = data.password;

      // create user with firebase;
      await createUser(email, password);

      // upload profile image to imageBB;
      const formData = new FormData();
      formData.append("image", image);
      const key = import.meta.env.VITE_IMAGEBB_API_KEY;
      const uploadImageUrl = `https://api.imgbb.com/1/upload?key=${key}`;
      const imageUploadRes = await axios.post(uploadImageUrl, formData);
      const imageUrl = imageUploadRes.data.data.url;
      console.log(imageUrl);

      // save user data to database;
      const userInfo = {
        name,
        image,
        phone,
        address,
        email,
        imageUrl,
        role:"user"
      };
      await axiosInstance.post("/users", userInfo);

      // update firebase profile;

      await updateUserProfile(name, imageUrl);
      navigate(from, { replace: true });
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // signup with google ;

  const handleSignUpWithGoogle = async () => {
    setError("");
    setLoading(false);

    try {
      await signInWithGoogle();
      navigate(from, { replace: true });
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // the page start form the top after navigate;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <Spinner></Spinner>;
  }
  return (
    <div className="flex items-center justify-center py-4">
      <div className="relative w-full max-w-5xl">
        {/* Gradient Background Glow */}
        <div className="absolute inset-0 opacity-30 blur-3xl"></div>

        {/* Main Card Container */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Gradient Banner */}
            <div
              className="flex justify-center items-center lg:w-1/2 relative p-6 lg:p-8 flex-col min-h-[250px] lg:min-h-[400px] bg-cover bg-center bg-no-repeat rounded-2xl"
              style={{ backgroundImage: `url(${libraryImg})` }}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/50 rounded-2xl"></div>
              <div className="relative z-10">
                <h1 className="text-white font-bold text-3xl lg:text-4xl">
                  The Library Comes to You
                </h1>
                <p className="font-bold text-white text-sm lg:text-base mt-2">
                  Browse, borrow, and enjoy thousands of books delivered
                  straight to your doorstep. Return just as easily—no late fees,
                  no hassle.
                </p>
              </div>
            </div>

            {/* Right Side - signup Form */}
            <div className="lg:w-1/2 rounded-2xl bg-white p-4 lg:p-6 flex items-center justify-center">
              <div className="w-full max-w-md">
                {/* Welcome Text */}
                <div className="mb-4">
                  <h2 className="text-2xl lg:text-3xl font-serif text-gray-900 mb-1">
                    Start Your Reading Journey
                  </h2>
                  <p className="text-gray-500 text-xs lg:text-sm">
                    Get fast and easy access to library book delivery. Create
                    your account to borrow, receive, and return books from home.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Name and Phone in one row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    {/* Name input */}
                    <div>
                      <label className="block text-gray-700 text-xs font-medium mb-1">
                        Name
                      </label>
                      <input
                        {...register("name", { required: "Name is required" })}
                        type="text"
                        placeholder="Enter your Name"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-300 focus:bg-white transition-colors"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Phone input */}
                    <div>
                      <label className="block text-gray-700 text-xs font-medium mb-1">
                        Phone
                      </label>
                      <input
                        {...register("phone", {
                          required: "Phone is required",
                        })}
                        type="tel"
                        placeholder="Enter phone number"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-300 focus:bg-white transition-colors"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Address input */}
                  <div className="mb-3">
                    <label className="block text-gray-700 text-xs font-medium mb-1">
                      Address
                    </label>
                    <input
                      {...register("address", {
                        required: "Address is required",
                      })}
                      type="text"
                      placeholder="Enter your address"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-300 focus:bg-white transition-colors"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.address.message}
                      </p>
                    )}
                  </div>

                  {/* Image input */}
                  <div className="mb-3">
                    <label className="block text-gray-700 text-xs font-medium mb-1">
                      Image
                    </label>
                    <input
                      {...register("image", { required: "Image is required" })}
                      type="file"
                      className="file-input w-full bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-300 focus:bg-white transition-colors"
                    />
                    {errors.image && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.image.message}
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="mb-3">
                    <label className="block text-gray-700 text-xs font-medium mb-1">
                      Email
                    </label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: "Invalid email format",
                        },
                      })}
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-300 focus:bg-white transition-colors"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password Input */}
                  <div className="mb-3">
                    <label className="block text-gray-700 text-xs font-medium mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                          pattern: {
                            value:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,

                            message:
                              "Password must include uppercase, lowercase, number & special character",
                          },
                        })}
                        type={open ? "text" : "password"}
                        placeholder="Enter your password"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-300 focus:bg-white transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setOpen(!open)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        {open ? (
                          <FaEyeSlash size={16}></FaEyeSlash>
                        ) : (
                          <FaEye size={16} />
                        )}
                      </button>
                    </div>

                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {error && (
                    <p className="text-red-500 text-xs mb-2">{error}</p>
                  )}

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between mb-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-3.5 h-3.5 rounded border-gray-300"
                      />
                      <span className="text-xs text-gray-600">Remember me</span>
                    </label>
                    <a
                      href="#"
                      className="text-xs text-gray-600 hover:text-gray-900"
                    >
                      Forget Password
                    </a>
                  </div>

                  {/* Sign Up Button */}
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-2.5 rounded-lg font-medium text-sm mb-3"
                  >
                    Sign Up
                  </button>
                </form>
                {/* Google Sign In */}
                <button
                  onClick={handleSignUpWithGoogle}
                  className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors mb-4 text-sm"
                >
                  <FcGoogle className="text-red-500" size={16} />
                  <span className="font-medium">Sign in with Google</span>
                </button>

                {/* Sign In Link */}
                <p className="text-center text-xs text-gray-600">
                  Already have an account?{" "}
                  <NavLink
                    state={location.state}
                    to="/login"
                    className="text-gray-900 font-medium hover:underline"
                  >
                    Sign In
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

export default SignupPage;
