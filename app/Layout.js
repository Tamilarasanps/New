import React from "react";
import { Stack } from "expo-router";
import { LoadingProvider } from "./context/LoadingContext";

const Layout = () => {
  return (
    <LoadingProvider>
      <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
        <Stack.Screen name="index" /> {/* HomePage */}
        <Stack.Screen name="ProductList" /> {/* productPage*/}
        <Stack.Screen name="Sell" /> {/* productPage*/}
      </Stack>
    </LoadingProvider>
  );
};

export default Layout;
