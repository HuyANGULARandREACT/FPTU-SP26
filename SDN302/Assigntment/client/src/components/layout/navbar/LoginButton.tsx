import { User } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../../ui/button";

export const LoginButton = () => {
  return (
    <Link to="/auth/login">
      <Button className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white rounded-15 px-6 py-2 shadow-md">
        <span className="font-medium">Login</span>
        <div className="bg-white/20 rounded-full p-1">
          <User className="h-5 w-5" />
        </div>
      </Button>
    </Link>
  );
};
