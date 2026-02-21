import { useEffect, useState } from "react";
import { IHandbag } from "../types/handBag.type";
import { handbagAPI } from "../services/handbagAPI";

export const useHomeData = () => {
  const [handbags, setHandbags] = useState<IHandbag[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true);
        setError("");
        const handBagsData: IHandbag[] = await handbagAPI.getAllHandbags();
        setHandbags(handBagsData);
      } catch (err) {
        setError("Failed to load data. Please try again.");
        console.error("Error fetching home data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return { handbags, loading, error };
};
