import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import HomePage from "./HomePage";

import Sell from "./Sell";
import WishList from "./Fav";
import Profile from "./Profile";
import NesestedPage from "./NesestedPage";


const Tab = createBottomTabNavigator();

function BottomBar() {
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
        component={HomePage}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Category"
        component={NesestedPage}
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
        name="fav"
        component={WishList}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="star" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
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

export default BottomBar;
