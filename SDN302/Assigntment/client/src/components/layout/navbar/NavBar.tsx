import { Link } from "react-router";
import { useAuth } from "../../../hooks/useAuth";
import { SearchBar } from "./SearchBar";
import { UserMenu } from "./UserMenu";
import { LoginButton } from "./LoginButton";

export const Navbar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="w-full border-b bg-white">
      <div className="flex items-center justify-between px-4 py-3 gap-4">
        {/* Logo */}
        <Link to="/">
          <h2 className="text-xl font-bold text-gray-900">LUXE SCENT</h2>
        </Link>

        {/* Search Bar */}
        <SearchBar />

        {/* User Section */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? <UserMenu /> : <LoginButton />}
        </div>
      </div>
    </div>
  );
};
