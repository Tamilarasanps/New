import { View, Text, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../(header)/Header";
import { useRouter } from "expo-router";
export default function IndustryPage() {
  const router = useRouter();

  return (
    <SafeAreaView>
      <Header />
      <View className="mt-10">
        <Pressable className="bg-red-800 p-3 items-center">
          <Text className="text-white">Press me</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
