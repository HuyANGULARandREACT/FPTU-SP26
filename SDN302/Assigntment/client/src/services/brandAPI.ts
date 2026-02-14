import apiClient from "../lib/axios";
import type { IBrand } from "../types/type";

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
export const brandAPI = {
  /**
   * Get all brands
   */
  getAllBrands: async (): Promise<IBrand[]> => {
    const response = await apiClient.get<IBrand[]>("/brand");
    return response.data;
  },
  getBrandWithPagination: async (
    page: number = 1,
    pageSize: number = 5,
  ): Promise<PaginatedResponse<IBrand>> => {
    const response = await apiClient.get<PaginatedResponse<IBrand>>(
      "/brand/brands/withPagination",
      {
        params: { page, pageSize },
      },
    );
    return response.data;
  },
};
