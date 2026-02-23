import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchHandbagProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
}

const SearchHandbag = ({ searchQuery, onSearchChange }: SearchHandbagProps) => {
  return (
    <View style={styles.searchBar}>
      <Ionicons name="search" size={20} color="#666" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search by name..."
        value={searchQuery}
        onChangeText={onSearchChange}
        placeholderTextColor="#999"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
});
export default SearchHandbag;
