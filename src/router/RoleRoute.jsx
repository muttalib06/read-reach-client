import React from "react";
import useRole from "../hooks/useRole";
import Spinner from "../components/sharedComponents/spinner/Spinner";
import { Navigate } from "react-router";

const RoleRoute = ({allowedRoles,children}) => {
  const { role, isLoading } = useRole();
  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if(!allowedRoles.includes(role)){
        return <Navigate to="/unauthorized"></Navigate>
  }
  return children;
};

export default RoleRoute;
