import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootTabParamList } from "../types/app.type";
import HomeStack from "./homeStack";
import FavoriteSreen from "../screens/Favorite/favoriteSreen";
import AboutSreen from "../screens/About/aboutSreen";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const AppRoute = () => {
  const Tab = createBottomTabNavigator<RootTabParamList>();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerTitleAlign: "center",
          tabBarActiveTintColor: "#2563eb",
          tabBarInactiveTintColor: "#6b7280",
          tabBarIcon: ({ color, size, focused }) => {
            if (route.name === "HomeStack") {
              const iconName = focused ? "home" : "home-outline";
              return <Ionicons name={iconName} size={size} color={color} />;
            } else if (route.name === "Favorite") {
              return (
                <MaterialIcons
                  name={focused ? "favorite" : "favorite-outline"}
                  size={size}
                  color={color}
                />
              );
            } else {
              const iconName = focused ? "person" : "person-outline";
              return <Ionicons name={iconName} size={size} color={color} />;
            }
          },
        })}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            headerShown: false,
            tabBarLabel: "Home",
          }}
        />
        <Tab.Screen name="Favorite" component={FavoriteSreen} />
        <Tab.Screen name="About" component={AboutSreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppRoute;
