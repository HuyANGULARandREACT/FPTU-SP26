import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { LogOut, UserCircle, Users } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Button } from "../../ui/button";
import { useAuth } from "../../../hooks/useAuth";

interface MenuItem {
  label: string;
  to: string;
  icon: React.ElementType;
}

const menuItemsForMember: MenuItem[] = [
  { label: "User Detail", to: "/member/profile", icon: UserCircle },
];

const menuItemsForAdmin: MenuItem[] = [
  { label: "User Detail", to: "/member/profile", icon: UserCircle },
  { label: "Management", to: "/admin/management", icon: Users },
];

export const UserMenu = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  if (!user) return null;

  // Select menu items based on user role
  const menuItems = user.isAdmin ? menuItemsForAdmin : menuItemsForMember;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-15 px-4 py-2"
        >
          <span className="font-medium">{user.membername}</span>
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-gray-300 text-gray-700">
              {user.membername.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.membername}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <DropdownMenuItem key={item.to} asChild>
              <Link to={item.to} className="cursor-pointer">
                <IconComponent className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
