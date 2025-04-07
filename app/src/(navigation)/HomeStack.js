import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import InnerPage1 from "../(screen)/folder/Innerpage1";
import InnerPage2 from "../(screen)/folder/InnerPage2";
import CategoryScreen from "@/app/(tabs)/src/Folder/CategoryScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={InnerPage1}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="Inner1"
        component={InnerPage2}
        options={{ title: "Inner Screen 1" }}
      />
      <Stack.Screen
        name="CategoryScreen"
        component={CategoryScreen}
        options={{ title: "Inner Screen 1" }}
      />
    </Stack.Navigator>
  );
}
