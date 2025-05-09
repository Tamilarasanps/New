import Right from "@/app/(chat)/RightPart/Right";
import Login from "@/app/screens/(auth)/(login)/Login";
import HomeScreen from "@/app/screens/(Homepage)/HomeScreen";
import CategoryList from "@/app/screens/(productPage)/CategoryList";
import ProductDetails from "@/app/screens/(productPage)/ProductDetails";
import ProductList from "@/app/screens/(productPage)/ProductList";
import SelectProduct from "@/app/screens/(productPage)/SelectProduct";
import ProfileScreen from "@/app/screens/(profile)/ProfileScreen";
import wishlistScreen from "@/app/screens/(wishlists)/WishlistScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ProfileStack from "./ProfileStack";
import SellScreen from "@/app/screens/(sellerForm)/SellScreen";
import ChatUser from "@/app/(chat)/RightPart/ChatUser";
import WishlistScreen from "@/app/screens/(wishlists)/WishlistScreen";
import SignUp from "@/app/screens/(auth)/(SignIn)/SignUp";
import LandingPage from "@/app/screens/LandingPage";
import MechanicList_2 from "@/app/mechanicApp/MechanicList_2";
import ProfilePage from "@/app/screens/(profile)/ProfilePage";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
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
        name="WishList" // 👈 new screen
        component={HeaderStack}
        options={{ title: "WishList ", headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetails" // 👈 new screen
        component={ProductDetails}
        options={{ title: "ProductDetails ", headerShown: false }}
      />
      <Stack.Screen
        name="Chat" // 👈 new screen
        component={ChatUser}
        options={{ title: "Chat ", headerShown: false }}
      />
      <Stack.Screen
        name="ProfilePage" // 👈 new screen
        component={ProfileStack}
        options={{ title: "ProfilePage ", headerShown: false }}
      />
      <Stack.Screen
        name="SellScreen" // 👈 new screen
        component={SellScreen}
        options={{ title: "SellScreen ", headerShown: false }}
      />

      <Stack.Screen
        name="LoginPage" // 👈 new screen
        component={Login}
        options={{ title: "LoginPage ", headerShown: false }}
      />
      <Stack.Screen
        name="SignUp" // 👈 new screen
        component={SignUp}
        options={{ title: "SignUp ", headerShown: false }}
      />
      <Stack.Screen
        name="LandingPage" // 👈 new screen
        component={LandingPage}
        options={{ title: "LandingPage ", headerShown: false }}
      />
      <Stack.Screen
        name="MechanicList_2" // 👈 new screen
        component={MechanicList_2}
        options={{ title: "MechanicList_2 ", headerShown: false }}
      />
      <Stack.Screen
        name="ProfilePage" // 👈 new screen
        component={ProfilePage}
        options={{ title: "ProfilePage ", headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const HeaderStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Fav"
        component={wishlistScreen}
        options={{ title: "Home", headerShown: false }}
      />
      <Stack.Screen
        name="ProfilePage" // 👈 new screen
        component={ProfileScreen}
        options={{ title: "ProfilePage ", headerShown: false }}
      />
      <Stack.Screen
        name="LoginPage" // 👈 new screen
        component={Login}
        options={{ title: "LoginPage ", headerShown: false }}
      />
      <Stack.Screen
        name="SignUp" // 👈 new screen
        component={SignUp}
        options={{ title: "SignUp ", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export { HeaderStack };

const SellStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SellPage" // 👈 new screen
        component={SellScreen}
        options={{ title: "SellPage ", headerShown: false }}
      />
      <Stack.Screen
        name="LoginPage" // 👈 new screen
        component={Login}
        options={{ title: "LoginPage ", headerShown: false }}
      />
      <Stack.Screen
        name="SignUp" // 👈 new screen
        component={SignUp}
        options={{ title: "SignUp ", headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export { SellStack };

const WishlistStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Fav" // 👈 new screen
        component={WishlistScreen}
        options={{ title: "Fav ", headerShown: false }}
      />
      <Stack.Screen
        name="LoginPage" // 👈 new screen
        component={Login}
        options={{ title: "LoginPage ", headerShown: false }}
      />
      <Stack.Screen
        name="SignUp" // 👈 new screen
        component={SignUp}
        options={{ title: "SignUp ", headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export { WishlistStack };
