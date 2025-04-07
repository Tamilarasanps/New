import { View, Text, Pressable } from "react-native";
import React from "react";

export default function Innerpage1({ navigation }) {
  return (
    <View>
      <View className="mt-10">
        <Pressable
          className="bg-red-800 p-3 items-center"
          onPress={() => navigation.navigate("Inner1")}
        >
          <Text className="text-white">Go to Inner Screen 2</Text>
        </Pressable>
      </View>
    </View>
  );
}
