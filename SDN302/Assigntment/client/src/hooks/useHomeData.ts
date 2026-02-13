import { useEffect, useState } from "react";
import { brandAPI, perfumeAPI } from "../services";
import type { IBrand, IPerfume } from "../types/type";

/**
 * Custom hook for fetching home page data (brands and perfumes)
 * Uses Promise.all for parallel fetching to optimize performance
 */
export const useHomeData = () => {
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [perfumes, setPerfumes] = useState<IPerfume[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch both APIs in parallel for better performance
        const [brandsData, perfumesData] = await Promise.all([
          brandAPI.getAllBrands(),
          perfumeAPI.getAllPerfumes(),
        ]);

        setBrands(brandsData);
        setPerfumes(perfumesData);
      } catch (err) {
        setError("Failed to load data. Please try again.");
        console.error("Error fetching home data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { brands, perfumes, loading, error };
};
