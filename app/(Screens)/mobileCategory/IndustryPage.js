import { View, Text, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../(header)/Header";
import { useRouter } from "expo-router"; // ✅ Correct import

export default function IndustryPage() {
  const router = useRouter(); // ✅ Use the hook inside the component

  return (
    <SafeAreaView>
      <Header />
      <View className="mt-10">
        <Pressable
          onPress={() => {
            router.push('/(Screens)/(frontPage)/Explore');
          }}
          className="bg-red-800 p-3 items-center" // ✅ Fixed typo: "itmes-center" → "items-center"
        >
          <Text className="text-white">Press me</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
