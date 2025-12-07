import React from "react";
import { DashboardSidebar } from "../components/dashboard/dashboardSidebar/DashboardSidebar";
import Spinner from "../components/sharedComponents/spinner/Spinner";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { loading } = useAuth();

  if (loading) {
    return <Spinner></Spinner>;
  }
  return (
    <>
      {" "}
      <div>
        <DashboardSidebar></DashboardSidebar>
      </div>
      <div>
        <Spinner></Spinner>
      </div>
    </>
  );
};

export default DashboardLayout;
