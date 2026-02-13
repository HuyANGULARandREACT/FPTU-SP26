import { useEffect, useState } from "react";
import { authAPI } from "../services";
import type { IMember } from "../types/type";
import { useAuth } from "./useAuth";

/**
 * Custom hook for fetching member detail based on current logged-in user
 * Pattern follows useHomeData structure
 */
export const useMemberDetail = () => {
  const { user, isLoggedIn } = useAuth();
  const [member, setMember] = useState<IMember | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      // Skip if user is not logged in
      if (!isLoggedIn || !user?._id) {
        setLoading(false);
        setMember(null);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const memberData = await authAPI.getMemberById(user._id);
        setMember(memberData);
      } catch (err) {
        setError("Failed to load member details. Please try again.");
        console.error("Error fetching member detail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?._id, isLoggedIn]);

  return { member, loading, error };
};
