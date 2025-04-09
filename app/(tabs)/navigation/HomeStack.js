import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import CategoryList from "@/app/(screen)/CategoryList";
import SelectProduct from "@/app/(screen)/SelectProduct";
import HomeScreen from "../src/HomeScreen";
import ProductList from "@/app/(screen)/ProductList";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomePage"
        component={HomeScreen}
        options={{ title: "Home", headerShown: false }}
      />
      <Stack.Screen
        name="CategoryList" // 👈 new screen
        component={CategoryList}
        options={{ title: "CategoryList ", headerShown: false }}
      />
      <Stack.Screen
        name="ProductList" // 👈 new screen
        component={ProductList}
        options={{ title: "ProductList ", headerShown: false }}
      />
      <Stack.Screen
        name="SelectedProduct" // 👈 new screen
        component={SelectProduct}
        options={{ title: "CategoryList ", headerShown: false }}
      />
    </Stack.Navigator>
  );
}
