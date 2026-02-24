import React from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { FavoritesList, IHandbag } from "../../types/handBag.type";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../types/app.type";
import { favoriteService } from "../../services/favoriteService";
import HandbagCard from "../../components/HandbagCard";

type NavigationProp = NativeStackNavigationProp<HomeStackParamList>;

interface HandbagGridProps {
  handbags: IHandbag[];
  favorites: FavoritesList;
  loading: boolean;
  error: string | null;
  onFavoriteToggle: () => Promise<void>;
}

const HandbagGrid = ({
  handbags,
  favorites,
  loading,
  error,
  onFavoriteToggle,
}: HandbagGridProps) => {
  const navigation = useNavigation<NavigationProp>();

  // const toggleFavorite = (id: string) => {
  //   setFavorites((prev) =>
  //     prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id],
  //   );
  // };
  const handleToggleFavorite = async (handbags: IHandbag): Promise<void> => {
    try {
      const result = await favoriteService.toogleFavorite(handbags);
      await onFavoriteToggle(); // Refresh favorites to update UI
      Alert.alert(
        "Success",
        result.action === "added"
          ? "Added to favorites ❤️"
          : "Removed from favorites",
      );
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      }
    }
  };
  const handleProductPress = (handbagId: string) => {
    navigation.navigate("Detail", { handbagId });
  };
  const checkIsFavorite = (id: string): boolean => {
    return favorites.some((fav) => fav.id === id);
  };
  if (loading)
    return (
      <View style={styles.centerContainer}>
        <Text>Loading...</Text>
      </View>
    );
  if (error)
    return (
      <View style={styles.centerContainer}>
        <Text>Error: {error}</Text>
      </View>
    );
  return (
    <View style={styles.allHandBags}>
      <FlatList
        data={handbags}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => {
          const isFavorite = checkIsFavorite(item.id);

          return (
            <HandbagCard
              item={item}
              isFavorite={isFavorite}
              onPress={() => handleProductPress(item.id)}
              onFavoritePress={() => handleToggleFavorite(item)}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  allHandBags: {
    flex: 5,
    padding: 5,
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 5,
    marginBottom: 15,
  },
});

export default HandbagGrid;
