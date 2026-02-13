import apiClient from "../lib/axios";
import type { IBrand } from "../types/type";

export const brandAPI = {
  /**
   * Get all brands
   */
  getAllBrands: async (): Promise<IBrand[]> => {
    const response = await apiClient.get<IBrand[]>("/brand");
    return response.data;
  },
};
