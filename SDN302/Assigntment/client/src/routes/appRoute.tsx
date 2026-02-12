import React from "react";
import { Route, Routes } from "react-router";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home/home";
import PerfumeDetail from "../pages/PerfumeDetail";
import RegisterPage from "../pages/Auth/RegisterPage";
import LoginPage from "../pages/Auth/LoginPage";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/auth">
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/perfume/:id" element={<PerfumeDetail/>}/>
      </Route>
    </Routes>
  );
};

export default AppRoute;
