import {
  View,
  Text,
  Image,
  useWindowDimensions,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";


export default function Explore({ categoriesData }) {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isScreen = width < 600;
  // console.log(categoriesData)
  return (
    <View>
      <View className="flex flex-row items-center w-full px-2 mt-4">
        <Text className="text-xl font-bold text-TealGreen">
          Explore Category
        </Text>
        <View className="flex-1" />
        
         </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-2 justify-center items-center p-5">
          {/* First Image */}
          {Array.isArray(categoriesData) &&
          categoriesData.length > 0 &&
          Array.isArray(categoriesData[0]) &&
          categoriesData[0].length > 0
            ? categoriesData[0].map((category, index) => (
                <View
                  key={index}
                  className="bg-TealGreen h-[360px] w-[360px] rounded-md mb-4 p-4"
                >
                  {category.machineImages?.length > 0 && (
                    <Pressable
                      className="w-full h-[75%]  overflow-hidden"
                      onPress={() =>
                        navigation.navigate("CategoryList", {
                          industry: category.industry,
                        })
                      }
                    >
                      <Image
                        className="rounded-t-sm w-full h-full"
                        resizeMode="contain"
                        source={{
                          uri: `data:image/jpeg;base64,${category.machineImages[0]}`,
                        }}
                      />
                    </Pressable>
                  )}

                  <Text className="p-2 text-lg text-white font-bold">
                    {category.industry}
                  </Text>
                  {
                    <Text className="p-2 text-lg text-white">
                      ({category.count})
                    </Text>
                  }
                </View>
              ))
            : null}
        </View>
      </ScrollView>
    </View>
  );
}
