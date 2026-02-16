import { Link, useLocation } from "react-router";
import { Home, SprayCan, Tag } from "lucide-react";

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Manage User",
      path: "/admin/manage",
      icon: Home,
    },
    {
      name: "Manage Brands",
      path: "/admin/manage-brands",
      icon: Tag,
    },
    {
      name: "Manage Perfumes",
      path: "/admin/manage-perfumes",
      icon: SprayCan,
    },
  ];

  return (
    <aside className="w-48 bg-white border-r min-h-screen p-6">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-orange-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon size={18} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
