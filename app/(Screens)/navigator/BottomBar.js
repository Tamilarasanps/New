import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome"; // Add Icon import
import HomePage from "../(frontPage)/HomePage";
import IndustryPage from "../mobileCategory/IndustryPage";
import Sell from "../(sell)/Sell";
import WishList from "../(screen)/Fav";
import Profile from "../Profile/Profile";

export default function BottomBar() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="HomePage"
      screenOptions={{
        headerShown: false,
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
        component={HomePage}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Category"
        component={IndustryPage}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="cogs" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Sell"
        component={Sell}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="plus" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Fav"
        component={WishList}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="star" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
