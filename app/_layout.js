import React from "react";
import "../global.css";
import { Stack } from "expo-router";
import { LoadingProvider } from "./context/LoadingContext";
import { AuthProvider } from "./context/AuthProvider";
import { SocketProvider } from "./context/SocketContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

const Layout = () => {
  const admin = false;
  return (
    <AuthProvider>
      <SocketProvider>
        <LoadingProvider>
          {/* {admin ? ( */}
            <Stack screenOptions={{ headerShown: false }} />
          {/* ) : ( */}
            {/* <Drawer headerShown={false} >
             
            </Drawer> */}
          {/* )} */}
        </LoadingProvider>
      </SocketProvider>
    </AuthProvider>
  );
};

export default Layout;
