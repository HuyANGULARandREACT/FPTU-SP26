import apiClient from "../lib/axios";
import type {
  IAuthResponse,
  ILoginRequest,
  IRegisterRequest,
  IUpdateMemberRequest,
  IChangePasswordRequest,
  AuthUser,
  IMember,
} from "../types/type";

// Helper function to decode JWT token
const decodeJWT = (token: string): AuthUser | null => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    const decoded = JSON.parse(jsonPayload);

    return {
      _id: decoded.memberId || decoded.id || decoded._id || "",
      email: decoded.email || "",
      isAdmin: decoded.isAdmin || false,
      membername: decoded.membername || decoded.name || "",
    };
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

// Store auth data in localStorage
const storeAuthData = (token: string, user: AuthUser): void => {
  localStorage.setItem("authToken", token);
  localStorage.setItem("user", JSON.stringify(user));
};

const clearAuthData = (): void => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
};

export const authAPI = {
  login: async (data: ILoginRequest): Promise<IAuthResponse> => {
    const response = await apiClient.post<{
      token: string;
      success: boolean;
      message: string;
    }>("/member/login", data);

    const { token } = response.data;

    if (!token) {
      throw new Error("No token received from server");
    }

    const user = decodeJWT(token);

    if (!user) {
      throw new Error("Invalid token received");
    }

    storeAuthData(token, user);

    return { token, user };
  },

  register: async (data: IRegisterRequest): Promise<IAuthResponse> => {
    const response = await apiClient.post<{
      token: string;
      success: boolean;
      message: string;
    }>("/member/register", data);

    const { token } = response.data;

    if (!token) {
      throw new Error("No token received from server");
    }

    const user = decodeJWT(token);

    if (!user) {
      throw new Error("Invalid token received");
    }

    storeAuthData(token, user);

    return { token, user };
  },

  isLoggedIn: (): boolean => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("user");
    return Boolean(token && user);
  },

  getCurrentUser: (): AuthUser | null => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;

    try {
      return JSON.parse(userStr) as AuthUser;
    } catch (error) {
      console.error("Error parsing user data:", error);
      clearAuthData();
      return null;
    }
  },

  logout: (): void => {
    clearAuthData();
  },

  /**
   * Get member detail by ID
   * @param memberId - The ID of the member to fetch
   * @returns Promise with full member data
   */
  getMemberById: async (memberId: string): Promise<IMember> => {
    const response = await apiClient.get<IMember>(`/member/${memberId}`);
    return response.data;
  },

  /**
   * Update member information
   * @param memberId - The ID of the member to update
   * @param data - Updated member data
   * @returns Promise with updated member data
   */
  updateMember: async (
    memberId: string,
    data: IUpdateMemberRequest,
  ): Promise<IMember> => {
    const response = await apiClient.put<IMember>(`/member/${memberId}`, data);
    return response.data;
  },

  /**
   * Change member password
   * @param data - Password change data with email
   * @returns Promise with success message
   */
  changePassword: async (
    data: Omit<IChangePasswordRequest, "confirmPassword">,
  ): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.put<{ success: boolean; message: string }>(
      `/member/password/change`,
      data,
    );
    return response.data;
  },
};
