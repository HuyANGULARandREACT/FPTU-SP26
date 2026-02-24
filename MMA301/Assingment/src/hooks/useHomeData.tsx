import { useEffect, useState } from "react";
import { FavoritesList, IHandbag } from "../types/handBag.type";
import { handbagAPI } from "../services/handbagAPI";
import { favoriteService } from "../services/favoriteService";

export const useHomeData = () => {
  const [handbags, setHandbags] = useState<IHandbag[]>([]);
  const [favorites, setFavorites] = useState<FavoritesList>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect((): void => {
    fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    try {
      setLoading(true);
      setError("");
      const handBagsData: IHandbag[] = await handbagAPI.getAllHandbags();
      const favs = await favoriteService.getAllFavorites();
      setHandbags(handBagsData);
      setFavorites(favs);
    } catch (err) {
      setError("Failed to load data. Please try again.");
      console.error("Error fetching home data:", err);
    } finally {
      setLoading(false);
    }
  };

  const refreshFavorites = async (): Promise<void> => {
    try {
      const favs = await favoriteService.getAllFavorites();
      setFavorites(favs);
    } catch (err) {
      console.error("Error refreshing favorites:", err);
    }
  };

  return { handbags, favorites, loading, error, refreshFavorites };
};
