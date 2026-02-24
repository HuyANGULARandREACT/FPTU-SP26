import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IFeedbacks } from "../../types/handBag.type";
import { Ionicons } from "@expo/vector-icons";

interface FeedbackProps {
  feedbacks: IFeedbacks[];
}

const Feedback = ({ feedbacks }: FeedbackProps) => {
  // Tính toán rating trung bình
  const calculateAverageRating = (): number => {
    if (feedbacks.length === 0) return 0;
    const total = feedbacks.reduce((sum, fb) => sum + fb.rating, 0);
    return total / feedbacks.length;
  };

  // Đếm số lượng mỗi loại rating
  const getRatingCount = (rating: number): number => {
    return feedbacks.filter((fb) => fb.rating === rating).length;
  };

  // Tính phần trăm recommendation (rating >= 4)
  const getRecommendationPercent = (): number => {
    if (feedbacks.length === 0) return 0;
    const recommended = feedbacks.filter((fb) => fb.rating >= 4).length;
    return Math.round((recommended / feedbacks.length) * 100);
  };

  const averageRating = calculateAverageRating();
  const recommendationPercent = getRecommendationPercent();

  // Render stars
  const renderStars = (rating: number, size: number = 16) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={size}
          color="#E8B84C"
        />,
      );
    }
    return stars;
  };

  // Render rating bar
  const renderRatingBar = (rating: number) => {
    const count = getRatingCount(rating);
    const total = feedbacks.length;
    const percentage = total > 0 ? (count / total) * 100 : 0;

    return (
      <View key={rating} style={styles.ratingBarRow}>
        <Text style={styles.ratingNumber}>{rating}</Text>
        <View style={styles.barContainer}>
          <View style={[styles.barFill, { width: `${percentage}%` }]} />
        </View>
        <Text style={styles.ratingCount}>{count}</Text>
      </View>
    );
  };

  // Lấy initials từ id
  const getInitials = (id: string): string => {
    return id.substring(0, 2).toUpperCase();
  };

  if (feedbacks.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Feedback</Text>
        <Text style={styles.noFeedbackText}>Chưa có đánh giá nào</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Feedback</Text>

      {/* Rating Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.averageRatingContainer}>
          <Text style={styles.averageRating}>
            {averageRating.toFixed(1)}
            <Text style={styles.maxRating}> /5</Text>
          </Text>
          <View style={styles.starsContainer}>{renderStars(5, 20)}</View>
          <Text style={styles.recommendationText}>
            {recommendationPercent}% RECOMMENDATION
          </Text>
        </View>
      </View>

      {/* Rating Bars */}
      <View style={styles.ratingBarsContainer}>
        {[5, 4, 3, 2, 1].map((rating) => renderRatingBar(rating))}
      </View>

      {/* Feedback List */}
      <View style={styles.feedbackList}>
        {feedbacks.map((feedback) => (
          <View key={feedback.id} style={styles.feedbackCard}>
            <View style={styles.feedbackHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {getInitials(feedback.id)}
                </Text>
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>User {feedback.id}</Text>
              </View>
              <View style={styles.userRating}>
                {renderStars(feedback.rating)}
              </View>
            </View>
            <Text style={styles.feedbackContent}>"{feedback.content}"</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    padding: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  noFeedbackText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    paddingVertical: 20,
  },
  summaryContainer: {
    marginBottom: 24,
  },
  averageRatingContainer: {
    alignItems: "center",
  },
  averageRating: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#000",
  },
  maxRating: {
    fontSize: 24,
    color: "#999",
  },
  starsContainer: {
    flexDirection: "row",
    gap: 4,
    marginVertical: 8,
  },
  recommendationText: {
    fontSize: 12,
    color: "#999",
    fontWeight: "600",
    letterSpacing: 1,
    marginTop: 4,
  },
  ratingBarsContainer: {
    marginBottom: 24,
  },
  ratingBarRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    width: 20,
  },
  barContainer: {
    flex: 1,
    height: 8,
    backgroundColor: "#F0F0F0",
    borderRadius: 4,
    marginHorizontal: 12,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    backgroundColor: "#E8B84C",
    borderRadius: 4,
  },
  ratingCount: {
    fontSize: 14,
    color: "#666",
    width: 30,
    textAlign: "right",
  },
  feedbackList: {
    gap: 16,
  },
  feedbackCard: {
    backgroundColor: "#F8F8F8",
    padding: 16,
    borderRadius: 12,
  },
  feedbackHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E0D4C0",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  userBadge: {
    fontSize: 11,
    color: "#999",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  userRating: {
    flexDirection: "row",
    gap: 2,
  },
  feedbackContent: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
    fontStyle: "italic",
  },
});

export default Feedback;
