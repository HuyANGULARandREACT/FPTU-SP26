const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  membername: string;
  email: string;
  password: string;
  confirmPassword: string;
  YOB: Date;
  gender: boolean;
}

export interface IAuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    membername: string;
  };
}

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
      // Store token in localStorage
      if (result.token) {
        localStorage.setItem("authToken", result.token);
      }
      return result;
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
      const result = await response.json();
      // Store token in localStorage
      if (result.token) {
        localStorage.setItem("authToken", result.token);
      }
      return result;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  },
};
