import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import HomeScreen from "../src/HomeScreen";
import SellScreen from "../src/SellScreen";
import wishlistScreen from "../src/WishlistScreen";
import ProfileScreen from "../src/ProfileScreen";
import ScreenNavigation from "./ScreenNavigation";

const Tab = createBottomTabNavigator();

function BottomNavBar() {
  if (Platform.OS === "web") {
    return null;
  }
  return (
    <Tab.Navigator
      initialRouteName="HomePage"
      screenOptions={{
        headerShown: false,
        // tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderRadius: 10,
          height: 60,
        },

        tabBarActiveTintColor: "teal",
        tabBarInactiveTintColor: "grey",
      }}
    >
      <Tab.Screen
        name="HomePage"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Category"
        component={ScreenNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="cogs" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Sell"
        component={SellScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="plus" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="fav"
        component={wishlistScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="star" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNavBar;
