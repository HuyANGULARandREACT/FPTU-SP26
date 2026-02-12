/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { authAPI } from "../services/authAPI";
import type {
  AuthContextType,
  IAuthResponse,
  IRegisterRequest,
  AuthUser,
} from "../types/type";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const checkAuth = (): boolean => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
        return true;
      } catch (error) {
        console.error("Error parsing user data:", error);
        logout();
        return false;
      }
    }
    return false;
  };

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response: IAuthResponse = await authAPI.login({ email, password });
      setUser(response.user);
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(response.user));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (data: IRegisterRequest): Promise<void> => {
    try {
      const response: IAuthResponse = await authAPI.register(data);
      setUser(response.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = (): void => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  const value: AuthContextType = {
    user,
    isLoggedIn,
    login,
    register,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
