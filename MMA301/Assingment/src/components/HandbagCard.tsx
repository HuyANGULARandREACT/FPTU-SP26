import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Foundation from "@expo/vector-icons/Foundation";
import { IHandbag } from "../types/handBag.type";

interface HandbagCardProps {
  item: IHandbag;
  isFavorite: boolean;
  onPress: () => void;
  onFavoritePress: () => void;
}

const HandbagCard = ({
  item,
  isFavorite,
  onPress,
  onFavoritePress,
}: HandbagCardProps) => {
  const discountPercent = Math.round(item.percentOff * 100);
  const originalPrice = Math.round(item.cost / (1 - item.percentOff));

  return (
    <TouchableOpacity style={styles.cardHandBag} onPress={onPress}>
      <View style={styles.imageContainer}>
        {/* Discount Badge */}
        {discountPercent > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discountPercent}% OFF</Text>
          </View>
        )}

        <Image style={styles.imageUri} source={{ uri: item.uri }} />

        {/* Gender Icon */}
        <View style={styles.genderIcon}>
          {item.gender ? (
            <Foundation name="female-symbol" size={24} color="pink" />
          ) : (
            <Ionicons name="male" size={24} color="blue" />
          )}
        </View>

        {/* Favorite Button */}
        <TouchableOpacity style={styles.favoriteButton} onPress={onFavoritePress}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite ? "#FF4444" : "#000"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.productInfo}>
        <Text style={styles.brandName}>{item.brand.toUpperCase()}</Text>
        <Text style={styles.productName} numberOfLines={2}>
          {item.handbagName}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>
            ${item.cost.toLocaleString()}
          </Text>
          {discountPercent > 0 && (
            <Text style={styles.originalPrice}>
              ${originalPrice.toLocaleString()}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardHandBag: {
    width: "48%",
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    aspectRatio: 0.85,
    backgroundColor: "#F5F5F5",
  },
  imageUri: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  discountBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#E8B84C",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 1,
  },
  discountText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  genderIcon: {
    position: "absolute",
    top: 45,
    right: 8,
    backgroundColor: "#FFF",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    zIndex: 1,
  },
  favoriteButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#FFF",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    zIndex: 1,
  },
  productInfo: {
    padding: 12,
  },
  brandName: {
    fontSize: 11,
    color: "#B8956A",
    fontWeight: "600",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
    lineHeight: 20,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  currentPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  originalPrice: {
    fontSize: 14,
    color: "#999",
    textDecorationLine: "line-through",
  },
});

export default HandbagCard;
