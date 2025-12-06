import React from "react";
import Navbar from "../components/sharedComponents/navbar/Navbar";
import Footer from "../components/sharedComponents/footer/Footer";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>

      <Outlet></Outlet>

      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
