import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../types/app.type";
import HomeScreen from "../screens/Home/homeScreen";
import DetailScreen from "../screens/Detail/detailScreen";

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Handbag Home",
        }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          title: "Chi tiết sản phẩm",
          headerBackTitle: "Back",
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
