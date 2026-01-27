import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function WelcomScreen() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    headerText: {
      padding: 40,
      fontSize: 30,
      color: "#EDEFEE",
      textAlign: "center",
    },
    regularText: {
      fontSize: 24,
      padding: 20,
      marginVertical: 8,
      color: "#EDEFEE",
      textAlign: "center",
    },
  });
  return (
    <ScrollView indicatorStyle="white" style={styles.container}>
      <Text style={styles.headerText}>Welcom to little lemon</Text>
      <Text style={styles.regularText}>
        Little Lemon is a charming neighborhood bistro that serves simple food
        and classic cocktails in a lively but casual environment. We would love
        to hear more about your experience with us
      </Text>
    </ScrollView>
  );
}
