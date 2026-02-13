import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { User, LogOut, UserCircle } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Button } from "../ui/button";
import { useAuth } from "../../hooks/useAuth";
const menuItems: {
  title: string;
  components: { title: string; href: string; description: string }[];
}[] = [
  {
    title: "Getting Started",
    components: [
      {
        title: "Introduction",
        href: "/docs/introduction",
        description:
          "Re-usable components built using Radix UI and Tailwind CSS.",
      },
      {
        title: "Installation",
        href: "/docs/installation",
        description: "How to install dependencies and structure your app.",
      },
      {
        title: "Typography",
        href: "/docs/typography",
        description: "Styles for headings, paragraphs, lists...etc",
      },
    ],
  },
  {
    title: "Components",
    components: [
      {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
          "A modal dialog that interrupts the user with important content.",
      },
      {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
          "For sighted users to preview content available behind a link.",
      },
      {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
          "Displays an indicator showing the completion progress of a task.",
      },
    ],
  },
  {
    title: "Resources",
    components: [
      {
        title: "Documentation",
        href: "/docs",
        description: "Complete documentation for all components and utilities.",
      },
      {
        title: "Examples",
        href: "/examples",
        description: "Browse through example applications and use cases.",
      },
      {
        title: "GitHub",
        href: "https://github.com",
        description: "View the source code and contribute to the project.",
      },
    ],
  },
  {
    title: "Support",
    components: [
      {
        title: "FAQ",
        href: "/faq",
        description: "Frequently asked questions and answers.",
      },
      {
        title: "Community",
        href: "/community",
        description: "Join our community and get help from other developers.",
      },
      {
        title: "Contact",
        href: "/contact",
        description: "Get in touch with our support team.",
      },
    ],
  },
];
export const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <div className="w-full border-b bg-white">
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">SDN392 Project</h2>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            {menuItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {item.components.map((component) => (
                      <li key={component.title}>
                        <NavigationMenuLink asChild>
                          <a
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            href={component.href}
                          >
                            <div className="text-sm font-medium leading-none">
                              {component.title}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {component.description}
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          {isLoggedIn && user ? (
            // Logged in - Show username with dropdown menu
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
                <DropdownMenuItem asChild>
                  <Link to="/member/profile" className="cursor-pointer">
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>User Detail</span>
                  </Link>
                </DropdownMenuItem>
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
          ) : (
            // Not logged in - Show login button
            <Link to="/auth/login">
              <Button className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white rounded-15 px-6 py-2 shadow-md">
                <span className="font-medium">Login</span>
                <div className="bg-white/20 rounded-full p-1">
                  <User className="h-5 w-5" />
                </div>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
