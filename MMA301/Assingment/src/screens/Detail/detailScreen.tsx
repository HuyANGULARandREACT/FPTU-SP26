import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../types/app.type";
import { handbagAPI } from "../../services/handbagAPI";
import { FavoritesList, IHandbag } from "../../types/handBag.type";
import { Ionicons } from "@expo/vector-icons";
import Feedback from "./feedback";
import { favoriteService } from "../../services/favoriteService";

type Props = NativeStackScreenProps<HomeStackParamList, "Detail">;

const DetailScreen = ({ route }: Props) => {
  const { handbagId } = route.params;
  const [handbag, setHandbag] = useState<IHandbag | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchHandbagDetail = async () => {
      try {
        setLoading(true);
        const data = await handbagAPI.getHandbagById(handbagId);
        setHandbag(data);

        // Check if this handbag is in favorites
        const favoriteStatus = await favoriteService.isFavorite(handbagId);
        setIsFavorite(favoriteStatus);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHandbagDetail();
  }, [handbagId]);

  const handleToggleFavorite = async () => {
    if (!handbag) return;

    try {
      const result = await favoriteService.toogleFavorite(handbag);
      setIsFavorite(result.action === "added");

      Alert.alert(
        "Thành công",
        result.action === "added"
          ? "Đã thêm vào yêu thích"
          : "Đã xóa khỏi yêu thích",
      );
    } catch (error) {
      Alert.alert("Lỗi", "Không thể cập nhật yêu thích");
    }
  };
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Đang tải...</Text>
      </View>
    );
  }

  if (error || !handbag) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="alert-circle-outline" size={60} color="#FF0000" />
        <Text style={styles.errorText}>
          {error || "Không tìm thấy sản phẩm"}
        </Text>
      </View>
    );
  }

  const discountPercent = Math.round(handbag.percentOff * 100);
  const originalPrice = Math.round(handbag.cost / (1 - handbag.percentOff));

  return (
    <ScrollView style={styles.container}>
      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: handbag.uri }} style={styles.productImage} />
        {discountPercent > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discountPercent}% OFF</Text>
          </View>
        )}

        {/* Favorite Button */}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleToggleFavorite}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={28}
            color={isFavorite ? "#FF4444" : "#000"}
          />
        </TouchableOpacity>
      </View>

      {/* Product Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.brandName}>{handbag.brand.toUpperCase()}</Text>
        <Text style={styles.productName}>{handbag.handbagName}</Text>

        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>
            ${handbag.cost.toLocaleString()}
          </Text>
          {discountPercent > 0 && (
            <Text style={styles.originalPrice}>
              ${originalPrice.toLocaleString()}
            </Text>
          )}
        </View>

        {/* Details */}
        <View style={styles.detailsSection}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>ID:</Text>
            <Text style={styles.detailValue}>{handbag.id}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Danh mục:</Text>
            <Text style={styles.detailValue}>{handbag.category}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Giới tính:</Text>
            <Text style={styles.detailValue}>
              {handbag.gender ? "Nữ" : "Nam"}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Màu sắc:</Text>
            <View style={styles.colorContainer}>
              {handbag.color.map((color, index) => (
                <View key={index} style={styles.colorBadge}>
                  <Text style={styles.colorText}>{color}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* Feedback Section */}
      <Feedback feedbacks={handbag.feedbacks} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: "#FF0000",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#FFF",
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  discountBadge: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "#E8B84C",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 25,
  },
  discountText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  favoriteButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "white",
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoContainer: {
    backgroundColor: "#FFF",
    padding: 20,
    marginTop: 10,
  },
  brandName: {
    fontSize: 14,
    color: "#B8956A",
    fontWeight: "600",
    letterSpacing: 1,
    marginBottom: 8,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 16,
    lineHeight: 32,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
  currentPrice: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  originalPrice: {
    fontSize: 18,
    color: "#999",
    textDecorationLine: "line-through",
  },
  detailsSection: {
    marginTop: 10,
    gap: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    width: 100,
  },
  detailValue: {
    fontSize: 16,
    color: "#000",
    flex: 1,
  },
  colorContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    flex: 1,
  },
  colorBadge: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  colorText: {
    fontSize: 14,
    color: "#333",
  },
});

export default DetailScreen;
