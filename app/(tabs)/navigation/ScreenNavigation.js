import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import IndustrieScreen from "../src/Folder/IndustrieScreen";
import CategoryScreen from "../src/Folder/CategoryScreen";
import ProductList from "@/app/(Screens)/(screen)/ProductList";
import CategoryList from "@/app/(Screens)/(screen)/CategoryList";

const Stack = createNativeStackNavigator();

export default function ScreenNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="IndustryPage"
        component={IndustrieScreen}
        options={{ title: "Home", headerShown: false }}
      />
      <Stack.Screen
        name="CategoryScreen" // 👈 new screen
        component={CategoryScreen}
        options={{ title: "Category Screen", headerShown: false }}
      />
      <Stack.Screen
        name="ProductList" // 👈 new screen
        component={ProductList}
        options={{ title: "ProductList ", headerShown: false }}
      />
      <Stack.Screen
        name="CategoryList" // 👈 new screen
        component={CategoryList}
        options={{ title: "CategoryList ", headerShown: false }}
      />
    </Stack.Navigator>
  );
}
