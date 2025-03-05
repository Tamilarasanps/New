import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Platform } from "react-native";
import { MaterialIcons } from "react-native-vector-icons";
import { router } from "expo-router";

export default function Header() {
  // const sell = () => {
  //   router.push("/(component)/(sell)/Sell");
  // };
  // const chat = () => {
  //   router.push("/(component)/(chat)/Chat");
  // };
  // const profile = () => {
  //   router.push("/(component)/(profile)/Profile");
  // };
  const [searchBar, setSearchBar] = useState("");
  

  return (
    <>
      <View
        className=" h-[60px] flex-row items-center px-4 space-x-4"
        style={{
          backgroundColor: "#2095A2",
          position: "sticky",
          top: "0px",
          zIndex: 10,
        }}
      >
        {/* Logo / Title */}
        <Text className="text-white text-2xl font-bold">Machine Seller</Text>

        {/* Search Bar */}
        <View className="flex-1">
          <TextInput
            className="bg-white h-10 w-[50%] ms-64 rounded-md px-3 text-gray-800 outline-none"
            placeholder="Search..."
            value={searchBar}
            onChangeText={setSearchBar}
          />
        </View>

        {/* Sell Button */}
        <Pressable
          className="bg-red-500 px-10 py-2    rounded-md"
          onPress={sell}
        >
          <Text className="text-white text-center">Sell</Text>
        </Pressable>

        {/* Chat Icon */}
        <Pressable style={{ cursor: "pointer" }} onPress={chat}>
          <MaterialIcons name="chat" size={30} color="white" />
        </Pressable>

        {/* Profile Icon */}
        <Pressable style={{ cursor: "pointer" }} onPress={profile}>
          <MaterialIcons name="account-circle" size={40} color="white" />
        </Pressable>
      </View>
    </>
  );
}