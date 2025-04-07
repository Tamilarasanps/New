import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import HomeStack from "./HomeStack";
import Hom from "../(screen)/Hom";
import Wish from "../(screen)/Wish";
import InnerPage2 from "../(screen)/folder/InnerPage2";
import Prod from "../(screen)/Prod";

const Tab = createBottomTabNavigator();

export default function BottomBarNavi() {
  if (Platform.OS === "web") {
    return null;
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,  // Hide label text
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
        name="Page1"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => <Icon name="home" color={color} size={30} />,
        }}
      />
      <Tab.Screen
        name="Page2"
        component={Hom}
        options={{
          tabBarIcon: ({ color }) => <Icon name="cogs" color={color} size={30} />,
        }}
      />
      <Tab.Screen
        name="Page3"
        component={Prod}
        options={{
          tabBarIcon: ({ color }) => <Icon name="plus" color={color} size={30} />,
        }}
      />
      <Tab.Screen
        name="Page4"
        component={Wish}
        options={{
          tabBarIcon: ({ color }) => <Icon name="star" color={color} size={30} />,
        }}
      />
      <Tab.Screen
        name="Page5"
        component={InnerPage2}
        options={{
          tabBarIcon: ({ color }) => <Icon name="user" color={color} size={30} />,
        }}
      />
    </Tab.Navigator>
  );
}
