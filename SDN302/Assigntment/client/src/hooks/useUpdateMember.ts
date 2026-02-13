import { useState } from "react";
import { authAPI } from "../services";
import type { IUpdateMemberRequest, IMember } from "../types/type";

/**
 * Custom hook for updating member information
 * Mutation hook - executes on demand (not auto-fetch like useMemberDetail)
 */
export const useUpdateMember = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const updateMember = async (
    memberId: string,
    data: IUpdateMemberRequest,
  ): Promise<IMember | null> => {
    try {
      setLoading(true);
      setError("");

      const updatedMember = await authAPI.updateMember(memberId, data);
      return updatedMember;
    } catch (err) {
      const errorMessage = "Failed to update member information. Please try again.";
      setError(errorMessage);
      console.error("Error updating member:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateMember, loading, error };
};
