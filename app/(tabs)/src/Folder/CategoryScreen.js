import { View, Text, Pressable, SafeAreaView } from "react-native";
import React from "react";
import Header from "@/app/(Screens)/(header)/Header";
export default function CategoryScreen({ navigation }) {
  return (
    <SafeAreaView>
      <View>
        <Header />
        <View className="items-center mt-5">
          <Text className="text-lg font-bold">All Category List</Text>
        </View>
        <View className="flex items-center">
          <Pressable
            className="mt-3 bg-red-600 w-[90%] h-[40] rounded-md flex items-center justify-center"
            onPress={() => navigation.navigate("IndustrieScreen")}
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

// <SafeAreaView>
//   <View>
//     <Header />
//     <Text className="items-center">IndustrieScreen</Text>
//     <View className="mt-10">
//       <Pressable
//         className="bg-red-800 p-3 items-center"
//         onPress={() => navigation.navigate("CategoryScreen")}
//       >
//         <Text className="text-white">Go to Inner Screen 2</Text>
//       </Pressable>
//     </View>
//   </View>
// </SafeAreaView>
