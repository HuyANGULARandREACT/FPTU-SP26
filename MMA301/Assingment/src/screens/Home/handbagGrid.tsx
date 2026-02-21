import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IHandbag } from "../../types/handBag.type";

interface HandbagGridProps {
  handbags: IHandbag[];
  loading: boolean;
  error: string | null;
}

const HandbagGrid = ({ handbags, loading, error }: HandbagGridProps) => {
  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  if (error)
    return (
      <View>
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
          return (
            <TouchableOpacity style={styles.cardHandBag}>
              <View>
                <Text>{item.handbagName}</Text>
                <Text>${item.cost}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  allHandBags: {
    borderWidth: 1,
    flex: 5,
    borderColor: "black",
    padding: 5,
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  cardHandBag: {
    borderWidth: 1,
    width: "48%",
    padding: 10,
    borderRadius: 8,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
});
export default HandbagGrid;
