import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "@favorites";

export interface FavoritePlayer {
  id: string;
  playerName: string;
  team: string;
  position: string;
  image: string;
}

// Get all favorites
export async function getFavorites(): Promise<string[]> {
  try {
    const favoritesJson = await AsyncStorage.getItem(FAVORITES_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  } catch (error) {
    console.error("Error getting favorites:", error);
    return [];
  }
}

// Check if a player is favorite
export async function isFavorite(playerId: string): Promise<boolean> {
  try {
    const favorites = await getFavorites();
    return favorites.includes(playerId);
  } catch (error) {
    console.error("Error checking favorite:", error);
    return false;
  }
}

// Add player to favorites
export async function addToFavorites(playerId: string): Promise<void> {
  try {
    const favorites = await getFavorites();
    if (!favorites.includes(playerId)) {
      favorites.push(playerId);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  } catch (error) {
    console.error("Error adding to favorites:", error);
  }
}

// Remove player from favorites
export async function removeFromFavorites(playerId: string): Promise<void> {
  try {
    const favorites = await getFavorites();
    const updatedFavorites = favorites.filter((id) => id !== playerId);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error("Error removing from favorites:", error);
  }
}

// Toggle favorite status
export async function toggleFavorite(playerId: string): Promise<boolean> {
  try {
    const favorites = await getFavorites();
    const isCurrentlyFavorite = favorites.includes(playerId);

    if (isCurrentlyFavorite) {
      await removeFromFavorites(playerId);
      return false;
    } else {
      await addToFavorites(playerId);
      return true;
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    return false;
  }
}
