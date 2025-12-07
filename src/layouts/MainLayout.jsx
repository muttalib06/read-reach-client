import React from "react";
import Navbar from "../components/sharedComponents/navbar/Navbar";
import Footer from "../components/sharedComponents/footer/Footer";
import { Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/sharedComponents/spinner/Spinner";

const MainLayout = () => {
  const {loading} = useAuth();

  if(loading){
    return <Spinner></Spinner>
  }
  return (
    <div>
      <Navbar></Navbar>

      <Outlet></Outlet>

      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
