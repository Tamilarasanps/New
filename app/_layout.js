import React from "react";
import "../global.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ToastProvider } from "react-native-toast-notifications";
import CategoryManager from "./(components)/Admin/CategoryManager";
import Sell from "./(components)/Client/Sell";
import SignUp from "./(components)/SignUp";


const Layout = () => {
  const queryClient = new QueryClient();
  const Drawer = createDrawerNavigator();

  return (
    // Only use one NavigationContainer (provided by expo-router)
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <Drawer.Navigator
          
          initialRouteName="Sell"
          screenOptions={{
            drawerStyle: {
              backgroundColor : "white",
               width: 240 
              },
            drawerItemStyle:{
              backgroundColor : "#059669",
              width : "100%",
              marginVertical : 5,
              borderRadius : 0
            },
            drawerLabelStyle : {
              fontWeight : "bold",
              color : "white"
            },
            headerShown: false,
          }}
        >
          {/* Define routes and their components */}
          <Drawer.Screen
            name="CategoryManager"
            component={CategoryManager}
            options={{ drawerLabel: "Category Manager" }}
          />
          <Drawer.Screen
            name="Sell"
            component={Sell}
            options={{ drawerLabel: "Category Manager" }}
          />
          {/* <Drawer.Screen
            name="signup"
            component={SignUp}
            options={{ drawerLabel: "Category Manager" }}
          />
           */}
        </Drawer.Navigator>
      </ToastProvider>
    </QueryClientProvider>
  );
};

export default Layout;
