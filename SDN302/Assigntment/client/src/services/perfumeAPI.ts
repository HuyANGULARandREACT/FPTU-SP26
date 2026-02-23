import apiClient from "../lib/axios";
import type { IPerfume } from "../types/type";
import type { PaginatedResponse } from "./brandAPI";
interface createPerfumeDTO {
  perfumeName: string;
  uri: string;
  price: number;
  concentration: string;
  description: string;
  ingredients: string;
  volume: number;
  targetAudience: string;
  brand: string;
}
interface updatePerfumeDTO {
  perfumeName: string;
  uri: string;
  price: number;
  concentration: string;
  description: string;
  ingredients: string;
  volume: number;
  targetAudience: string;
  brand: string;
}
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
  createPerfume: async (data: createPerfumeDTO): Promise<IPerfume> => {
    const response = await apiClient.post("/perfume", data);
    return response.data;
  },
  deletePerfume: async (id: string): Promise<void> => {
    await apiClient.delete(`/perfume/${id}`);
  },
  updatePerfume: async (
    id: string,
    data: updatePerfumeDTO,
  ): Promise<IPerfume> => {
    const response = await apiClient.put(`perfume/${id}`, data);
    return response.data;
  },
};
