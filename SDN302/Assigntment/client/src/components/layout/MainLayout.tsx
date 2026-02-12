import React from "react";
import { Outlet } from "react-router";
import Footer from "./Footer";
import { Navbar } from "./NavBar";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
