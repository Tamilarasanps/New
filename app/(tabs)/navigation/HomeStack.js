import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomePage from "../HomePage";
import CategoryList from "@/app/(Screens)/(screen)/CategoryList";
import SelectProduct from "@/app/(Screens)/(screen)/SelectProduct";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="IndustryPage"
        component={HomePage}
        options={{ title: "Home", headerShown: false }}
      />
      <Stack.Screen
        name="CategoryList" // 👈 new screen
        component={CategoryList}
        options={{ title: "CategoryList ", headerShown: false }}
      />
      <Stack.Screen
        name="SelectedProduct" // 👈 new screen
        component={SelectProduct}
        options={{ title: "CategoryList ", headerShown: false }}
      />
    </Stack.Navigator>
  );
}
