import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

interface BrandFilterProps {
  brands: string[];
  selectedBrand: string | null;
  onBrandSelect: (brand: string | null) => void;
}

const BrandFilter = ({ brands, selectedBrand, onBrandSelect }: BrandFilterProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filterBar}
      contentContainerStyle={styles.filterContent}
    >
      <TouchableOpacity
        style={[
          styles.brandButton,
          selectedBrand === null && styles.brandButtonActive,
        ]}
        onPress={() => onBrandSelect(null)}
      >
        <Text
          style={[
            styles.brandText,
            selectedBrand === null && styles.brandTextActive,
          ]}
        >
          All
        </Text>
      </TouchableOpacity>
      {brands.map((brand) => (
        <TouchableOpacity
          key={brand}
          style={[
            styles.brandButton,
            selectedBrand === brand && styles.brandButtonActive,
          ]}
          onPress={() => onBrandSelect(brand)}
        >
          <Text
            style={[
              styles.brandText,
              selectedBrand === brand && styles.brandTextActive,
            ]}
          >
            {brand}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  filterBar: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  filterContent: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 8,
  },
  brandButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  brandButtonActive: {
    backgroundColor: "#007AFF",
  },
  brandText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  brandTextActive: {
    color: "#fff",
  },
});
export default BrandFilter;
