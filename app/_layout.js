import React from "react";
import { Platform } from "react-native";
import "../global.css";
import { Stack } from "expo-router";
import { LoadingProvider } from "./context/LoadingContext";
import { AuthProvider } from "./context/AuthProvider";
import { SocketProvider } from "./context/SocketContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


// Assuming that these components exist in your project

// const Tab = createBottomTabNavigator();

// // Bottom Bar for mobile devices, excludes web
// function BottomBar() {
//   // if (Platform.OS === "web") {
//   //   return null; // Don't show bottom bar on web
//   // }

//   return (
//     <Tab.Navigator
//       initialRouteName="HomePage"
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {
//           backgroundColor: "white",
//           borderRadius: 10,
//           height: 60,
//         },
//         tabBarActiveTintColor: "teal",
//         tabBarInactiveTintColor: "grey",
//       }}
//     >
//       <Tab.Screen
//         name="HomePage"
//         component={HomePage}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <Icon name="home" color={color} size={30} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Category"
//         component={IndustryPage}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <Icon name="cogs" color={color} size={30} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Sell"
//         component={Sell}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <Icon name="plus" color={color} size={30} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Fav"
//         component={WishList}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <Icon name="star" color={color} size={30} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <Icon name="user" color={color} size={30} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

// Layout Component to wrap the main context providers
const Layout = () => {
  const admin = false; // You can change this based on actual logic

  return (
    <AuthProvider>
      <SocketProvider>
        <LoadingProvider>
          <Stack screenOptions={{ headerShown: false }}></Stack>
        </LoadingProvider>
      </SocketProvider>
    </AuthProvider>
  );
};

export default Layout;

//
