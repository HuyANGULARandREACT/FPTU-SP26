import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type SortOrder = "asc" | "desc";

interface SortBarProps {
  sortOrder: SortOrder;
  onSortChange: (order: SortOrder) => void;
}

const SortBar = ({ sortOrder, onSortChange }: SortBarProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Price:</Text>
      <View style={styles.segmentedControl}>
        <TouchableOpacity
          style={[
            styles.segment,
            styles.leftSegment,
            sortOrder === "asc" && styles.segmentActive,
          ]}
          onPress={() => onSortChange("asc")}
        >
          <Ionicons
            name="arrow-up"
            size={20}
            color={sortOrder === "asc" ? "#FFF" : "#666"}
          />
          <Text
            style={[
              styles.segmentText,
              sortOrder === "asc" && styles.segmentTextActive,
            ]}
          >
            Accenseding
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.segment,
            styles.rightSegment,
            sortOrder === "desc" && styles.segmentActive,
          ]}
          onPress={() => onSortChange("desc")}
        >
          <Ionicons
            name="arrow-down"
            size={20}
            color={sortOrder === "desc" ? "#FFF" : "#666"}
          />
          <Text
            style={[
              styles.segmentText,
              sortOrder === "desc" && styles.segmentTextActive,
            ]}
          >
            Desenseding
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 5,
    gap: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  segmentedControl: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#E5E5E5",
    borderRadius: 8,
    padding: 2,
  },
  segment: {
    flex: 1,
    flexDirection: "row",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  leftSegment: {
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  rightSegment: {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  segmentActive: {
    backgroundColor: "#007AFF",
  },
  segmentText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#666",
  },
  segmentTextActive: {
    color: "#FFF",
    fontWeight: "600",
  },
});

export default SortBar;
