import React from "react";
import { DashboardSidebar } from "../components/dashboard/dashboardSidebar/DashboardSidebar";
import Spinner from "../components/sharedComponents/spinner/Spinner";

const DashboardLayout = () => {
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
