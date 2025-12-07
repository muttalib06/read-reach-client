import React from "react";
import Navbar from "../components/sharedComponents/navbar/Navbar";
import Footer from "../components/sharedComponents/footer/Footer";
import { Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/sharedComponents/spinner/Spinner";

const MainLayout = () => {
  const { loading } = useAuth();

  if (loading) {
    return <Spinner></Spinner>;
  }
  return (
    <div>
      <Navbar></Navbar>

      <div className="max-w-11/12 mx-auto my-10">
        <Outlet></Outlet>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
