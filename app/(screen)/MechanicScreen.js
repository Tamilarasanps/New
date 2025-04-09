import { View, Text, Image, useWindowDimensions } from "react-native";
import React from "react";
import Header from "../(header)/Header";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function MechanicPage() {
  const { width } = useWindowDimensions;
  const screen = width > 500;
  return (
    <View>
      <View>
        <Header />
      </View>
      {/* */}
      <View className="p-5" style={{ zIndex: -1 }}>
        <Text className="font-semibold text-xl">
          Popular Mechanics Repair & Services{" "}
        </Text>
      </View>
      {/*  */}
      <View className="bg-red-200 p-4 h-full" style={{ zIndex: -1 }}>
        <View className="bg-gray-200 p-5 rounded-md md:flex-row flex-col  ">
          {/* Image Section */}
          <View className="md:item items-center">
            <Image
              // source={require("../../../assets/machine/main.png")}
              style={{ width: 200, height: 200, borderRadius: 100 }}
            />
          </View>

          {/* Details Section */}
          <View className="flex-1 ms-4 mt-5 md:mt-0 ">
            <Text className="text-lg font-bold">Company Name</Text>
            <Text className="text-lg font-semibold mt-2">Mechanic Name</Text>

            {/* works */}
            <View className=" mt-3 flex-row ">
              <Text className=" font-semibold p-1 text-center bg-yellow-500 w-[150px] rounded-sm">
                Services and Repairs:
              </Text>
              <Text className=" font-semibold p-1 text-center bg-yellow-500 ms-3 rounded-sm ">
                OverLock ,FactLock,Singer
              </Text>
            </View>

            {/* Location Section */}
            <View className="mt-3 flex-row items-center">
              <FontAwesome name="map-marker" size={25} color="black" />
              <Text className="ms-3 font-semibold">Tirupur, TamilNadu.</Text>
            </View>
            {/* Contact Section */}
            <View className="mt-3">
              <Text className="font-semibold">📞 9787581976</Text>
            </View>

            {/* Rating Section */}
            <View className="flex-row mt-3">
              <View className="bg-green-600 flex-row  rounded-lg justify-center items-center w-[80px]  p-1">
                <Text className="font-bold text-lg text-white">4.9</Text>
                <FontAwesome
                  name="star"
                  size={20}
                  color="white"
                  className="ms-2"
                />
              </View>
              <View>
                <Text className="mt-2 ms-3 font-semibold text-">
                  BasePrice:$200
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
