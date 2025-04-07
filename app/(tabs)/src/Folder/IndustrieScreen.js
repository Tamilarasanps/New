import { View, Text, Pressable, SafeAreaView } from "react-native";
import React from "react";
import Header from "@/app/(Screens)/(header)/Header";
export default function IndustrieScreen({ navigation }) {
  return (
    <SafeAreaView>
      <View>
        <Header />
        <View className="items-center mt-5">
          <Text className="text-lg font-bold">All Industires List</Text>
        </View>
        <View className="flex items-center">
          <Pressable
            className="mt-3 bg-red-600 w-[90%] h-[40] rounded-md flex items-center justify-center"
            onPress={() => navigation.navigate("CategoryScreen")}
          >
            <Text className="font-semibold text-xl text-white">
              Spinning Machines
            </Text>
          </Pressable>
          <Pressable className="mt-3 bg-red-600 w-[90%] h-[40] rounded-md flex items-center justify-center">
            <Text className="font-semibold text-xl text-white">
              Weaving Machines
            </Text>
          </Pressable>
          <Pressable className="mt-3 bg-red-600 w-[90%] h-[40] rounded-md flex items-center justify-center">
            <Text className="font-semibold text-xl text-white">
              Knitting Machines
            </Text>
          </Pressable>
          <Pressable className="mt-3 bg-red-600 w-[90%] h-[40] rounded-md flex items-center justify-center">
            <Text className="font-semibold text-xl text-white">
              Textile Dyeing Machines
            </Text>
          </Pressable>
          <Pressable className="mt-3 bg-red-600 w-[90%] h-[40] rounded-md flex items-center justify-center">
            <Text className="font-semibold text-xl text-white">
              Textile Printing Machines
            </Text>
          </Pressable>
          <Pressable className="mt-3 bg-red-600 w-[90%] h-[40] rounded-md flex items-center justify-center">
            <Text className="font-semibold text-xl text-white">
              Finishing Machines
            </Text>
          </Pressable>
          <Pressable className="mt-3 bg-red-600 w-[90%] h-[40] rounded-md flex items-center justify-center">
            <Text className="font-semibold text-xl text-white">
              Nonwoven Machines
            </Text>
          </Pressable>
          <Pressable className="mt-3 bg-red-600 w-[90%] h-[40] rounded-md flex items-center justify-center">
            <Text className="font-semibold text-xl text-white">
              Textile Testing Machines
            </Text>
          </Pressable>
          <Pressable className="mt-3 bg-red-600 w-[90%] h-[40] rounded-md flex items-center justify-center">
            <Text className="font-semibold text-xl text-white">
              Textile Reprocessing Machines
            </Text>
          </Pressable>
          <Pressable className="mt-3 bg-red-600 w-[90%] h-[40] rounded-md flex items-center justify-center">
            <Text className="font-semibold text-xl text-white">
              Embroidery Machines
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}


