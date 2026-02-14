import apiClient from "../lib/axios";
import type { IPerfume } from "../types/type";
import type { PaginatedResponse } from "./brandAPI";

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
  getPerfumeWithPagination: async (
    page: number = 1,
    pageSize: number = 5,
  ): Promise<PaginatedResponse<IPerfume>> => {
    const response = await apiClient.get<PaginatedResponse<IPerfume>>(
      "/perfume/perfumes/withPagination",
      {
        params: { page, pageSize },
      },
    );
    return response.data;
  },
};
