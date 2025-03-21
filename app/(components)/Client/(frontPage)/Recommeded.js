import { 
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";

export default function Recommeded({ recommendedProducts }) {
  const [like, setUnlike] = useState(false);
  const width = useWindowDimensions();
console.log("op :" + recommendedProducts)
  const page = () => {
    router.push("/(component)/(screen)/SelectProduct");
  };

  return (
    <View style={{ zIndex: -1 }}>
      <View className="bg-gray-200 mt-5">
        <View className="flex flex-row items-center w-full px-2 mt-4">
          <Text className="text-xl font-bold text-TealGreen">
            Recommended For You
          </Text>
          <View className="flex-1" />
          <Pressable onPress={() => alert("See All Clicked")}>  
            <Text className="font-semibold">See All</Text>
          </Pressable>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
  <View className="flex flex-row p-4 gap-4 items-center">
    {(recommendedProducts && recommendedProducts.length > 0) ? (
      recommendedProducts.map((product) => (
        <View
          className="rounded-md p-3 bg-white border-2 border-gray-300"
          key={product._id}
        >
          <Link href={"/(components)/Client/(screen)/SelectProduct"} asChild></Link>
          <Pressable>
            <View style={{ position: "relative" }}>
              <Image
                className="rounded-sm"
                source={{
                  uri: `data:image/jpeg;base64,${product.machineImages[0]}`,
                }}
                style={{ width: 250, height: 200 }}
              />
              <View className="flex flex-row items-center justify-between mt-4 mb-2">
                <View className="p-2 w-[100px] bg-TealGreen rounded-sm justify-center items-center">
                  <Text className="text-white text-lg font-bold">
                    ₹ {product.price}
                  </Text>
                </View>
                <Text className="text-TealGreen font-bold text-lg">
                  {product.condition}
                </Text>
              </View>
            </View>
            <View>
              <Text className="text-TealGreen font-semibold mt-2 mb-1">
                {product.category}
              </Text>
              <Text className="text-gray-600 font-semibold mt-1">
                {product.description}
              </Text>
            </View>
          </Pressable>
        </View>
      ))
    ) : (
      <Text className="text-gray-600">No recommended products available</Text>
    )}
  </View>
</ScrollView>

      </View>
    </View>
  );
}
