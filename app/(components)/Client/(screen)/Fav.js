import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import Header from "../(header)/Header";
import All from "../(frontPage)/All";
import { FontAwesome } from "@expo/vector-icons"; // ✅ Correct import

const WishList = () => {
  return (
    <ScrollView>
      <View>
        <Header />
        <All />
        <View style={{zIndex:-1}}>

        <Text className="text-xl font-bold my-8 ms-20">My WishList (0)</Text>
        <View className="flex justify-center items-center mb-2 ">
          <View className="bg-gray-200 h-full p-5 w-[80%]  rounded-sm">
            <View className="flex flex-row bg-red-200 rounded-sm">
              <View className="p-5">
                <Image
                  source={require("../../../assets/machine/niting.jpg")}
                  style={{ width: 300, height: 250, borderRadius: 3 }}
                />
              </View>

              <View className="flex-1 p-5 ">
                {/* Row 1: Name and Star Icon */}
                <View className="flex flex-row relative">
                  <Text className="font-semibold text-lg">Tamilarasan</Text>
                  <View className="absolute right-4">
                    <FontAwesome name="star" size={30} color="yellow" />
                  </View>
                </View>

                {/* Row 2: Machine Name and Share Icon */}
                <View className="flex flex-row relative mt-8">
                  <Text className="font-semibold text-lg">Machine Name</Text>
                  <View className="absolute right-4">
                    <FontAwesome name="share" size={30} color="gray" />
                  </View>
                </View>
                {/* price and negotisble */}
                <View className="flex flex-row mt-7 ">
                  <View className="mt-4 h-10   w-[100px] bg-TealGreen rounded-sm justify-center items-center">
                    <Text className="text-white text-lg"> $10000</Text>
                  </View>

                  <View
                    className="mt-4 h-10 ms-5 w-[100px]  rounded-sm justify-center items-center"
                    style={{ backgroundColor: "#FFD700" }}
                  >
                    <Text className=" text-lg">Negitiable</Text>
                  </View>
                </View>
                {/* chat */}
                <View className="mt-10 h-10   w-[100px] bg-TealGreen rounded-sm justify-center items-center ">
                  <Text className="text-white text-lg"> chat </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className="flex justify-center items-center mb-2">
          <View className="bg-gray-200 h-full p-5 w-[80%]  rounded-sm">
            <View className="flex flex-row bg-red-200 rounded-sm">
              <View className="p-5">
                <Image
                  source={require("../../../assets/machine/niting.jpg")}
                  style={{ width: 300, height: 250, borderRadius: 3 }}
                />
              </View>

              <View className="flex-1 p-5 ">
                {/* Row 1: Name and Star Icon */}
                <View className="flex flex-row relative">
                  <Text className="font-semibold text-lg">Tamilarasan</Text>
                  <View className="absolute right-4">
                    <FontAwesome name="star" size={30} color="yellow" />
                  </View>
                </View>

                {/* Row 2: Machine Name and Share Icon */}
                <View className="flex flex-row relative mt-8">
                  <Text className="font-semibold text-lg">Machine Name</Text>
                  <View className="absolute right-4">
                    <FontAwesome name="share" size={30} color="gray" />
                  </View>
                </View>
                {/* price and negotisble */}
                <View className="flex flex-row mt-7 ">
                  <View className="mt-4 h-10   w-[100px] bg-TealGreen rounded-sm justify-center items-center">
                    <Text className="text-white text-lg"> $10000</Text>
                  </View>

                  <View
                    className="mt-4 h-10 ms-5 w-[100px]  rounded-sm justify-center items-center"
                    style={{ backgroundColor: "#FFD700" }}
                  >
                    <Text className=" text-lg">Negitiable</Text>
                  </View>
                </View>
                {/* chat */}
                <View className="mt-10 h-10   w-[100px] bg-TealGreen rounded-sm justify-center items-center ">
                  <Text className="text-white text-lg"> chat </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className="flex justify-center items-center mb-2">
          <View className="bg-gray-200 h-full p-5 w-[80%]  rounded-sm">
            <View className="flex flex-row bg-red-200 rounded-sm">
              <View className="p-5">
                <Image
                  source={require("../../../assets/machine/niting.jpg")}
                  style={{ width: 300, height: 250, borderRadius: 3 }}
                />
              </View>

              <View className="flex-1 p-5 ">
                {/* Row 1: Name and Star Icon */}
                <View className="flex flex-row relative">
                  <Text className="font-semibold text-lg">Tamilarasan</Text>
                  <View className="absolute right-4">
                    <FontAwesome name="star" size={30} color="yellow" />
                  </View>
                </View>

                {/* Row 2: Machine Name and Share Icon */}
                <View className="flex flex-row relative mt-8">
                  <Text className="font-semibold text-lg">Machine Name</Text>
                  <View className="absolute right-4">
                    <FontAwesome name="share" size={30} color="gray" />
                  </View>
                </View>
                {/* price and negotisble */}
                <View className="flex flex-row mt-7 ">
                  <View className="mt-4 h-10   w-[100px] bg-TealGreen rounded-sm justify-center items-center">
                    <Text className="text-white text-lg"> $10000</Text>
                  </View>

                  <View
                    className="mt-4 h-10 ms-5 w-[100px]  rounded-sm justify-center items-center"
                    style={{ backgroundColor: "#FFD700" }}
                  >
                    <Text className=" text-lg">Negitiable</Text>
                  </View>
                </View>
                {/* chat */}
                <View className="mt-10 h-10   w-[100px] bg-TealGreen rounded-sm justify-center items-center ">
                  <Text className="text-white text-lg"> chat </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default WishList;
