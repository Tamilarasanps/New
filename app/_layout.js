import React from "react";
import "../global.css";
import { Stack } from "expo-router";
import { LoadingProvider } from "./context/LoadingContext";
import { AuthProvider } from "./context/AuthProvider";
import { SocketProvider } from "./context/SocketContext";

const Layout = () => {
  return (
    <AuthProvider>
      <SocketProvider>
        <LoadingProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </LoadingProvider>
      </SocketProvider>
    </AuthProvider>
  );
};

export default Layout;
