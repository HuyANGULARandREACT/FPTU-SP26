import type { IPerfume } from "../types/type";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
export const perfumeAPI = {
  getAllPerfumes: async (): Promise<IPerfume[]> => {
    try {
      const response = await fetch(`${VITE_BASE_URL}/perfume`);
      if (!response.ok) {
        throw new Error("Fail to fetch perfumes");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error fetching perfumes", error);
      throw error;
    }
  },
};
