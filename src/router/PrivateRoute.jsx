import React from "react";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/sharedComponents/spinner/Spinner";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // show loader while verifying authentication
  if (loading) {
    return <Spinner></Spinner>;
  }
  //  if user is not authenticated, redirect to login page.
  // And save current path for redirect after login;
  if (!user) {
    return <Navigate to="/login" state={{ from: location }}></Navigate>;
  }
  return children;
};

export default PrivateRoute;
