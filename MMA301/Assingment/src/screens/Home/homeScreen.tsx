import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IHandbag } from "../../types/handBag.type";
import { handbagAPI } from "../../services/handbagAPI";
import { useHomeData } from "../../hooks/useHomeData";
import HandbagGrid from "./handbagGrid";
import BrandFilter from "./brandFilter";
import { SearchBar } from "react-native-screens";
import SearchHandbag from "./searchHandbag";
import SortBar, { SortOrder } from "./sortBar";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = () => {
  const { handbags, favorites, loading, error, refreshFavorites } =
    useHomeData();
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // Refresh favorites khi quay lại màn hình Home
  useFocusEffect(
    React.useCallback(() => {
      refreshFavorites();
    }, []),
  );

  // Get unique brands from handbags
  const brands = Array.from(new Set(handbags.map((bag) => bag.brand)));
  // Filter handbags by both brand and search query
  const filteredHandbags = handbags
    .filter((handbag) => {
      const matchesBrand = selectedBrand
        ? handbag.brand === selectedBrand
        : true;
      const matchesSearch = searchQuery
        ? handbag.handbagName.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesBrand && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.cost - b.cost;
      } else {
        return b.cost - a.cost;
      }
    });

  return (
    <View style={styles.body}>
      <View style={styles.searchAndFilterBar}>
        <SearchHandbag
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <BrandFilter
          brands={brands}
          selectedBrand={selectedBrand}
          onBrandSelect={setSelectedBrand}
        />
      </View>
      <SortBar sortOrder={sortOrder} onSortChange={setSortOrder} />
      <HandbagGrid
        favorites={favorites}
        handbags={filteredHandbags}
        loading={loading}
        error={error}
        onFavoriteToggle={refreshFavorites}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  searchAndFilterBar: {
    flex: 1,
    gap: 10,
    paddingVertical: 5,
  },
  body: { flex: 1, padding: 5 },
});
export default HomeScreen;
