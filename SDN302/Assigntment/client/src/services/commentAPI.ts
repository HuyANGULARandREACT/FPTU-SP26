import apiClient from "../lib/axios";
import type { IComment } from "../types/type";

export interface CreateCommentDTO {
  perfumeId: string;
  memberId: string;
  rating: number; // 1-3
  content: string;
}

export interface CommentResponse {
  message: string;
  data: IComment;
}

export interface CommentsResponse {
  message: string;
  data: IComment[];
  count: number;
}

export interface CheckFeedbackResponse {
  hasCommented: boolean;
  message: string;
}

export const commentAPI = {
  /**
   * Get all comments for a specific perfume
   */
  getCommentsByPerfume: async (perfumeId: string): Promise<IComment[]> => {
    const response = await apiClient.get<CommentsResponse>(
      `/comments/perfume/${perfumeId}`,
    );
    return response.data.data;
  },

  /**
   * Create a new comment/feedback
   */
  createComment: async (data: CreateCommentDTO): Promise<IComment> => {
    const response = await apiClient.post<CommentResponse>("/comments", data);
    return response.data.data;
  },

  /**
   * Check if member has already commented on a perfume
   */
  checkMemberFeedback: async (perfumeId: string): Promise<boolean> => {
    const response = await apiClient.get<CheckFeedbackResponse>(
      `/comments/check/${perfumeId}`,
    );
    return response.data.hasCommented;
  },

  /**
   * Get all comments (admin)
   */
  getAllComments: async (): Promise<IComment[]> => {
    const response = await apiClient.get<CommentsResponse>("/comments");
    return response.data.data;
  },
};
