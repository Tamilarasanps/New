import { View, Text, Pressable } from "react-native";
import React from "react";

import { router } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/app/(header)/Header";
// import BottomBar from "@/app/(tabs)/_layout";
export default function CategoryPage() {
  return (
    <SafeAreaView>
      <View>
        <Header />
        <View className="flex items-center mt-10">
          <Text className="text-2xl font-Bold mb-8">All Category List</Text>
          <Pressable className="mt-3 bg-TealGreen w-[90%] h-[40] rounded-md flex items-center justify-center">
            <Text className="font-semibold text-xl text-white">
              Spinning Machines
            </Text>
          </Pressable>
          <Pressable className="mt-3 bg-TealGreen w-[90%] h-[40] rounded-md flex items-center justify-center">
            <Text className="font-semibold text-xl text-white">
              Weaving Machines
            </Text>
          </Pressable>
          <Pressable className="mt-3 bg-TealGreen w-[90%] h-[40] rounded-md flex items-center justify-center">
            <Text className="font-semibold text-xl text-white">
              Knitting Machines
            </Text>
          </Pressable>
          <Pressable className="mt-3 bg-TealGreen w-[90%] h-[40] rounded-md flex items-center justify-center">
            <Text className="font-semibold text-xl text-white">
              Textile Dyeing Machines
            </Text>
          </Pressable>
          <Pressable className="mt-3 bg-TealGreen w-[90%] h-[40] rounded-md flex items-center justify-center">
            <Text className="font-semibold text-xl text-white">
              Textile Printing Machines
            </Text>
          </Pressable>
          <Pressable className="mt-3 bg-TealGreen w-[90%] h-[40] rounded-md flex items-center justify-center">
            <Text className="font-semibold text-xl text-white">
              Finishing Machines
            </Text>
          </Pressable>
          <Pressable className="mt-3 bg-TealGreen w-[90%] h-[40] rounded-md flex items-center justify-center">
            <Text className="font-semibold text-xl text-white">
              Nonwoven Machines
            </Text>
          </Pressable>
          <Pressable className="mt-3 bg-TealGreen w-[90%] h-[40] rounded-md flex items-center justify-center">
            <Text className="font-semibold text-xl text-white">
              Textile Testing Machines
            </Text>
          </Pressable>
          <Pressable className="mt-3 bg-TealGreen w-[90%] h-[40] rounded-md flex items-center justify-center">
            <Text className="font-semibold text-xl text-white">
              Textile Reprocessing Machines
            </Text>
          </Pressable>
          <Pressable className="mt-3 bg-TealGreen w-[90%] h-[40] rounded-md flex items-center justify-center">
            <Text className="font-semibold text-xl text-white">
              Embroidery Machines
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
