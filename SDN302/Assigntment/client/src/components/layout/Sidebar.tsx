import { Link, useLocation } from "react-router";
import {
  Home,
  Package,
  MessageSquare,
  Settings,
  NotebookPen,
  LockKeyhole,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Overview",
      path: "/member/profile",
      icon: Home,
    },
    {
      name: "Collection",
      path: "/member/collection",
      icon: Package,
    },
    {
      name: "Feedback",
      path: "/member/feedback",
      icon: MessageSquare,
    },
    {
      name: "Settings",
      path: "/member/settings",
      icon: Settings,
    },
    {
      name: "Edit Infomation",
      path: "/member/EditInfomation",
      icon: NotebookPen,
    },
    {
      name: "Change Password",
      path: "/member/changePassword",
      icon: LockKeyhole,
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

export default Sidebar;
