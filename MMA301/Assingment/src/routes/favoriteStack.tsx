import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../types/app.type";
import FavoriteSreen from "../screens/Favorite/favoriteSreen";
import DetailScreen from "../screens/Detail/detailScreen";

const Stack = createNativeStackNavigator<HomeStackParamList>();

const FavoriteStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Home"
        component={FavoriteSreen}
        options={{
          headerShown: false,
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

export default FavoriteStack;
