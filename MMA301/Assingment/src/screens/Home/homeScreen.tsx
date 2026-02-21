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

const HomeScreen = () => {
  const { handbags, loading, error } = useHomeData();
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const filteredHandbags = selectedBrand
    ? handbags.filter((handbag) => handbag.brand === selectedBrand)
    : handbags;

  return (
    <View style={styles.body}>
      <BrandFilter />
      <HandbagGrid
        handbags={filteredHandbags}
        loading={loading}
        error={error}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  body: { flex: 1, padding: 5 },
});
export default HomeScreen;
