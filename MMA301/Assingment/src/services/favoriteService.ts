import AsyncStorage from "@react-native-async-storage/async-storage";
import { FavoritesList, IHandbag } from "../types/handBag.type";

const FAVORITES_KEY = "FAVORITES";

export const favoriteService = {
  async getAllFavorites(): Promise<FavoritesList> {
    try {
      const data = await AsyncStorage.getItem(FAVORITES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (err: any) {
      console.log("error at getting favorite list", err);
      return [];
    }
  },
  async isFavorite(handbagId: string): Promise<boolean> {
    try {
      const favorites = await this.getAllFavorites();
      return favorites.some((item) => item.id === handbagId);
    } catch (error) {
      console.error("err at fetching favorites", error);
      return false;
    }
  },
  async addFavorite(hanbag: IHandbag): Promise<FavoritesList> {
    try {
      const favorites = await this.getAllFavorites();
      if (favorites.some((item) => item.id === hanbag.id)) {
        throw new Error("Already in favorites");
      }
      const updated = [...favorites, hanbag];
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error("Error adding favorite:", error);
      throw error;
    }
  },
  async removeFavorite(handbagId: string): Promise<FavoritesList> {
    try {
      const favorites = await this.getAllFavorites();
      const updated = favorites.filter((item) => item.id !== handbagId);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return updated;
    } catch (error: any) {
      console.error("Error removing favorite:", error);
      throw error;
    }
  },
  async toogleFavorite(
    handbag: IHandbag,
  ): Promise<{ favorites: FavoritesList; action: "added" | "removed" }> {
    try {
      const isFav = await this.isFavorite(handbag.id);
      if (isFav) {
        const favorites = await this.removeFavorite(handbag.id);
        return { favorites, action: "removed" };
      } else {
        const favorites = await this.addFavorite(handbag);
        return { favorites, action: "added" };
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      throw error;
    }
  },
  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.removeItem(FAVORITES_KEY);
    } catch (error) {
      console.error("Error clearing favorites:", error);
    }
  },
};
