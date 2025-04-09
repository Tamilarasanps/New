import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import CategoryList from "@/app/(screen)/CategoryList";
import SelectProduct from "@/app/(screen)/SelectProduct";
import HomeScreen from "../src/HomeScreen";
import ProductList from "@/app/(screen)/ProductList";
import ProductDetails from "@/app/(screen)/ProductDetails";
import wishlistScreen from "../src/WishlistScreen";

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
        name="SelectProduct" // 👈 new screen
        component={SelectProduct}
        options={{ title: "SelectedProduct ", headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetails" // 👈 new screen
        component={ProductDetails}
        options={{ title: "ProductDetails ", headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const HeaderStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="wishlistScreen"
        component={wishlistScreen}
        options={{ title: "Home", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export { HeaderStack };
