import type {
  IAuthResponse,
  ILoginRequest,
  IRegisterRequest,
  AuthUser,
} from "../types/type";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

// Helper function to decode JWT token
const decodeJWT = (token: string) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

export const authAPI = {
  login: async (data: ILoginRequest): Promise<IAuthResponse> => {
    try {
      const response = await fetch(`${VITE_BASE_URL}/member/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const result = await response.json();
      // console.log("Login response:", result);

      if (result.token) {
        localStorage.setItem("authToken", result.token);

        const decoded = decodeJWT(result.token);
        console.log("Decoded token:", decoded);

        if (decoded) {
          const userData: AuthUser = {
            _id: decoded.memberId || decoded.id || decoded._id || "",
            email: decoded.email || "",
            membername: decoded.membername || decoded.name || "",
          };
          localStorage.setItem("user", JSON.stringify(userData));

          // Return properly formatted response
          return {
            token: result.token,
            user: userData,
          };
        }
      }

      throw new Error("Invalid response from server");
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  },

  register: async (data: IRegisterRequest): Promise<IAuthResponse> => {
    try {
      const { ...payload } = data;
      const response = await fetch(`${VITE_BASE_URL}/member/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Registration failed");
      }
      return await response.json();
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  },

  // Check if user is logged in
  isLoggedIn: (): boolean => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("user");
    return !!(token && user);
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error("Error parsing user data:", error);
        return null;
      }
    }
    return null;
  },

  // Logout function
  logout: (): void => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  },
};
