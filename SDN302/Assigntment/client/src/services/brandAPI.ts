import type { IBrand } from "../types/type";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

export const brandApi = {
  getAllBrands: async (): Promise<IBrand[]> => {
    try {
      const response = await fetch(`${VITE_BASE_URL}/brand`);
      if (!response.ok) {
        throw new Error("Failed to fetch brands");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching brands:", error);
      throw error;
    }
  },
};
