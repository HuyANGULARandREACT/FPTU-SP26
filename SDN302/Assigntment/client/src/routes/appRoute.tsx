import React from "react";
import { Route, Routes } from "react-router";
import MainLayout from "../components/layout/MainLayout";
import ProfileLayout from "../components/layout/ProfileLayout";
import Home from "../pages/Home/home";
import PerfumeDetail from "../pages/Detail/PerfumeDetail";
import RegisterPage from "../pages/Auth/RegisterPage";
import LoginPage from "../pages/Auth/LoginPage";
import MemberDetail from "../pages/Detail/MemberDetail/MemberDetail";
import EditInfo from "../pages/Detail/MemberDetail/EditInfo";
import ChangePassword from "../pages/Detail/MemberDetail/ChangePassword";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/auth">
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/perfume/:id" element={<PerfumeDetail />} />
      </Route>
      <Route path="/member" element={<ProfileLayout />}>
        <Route path="profile" element={<MemberDetail />} />
        <Route
          path="collection"
          element={<div className="p-8">Collection - Coming Soon</div>}
        />
        <Route
          path="feedback"
          element={<div className="p-8">Feedback - Coming Soon</div>}
        />
        <Route
          path="settings"
          element={<div className="p-8">Settings - Coming Soon</div>}
        />
        <Route path="EditInfomation" element={<EditInfo />} />
        <Route path="changePassword" element={<ChangePassword />} />
      </Route>
    </Routes>
  );
};

export default AppRoute;
