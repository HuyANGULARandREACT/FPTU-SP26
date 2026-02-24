import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FavoritesList, IHandbag } from "../../types/handBag.type";
import { favoriteService } from "../../services/favoriteService";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../types/app.type";
import HandbagCard from "../../components/HandbagCard";

type NavigationProp = NativeStackNavigationProp<HomeStackParamList>;

const FavoriteSreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [favorites, setFavorites] = useState<FavoritesList>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, []),
  );

  const loadFavorites = async (): Promise<void> => {
    try {
      setLoading(true);
      const data = await favoriteService.getAllFavorites();
      setFavorites(data);
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (handbag: IHandbag): Promise<void> => {
    try {
      await favoriteService.removeFavorite(handbag.id);
      await loadFavorites();
      Alert.alert("Success", "Removed from favorites");
    } catch (error) {
      Alert.alert("Error", "Failed to remove from favorites");
    }
  };

  const handleClearAll = (): void => {
    Alert.alert(
      "Clear All Favorites",
      "Are you sure you want to remove all favorites?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: async () => {
            await favoriteService.clearAll();
            await loadFavorites();
          },
        },
      ],
    );
  };

  const handleProductPress = (handbagId: string) => {
    navigation.navigate("Detail", { handbagId });
  };

  const filteredFavorites = favorites.filter((item) =>
    item.handbagName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>Loading favorites...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Favorites</Text>
      </View>

      {/* Search Bar */}
      {favorites.length > 0 && (
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search in favorites..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          {searchQuery !== "" && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Favorites Count */}
      {favorites.length > 0 && (
        <View style={styles.countContainer}>
          <Text style={styles.countText}>
            {filteredFavorites.length}{" "}
            {filteredFavorites.length === 1 ? "item" : "items"}
          </Text>

          <TouchableOpacity onPress={handleClearAll} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Empty State */}
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={80} color="#DDD" />
          <Text style={styles.emptyTitle}>No Favorites Yet</Text>
          <Text style={styles.emptyText}>
            Start adding your favorite handbags to see them here
          </Text>
        </View>
      ) : filteredFavorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="search-outline" size={80} color="#DDD" />
          <Text style={styles.emptyTitle}>No Results Found</Text>
          <Text style={styles.emptyText}>
            Try searching with different keywords
          </Text>
        </View>
      ) : (
        /* Favorites Grid */
        <FlatList
          data={filteredFavorites}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <HandbagCard
              item={item}
              isFavorite={true}
              onPress={() => handleProductPress(item.id)}
              onFavoritePress={() => handleRemoveFavorite(item)}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#FF4444",
    borderRadius: 6,
  },
  clearButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  countContainer: {
    paddingHorizontal: 20,
    paddingBottom: 8,
    flexDirection:'row',
    justifyContent:"space-between"
  },
  countText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
  listContainer: {
    paddingHorizontal: 11,
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 15,
  },
});

export default FavoriteSreen;
