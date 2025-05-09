import {
  View,
  Text,
  useWindowDimensions,
 
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function HomePageAdmin() {
  const { width } = useWindowDimensions();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <View className="flex-1">
      {/* Mobile Menu - overlay */}
      {width < 1024 && isMenuVisible && (
        <View className="absolute top-0 left-0 h-full w-[60%] bg-red-100 z-20 p-4">
          {/* Close icon */}
          <Pressable
            onPress={toggleMenu}
            style={{ position: "absolute", top: 10, right: 10 }}
          >
            <Ionicons name="close" size={30} color="black" />
          </Pressable>

          <Text className="text-lg font-bold text-center mt-10">Menu</Text>
          <View className="mt-8 ml-3">
            <Text className="text-lg font-semibold">AdminPage</Text>
            <Text className="text-lg font-semibold mt-3">ProductPage</Text>
          </View>
        </View>
      )}

      {/* Desktop Menu */}
      {width >= 1024 && (
        <View className="absolute left-0 top-0 h-full w-[20%] bg-red-100 z-10 p-4">
          <Text className="text-lg font-bold text-center">Menu</Text>
          <View className="mt-8 ml-3">
            <Text className="text-lg font-semibold">AdminPage</Text>
            <Text className="text-lg font-semibold mt-3">ProductPage</Text>
          </View>
        </View>
      )}

      {/* Right Side Content */}
      <View
        className={`bg-blue-100 h-full ${
          width >= 1024 ? "ml-[20%]" : "w-full"
        }`}
      >
        <View className="items-center mt-10">
          <Text className="text-lg font-bold">Welcome To Admin Page</Text>
        </View>
        <Text className="ml-5 mt-3">Welcome to the right side</Text>

        {/* Menu Toggle Button for Mobile */}
        {width < 1024 && (
          <Pressable
            onPress={toggleMenu}
            // className="absolute top-10 left-20 z-30"
            style={{ position: "absolute", top: 20, left: 20, zIndex: 30 }}
          >
            <Ionicons name="menu" size={30} color="red" />
          </Pressable>
        )}
      </View>
    </View>
  );
}
