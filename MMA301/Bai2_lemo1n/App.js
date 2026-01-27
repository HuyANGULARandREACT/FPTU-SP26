import * as React from "react";
import { StyleSheet, View } from "react-native";
import LittleLemonHeader from "./components/HeaderEx";
import LittleLemonFooter from "./components/Footer";
import WelcomScreen from "./components/WelcomScreen";
import MenuItems from "./components/MenuItems";

export default function App() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#333333",
    },
    footerContainer: { backgroundColor: "#333333" },
  });
  return (
    <>
      <View style={styles.container}>
        <LittleLemonHeader />
        {/* <WelcomScreen/> */}
        <MenuItems />
      </View>
      <View style={styles.footerContainer}>
        <LittleLemonFooter />
      </View>
    </>
  );
}
