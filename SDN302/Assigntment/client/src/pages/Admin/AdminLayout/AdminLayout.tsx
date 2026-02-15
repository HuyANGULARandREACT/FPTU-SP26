import { Outlet } from "react-router";
import { Navbar } from "../../../components/layout/navbar";
import AdminSidebar from "./AdminSideBar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
