// import {
//   View,
//   Text,
//   Image,
//   Pressable,
//   ScrollView,
//   useWindowDimensions,
// } from "react-native";
// import React, { useState } from "react";
// import { Link } from "expo-router";

// export default function Recommeded({ recommendedProducts }) {
//   const [like, setUnlike] = useState(false);
//   const width = useWindowDimensions();
//   // const page = () => {
//   //   router.push("/(component)/(screen)/SelectProduct");
//   // };

//   return (
//     <View style={{ zIndex: -1 }}>
//       <View className="bg-gray-200 mt-5">
//         <View className="flex flex-row items-center w-full px-2 mt-4">
//           <Text className="text-xl font-bold text-TealGreen">
//             Recommended For You
//           </Text>
//           {/* <View className="flex-1" />
//           <Pressable onPress={() => alert("See All Clicked")}>
//             <Text className="font-semibold">See All</Text>
//           </Pressable> */}
//         </View>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//           <View className="flex flex-row p-4 gap-4 items-center">
//             {recommendedProducts && recommendedProducts.length > 0 ? (
//               recommendedProducts.map((product) => (
//                 <View
//                   className="rounded-md p-3 bg-white border-2 border-gray-300"
//                   key={product._id}
//                 >
//                   <Link
//                     href={`/(Screens)/(screen)/SelectProduct?id=${product._id}`}
//                     asChild
//                   >
//                   <Pressable>
//                     <View style={{ position: "relative" }}>
//                       <Image
//                         className="rounded-sm"
//                         source={{
//                           uri: `data:image/jpeg;base64,${product.machineImages[0]}`,
//                         }}
//                         style={{ width: 250, height: 200 }}
//                       />
//                       <View className="flex flex-row items-center justify-between mt-4 mb-2">
//                         <View className="p-2 w-[100px] bg-TealGreen rounded-sm justify-center items-center">
//                           <Text className="text-white text-lg font-bold">
//                             ₹ {product.price}
//                           </Text>
//                         </View>
//                         <Text className="text-TealGreen font-bold text-lg">
//                           {product.condition}
//                         </Text>
//                       </View>
//                     </View>
//                     <View>
//                       <Text className="text-TealGreen font-semibold mt-2 mb-1">
//                         {product.category}
//                       </Text>
//                       <Text className="text-gray-600 font-semibold mt-1">
//                         {product.description.length > 25 ? product.description.slice(0,25)+"...." : product.description }
//                       </Text>
//                     </View>
//                   </Pressable>
//                   </Link>
//                 </View>
//               ))
//             ) : (
//               <Text className="text-gray-600">
//                 No recommended products available
//               </Text>
//             )}
//           </View>
//         </ScrollView>
//       </View>
//     </View>
//   );
// }

import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  useWindowDimensions,
  Platform,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

export default function Recommeded({ recommendedProducts }) {
  const width = useWindowDimensions();

  const navigation = useNavigation();

  // const handleProductPress = (product) => {
  //   if (Platform.OS === "web") {
  //     router.push({
  //       pathname: "/(Screens)/(screen)/SelectProduct",
  //       params: { id: product._id },
  //     });
  //   } else {
  //     navigation.navigate("SelectedProduct", { id: product._id });
  //   }
  // };
  const handleProductPress = (product) => {
    const productId = product._id; // Ensure you're using the correct key

    console.log('Navigating to SelectedProduct with id:', productId); // Check if id is correct

    if (Platform.OS === "web") {
      router.push({
        pathname: "/(screen)/SelectProduct",
        params: { id: productId },
      });
    } else {
      navigation.navigate("SelectedProduct", { id: productId });
    }
  };

  return (
    <View style={{ zIndex: -1 }}>
      <View className="bg-gray-200 mt-5">
        <View className="flex flex-row items-center w-full px-2 mt-4">
          <Text className="text-xl font-bold text-TealGreen">
            Recommended For You
          </Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex flex-row p-4 gap-4 items-center">
            {recommendedProducts && recommendedProducts.length > 0 ? (
              recommendedProducts.map((product) => (
                <View
                  className="rounded-md p-3 bg-white border-2 border-gray-300"
                  key={product._id}
                >
                  <Pressable onPress={() => handleProductPress(product)}>
                    <View style={{ position: "relative" }}>
                      <Image
                        className="rounded-sm"
                        source={
                          product.machineImages?.[0]
                            ? {
                                uri: `data:image/jpeg;base64,${product.machineImages[0]}`,
                              }
                            : ""
                        }
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
                        {product.description.length > 25
                          ? product.description.slice(0, 25) + "...."
                          : product.description}
                      </Text>
                    </View>
                  </Pressable>
                </View>
              ))
            ) : (
              <Text className="text-gray-600">
                No recommended products available
              </Text>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
