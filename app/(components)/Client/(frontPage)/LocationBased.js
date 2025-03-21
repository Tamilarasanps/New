import { View, Text, Image, useWindowDimensions,Pressable,ScrollView } from "react-native";
import React from "react";
// import { Pressable, ScrollView } from "react-native-gesture-handler";

export default function LocationBased() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 600;

  return (
    <View className="bg-gray-200">
      <View className="flex flex-row items-center w-full px-2 mt-4 mb-4">
        <Text className="text-xl font-bold text-TealGreen">Location</Text>
        <View className="flex-1">
          <Pressable
            className="font-bold text-red-500"
            onPress={() => alert("See All Clicked")}
          >
            <Text className="font-semibold absolute right-3">See All</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView
        horizontal={isLargeScreen}
        showsHorizontalScrollIndicator={false}
      >
        <View
          className={`gap-4 mb-6  px-4 ${
            isLargeScreen ? "flex-row" : "flex-col"
          }`}
        >
          {/* Card 1 */}
          <View
            className="bg-white rounded-md p-4 border-2 border-gray-300"
            style={{ width: isLargeScreen ? 350 : "100%" }}
          >
            <Image
              className="rounded-sm"
              style={{ width: "100%", height: 200 }}
              source={require("../../../assets/machine/fabric.png")}
            />
            <View className="flex flex-row items-center mt-3">
              <Text className="price bg-TealGreen text-white text-center rounded-sm w-[80px] h-[27px]">
                ₹ 100000
              </Text>
              <Text
                className="type text-TealGreen font-bold text-lg ml-auto"
                style={{ width: 80 }}
              >
                Used
              </Text>
            </View>
            <Text className="name text-TealGreen font-semibold mt-2">
              Cone Vieting
            </Text>
            <Text className="year text-gray-600 font-semibold mt-1">2024</Text>
            <Text className="year text-gray-600 font-semibold mt-1">
              Location
            </Text>
          </View>

          {/* Card 2 */}
          <View
            className="bg-white rounded-md p-4 border-2 border-gray-300"
            style={{ width: isLargeScreen ? 350 : "100%" }}
          >
            <Image
              className="rounded-sm"
              style={{ width: "100%", height: 200 }}
              source={require("../../../assets/machine/fabric.png")}
            />
            <View className="flex flex-row items-center mt-3">
              <Text className="price bg-TealGreen text-white text-center rounded-sm w-[80px] h-[27px]">
                ₹ 100000
              </Text>
              <Text
                className="type text-TealGreen font-bold text-lg ml-auto"
                style={{ width: 80 }}
              >
                Used
              </Text>
            </View>
            <Text className="name text-TealGreen font-semibold mt-2">
              Cone Vieting
            </Text>
            <Text className="year text-gray-600 font-semibold mt-1">2024</Text>
            <Text className="year text-gray-600 font-semibold mt-1">
              Location
            </Text>
          </View>

          {/* Card 3 */}
          <View
            className="bg-white rounded-md p-4 border-2 border-gray-300"
            style={{ width: isLargeScreen ? 350 : "100%" }}
          >
            <Image
              className="rounded-sm"
              style={{ width: "100%", height: 200 }}
              source={require("../../../assets/machine/fabric.png")}
            />
            <View className="flex flex-row items-center mt-3">
              <Text className="price bg-TealGreen text-white text-center rounded-sm w-[80px] h-[27px]">
                ₹ 100000
              </Text>
              <Text
                className="type text-TealGreen font-bold text-lg ml-auto"
                style={{ width: 80 }}
              >
                Used
              </Text>
            </View>
            <Text className="name text-TealGreen font-semibold mt-2">
              Cone Vieting
            </Text>
            <Text className="year text-gray-600 font-semibold mt-1">2024</Text>
            <Text className="year text-gray-600 font-semibold mt-1">
              Location
            </Text>
          </View>

          {/* Card 4 */}
          <View
            className="bg-white rounded-md p-4 border-2 border-gray-300"
            style={{ width: isLargeScreen ? 350 : "100%" }}
          >
            <Image
              className="rounded-sm"
              style={{ width: "100%", height: 200 }}
              source={require("../../../assets/machine/fabric.png")}
            />
            <View className="flex flex-row items-center mt-3">
              <Text className="price bg-TealGreen text-white text-center rounded-sm w-[80px] h-[27px]">
                ₹ 100000
              </Text>
              <Text
                className="type text-TealGreen font-bold text-lg ml-auto"
                style={{ width: 80 }}
              >
                Used
              </Text>
            </View>
            <Text className="name text-TealGreen font-semibold mt-2">
              Cone Vieting
            </Text>
            <Text className="year text-gray-600 font-semibold mt-1">2024</Text>
            <Text className="year text-gray-600 font-semibold mt-1">
              Location
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
