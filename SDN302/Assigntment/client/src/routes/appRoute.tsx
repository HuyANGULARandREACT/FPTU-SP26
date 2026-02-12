import React from "react";
import { Route, Routes } from "react-router";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home/home";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/auth">
        {/* <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} /> */}
      </Route>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default AppRoute;
