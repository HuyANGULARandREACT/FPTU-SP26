import { Outlet } from "react-router";
import { Navbar } from "./NavBar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const ProfileLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-gray-50">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileLayout;
