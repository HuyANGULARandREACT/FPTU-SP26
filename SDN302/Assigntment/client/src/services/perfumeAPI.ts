import apiClient from "../lib/axios";
import type { IPerfume } from "../types/type";

export const perfumeAPI = {
  /**
   * Get all perfumes
   */
  getAllPerfumes: async (): Promise<IPerfume[]> => {
    const response = await apiClient.get<IPerfume[]>("/perfume");
    return response.data;
  },

  /**
   * Get perfume by ID
   */
  getPerfumeById: async (id: string): Promise<IPerfume> => {
    const response = await apiClient.get<IPerfume>(`/perfume/${id}`);
    return response.data;
  },
};
