// import {
//   View,
//   Text,
//   Pressable,
//   Image,
//   useWindowDimensions,
//   TextInput,
//   ScrollView,
//   Platform,
//   SafeAreaView,
// } from "react-native";
// import React, { useEffect, useMemo, useState } from "react";
// import All from "../(frontPage)/All";
// import GuidePage from "../(frontPage)/GuidePage";
// import Footer from "../(frontPage)/Footer";
// import { Divider } from "react-native-paper";
// import RadioGroup from "react-native-radio-buttons-group";
// import Icon from "react-native-vector-icons/Ionicons";
// import { useLocalSearchParams } from "expo-router";
// import useApi from "@/app/hooks/useApi";
// import { Link } from "expo-router";
// import Header from "@/app/(header)/Header";
// import { useRoute } from "@react-navigation/native";
// import { useRouter } from "expo-router";

// export default function ProductList({ navigation }) {
//   // const productPage = () => {
//   //   router.push("/(component)/(screen)/SelectProduct");

//   // };

//   const router = useRouter();
//   const route = useRouter();
//   const radioButton = useMemo(() => [
//     {
//       id: 1,
//       label: "Price",
//     },
//     {
//       id: 2,
//       label: "Negotiable",
//     },
//   ]);
//   let searchTerms;

//   if (Platform.OS === "web") {
//     searchTerms = useLocalSearchParams().searchTerms;
//   } else {
//     searchTerms = route?.params?.searchTerms;
//   }
//   console.log(searchTerms, "searchTerms");
//   const { getJsonApi } = useApi();

//   const [products, setProducts] = useState([]);
//   const [selectedId, setSelectedId] = useState();
//   const [isOpen, setIsOpen] = useState(false);
//   const { width } = useWindowDimensions();
//   const screen = width > 1024;
//   useEffect(() => {
//     if (searchTerms) {
//       fetchProducts();
//     }
//   }, [searchTerms]);

//   const fetchProducts = async () => {
//     try {
//       let data;
//       if (searchTerms) {
//         data = await getJsonApi(`productPage/${searchTerms}`);
//       } else {
//         data = await getJsonApi(`productPage/${priceType}`);
//       }
//       console.log(data);
//       setProducts(data.data.products);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   console.log(products, "product");

//   // const handleProductPress = (productSelect) => {
//   //   if (Platform.OS === "web") {
//   //     router.push(`/(screen)/SelectProduct?id=${productSelect._id}`);
//   //   }
//   // };

//   return (
//     <ScrollView>
//       <SafeAreaView>
//         <View>
//           <Header />
//           <All />
//           <View
//             className="flex flex-row px-3 rounded-sm mt-5  "
//             style={{ zIndex: -1 }}
//           >
//             {/* Left Side (Fixed) */}
//             <View
//               className={`bg-red-500 rounded-sm p-3 transition-all duration-300 absolute  ${
//                 isOpen || screen ? "flex" : "hidden"
//               }`}
//               style={{
//                 width: screen ? "20%" : "300px",
//                 height: screen,
//                 position: screen ? "relative" : "absolute",
//                 top: 0,
//                 zIndex: -1,
//               }}
//             >
//               <View className="bg-white rounded-sm">
//                 {isOpen && (
//                   <Pressable onPress={() => setIsOpen(false)} className="mb-4">
//                     <Icon name="close" size={30} color="black" />
//                   </Pressable>
//                 )}
//                 <Text className="text-lg font-semibold p-3 text-red-600">
//                   Price
//                 </Text>
//                 <Divider />
//                 <Text className="p-3 text-lg font-semibold">From</Text>
//                 <View className="flex flex-row gap-4 justify-center items-center">
//                   <TextInput
//                     className="border-2 border-gray-300 w-[36%] h-10 rounded-sm px-3"
//                     placeholder="From"
//                     keyboardType="numeric"
//                     maxLength={7}
//                   />
//                   <TextInput
//                     className="border-2 border-gray-300 w-[36%] h-10 rounded-sm px-3"
//                     placeholder="To"
//                     keyboardType="numeric"
//                     maxLength={7}
//                   />
//                 </View>
//                 <Pressable
//                   className="mt-4 flex justify-end items-center bg-red-500 w-[70px] rounded-sm p-2  mb-4"
//                   style={{ height: 30 }}
//                 >
//                   <Text className="text-center text-white font-semibold text-sm">
//                     Apply
//                   </Text>
//                 </Pressable>
//                 <Divider />
//                 <Text className="text-lg font-semibold mt-2 px-3">
//                   Location
//                 </Text>
//                 <TextInput
//                   className="border-2 border-gray-300 w-[80%] ms-5 h-10 rounded-sm p-3 mt-3"
//                   placeholder="Location"
//                 />
//                 <Pressable
//                   className="mt-4 flex justify-end items-center bg-red-500 w-[70px] rounded-sm p-2  mb-4"
//                   style={{ height: 30 }}
//                 >
//                   <Text className="text-center text-white font-semibold text-sm">
//                     Apply
//                   </Text>
//                 </Pressable>
//                 <Divider />

//                 <Text className="font-semibold text-lg p-3">Price Type</Text>
//                 <View className={`flex flex-row`}>
//                   <RadioGroup
//                     radioButtons={radioButton}
//                     onPress={setSelectedId}
//                     selectedId={selectedId}
//                     layout="row"
//                   />
//                 </View>
//                 <Pressable
//                   className="mt-4 flex justify-end items-center bg-red-500 w-[70px] rounded-sm p-2  mb-4"
//                   style={{ height: 30 }}
//                 >
//                   <Text className="text-center text-white font-semibold text-sm">
//                     Apply
//                   </Text>
//                 </Pressable>
//                 <Divider />

//                 <Text className="font-semibold text-lg p-3">Brand</Text>
//                 <TextInput
//                   className="border-2 border-gray-300 w-[80%] ms-5 h-10 rounded-sm p-3 mt-3 mb-3"
//                   placeholder="Brand"
//                 />
//                 <Pressable
//                   className="mt-4 flex justify-end items-center bg-red-500 w-[70px] rounded-sm p-2 mb-4"
//                   style={{ height: 30 }}
//                 >
//                   <Text className="text-center text-white font-semibold text-sm">
//                     Apply
//                   </Text>
//                 </Pressable>
//               </View>
//             </View>

//             <ScrollView
//               className={`${
//                 isOpen ? "w-[80%]" : "w-full"
//               }  mb-4 transition-all `}
//             >
//               {!screen && !isOpen && (
//                 <Pressable
//                   onPress={() => setIsOpen(!isOpen)}
//                   className="flex flex-row  "
//                 >
//                   <Icon name="filter" size={30} color="black" />
//                   <Text className="mt-2 ms-2">Fliter</Text>
//                 </Pressable>
//               )}

//               <View
//                 className="grid gap-4 mt-2 px-4"
//                 style={{
//                   gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", // Increased min size for better readability
//                 }}
//               >
//                 {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map(
//                   (n) =>
//                     products.length > 0 &&
//                     products.map((product, index) => (
//                       <Pressable
//                         key={index}
//                         className="mb-4"
//                         style={{
//                           width: Platform.OS !== "web" ? "90%" : "100%",
//                           maxWidth: 400,
//                           margin: "auto",
//                         }}
//                       >
//                         <View className="rounded-2xl p-3 bg-white border border-gray-300 shadow-sm">
//                           {/* <Link
//                             href={`(screen)/SelectProduct?id=${product._id}`}
//                             asChild
//                           > */}
//                           <Pressable
//                           //  onPress={handleProductPress(product)}
//                            >
//                             <View style={{ position: "relative" }}>
//                               <Image
//                                 className="rounded-md"
//                                 source={{
//                                   uri: `data:image/jpeg;base64,${product.machineImages[0]}`,
//                                 }}
//                                 style={{
//                                   width: "100%",
//                                   height: 200,
//                                   objectFit: "cover",
//                                 }}
//                               />
//                               <View className="flex flex-row items-center justify-between mt-4 mb-2">
//                                 <View className="p-2 w-[100px] bg-TealGreen rounded-md justify-center items-center">
//                                   <Text className="text-white text-base font-bold">
//                                     ₹ {product.price}
//                                   </Text>
//                                 </View>
//                                 <Text className="text-TealGreen font-bold text-base">
//                                   {product.condition}
//                                 </Text>
//                               </View>
//                             </View>
//                             <View>
//                               <Text className="text-TealGreen font-semibold mt-2 mb-1 truncate">
//                                 {product.category}
//                               </Text>
//                               <Text
//                                 className="text-gray-600 font-semibold mt-1 overflow-hidden"
//                                 numberOfLines={2}
//                               >
//                                 {product.description}
//                               </Text>
//                             </View>
//                           </Pressable>
//                           {/* </Link> */}
//                         </View>
//                       </Pressable>
//                     ))
//                 )}
//               </View>

//               <View className="flex items-end justify-center w-full my-4">
//                 <Pressable
//                   className="bg-blue-600 rounded-sm w-[100px] flex items-center justify-center"
//                   style={{ height: 30 }}
//                 >
//                   <Text className="text-white font-semibold text-sm">
//                     Next Page
//                   </Text>
//                 </Pressable>
//               </View>
//             </ScrollView>
//           </View>
//           {Platform.OS === "web" && <GuidePage />}
//           {Platform.OS === "web" && <Footer />}
//         </View>
//         {/* );
//       })} */}
//       </SafeAreaView>
//     </ScrollView>
//   );
// }

import {
  View,
  Text,
  Pressable,
  Image,
  useWindowDimensions,
  TextInput,
  ScrollView,
  Platform,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import All from "../(frontPage)/All";
import GuidePage from "../(frontPage)/GuidePage";
import Footer from "../(frontPage)/Footer";
import { Divider } from "react-native-paper";
import RadioGroup from "react-native-radio-buttons-group";
import Icon from "react-native-vector-icons/Ionicons";
import { useLocalSearchParams } from "expo-router";
import useApi from "@/app/hooks/useApi";
import Header from "@/app/(header)/Header";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";

export default function ProductList({ navigation }) {
  const router = useRouter();
  const route = useRoute();

  const { getJsonApi } = useApi();
  const { width } = useWindowDimensions();
  const screen = width > 1024;

  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState("1");
  const [isOpen, setIsOpen] = useState(false);

  // Filter states
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [location, setLocation] = useState("");
  const [brand, setBrand] = useState("");

  let searchTerms;
  if (Platform.OS === "web") {
    searchTerms = useLocalSearchParams().searchTerms;
  } else {
    searchTerms = route?.params?.searchTerms;
  }

  useEffect(() => {
    fetchProducts();
  }, [searchTerms, selectedId]);

  const fetchProducts = async () => {
    try {
      const priceType = selectedId === "1" ? "price" : "negotiable";
      let query = searchTerms || priceType;
      const data = await getJsonApi(`productPage/${query}`);
      setProducts(data.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  let industry;
  
  if (Platform.OS === "web") {
    industry = useLocalSearchParams().industry;
  } else {
    industry = route?.params?.industry;
  }
  const handleProductPress = (product) => {
    // const productId = product._id;
    if (Platform.OS === "web") {
      router.push(`/(screen)/SelectProduct?id=${product}`);
    } else {
      navigation.navigate("SelectProduct", { id: product });
    }
  };

  const radioButton = useMemo(
    () => [
      { id: "1", label: "Price" },
      { id: "2", label: "Negotiable" },
    ],
    []
  );

  return (
    <ScrollView>
      <SafeAreaView>
        <View>
          <Header />
          <All />

          <View
            className="flex flex-row px-3 rounded-sm mt-5"
            style={{ zIndex: -1 }}
          >
            {/* Sidebar Filter */}
            <View
              className={`bg-red-500 rounded-sm p-3 transition-all duration-300 absolute ${
                isOpen || screen ? "flex" : "hidden"
              }`}
              style={{
                width: screen ? "20%" : "300px",
                position: screen ? "relative" : "absolute",
                top: 0,
                zIndex: -1,
              }}
            >
              <View className="bg-white rounded-sm">
                {isOpen && (
                  <Pressable onPress={() => setIsOpen(false)} className="mb-4">
                    <Icon name="close" size={30} color="black" />
                  </Pressable>
                )}

                {/* Price Filter */}
                <Text className="text-lg font-semibold p-3 text-red-600">
                  Price
                </Text>
                <Divider />
                <Text className="p-3 text-lg font-semibold">From</Text>
                <View className="flex flex-row gap-4 justify-center items-center">
                  <TextInput
                    value={from}
                    onChangeText={setFrom}
                    className="border-2 border-gray-300 w-[36%] h-10 rounded-sm px-3"
                    placeholder="From"
                    keyboardType="numeric"
                  />
                  <TextInput
                    value={to}
                    onChangeText={setTo}
                    className="border-2 border-gray-300 w-[36%] h-10 rounded-sm px-3"
                    placeholder="To"
                    keyboardType="numeric"
                  />
                </View>

                {/* Apply Button for Price */}
                <Pressable
                  onPress={fetchProducts}
                  className="mt-4 flex justify-end items-center bg-red-500 w-[70px] rounded-sm p-2 mb-4"
                  style={{ height: 30 }}
                >
                  <Text className="text-center text-white font-semibold text-sm">
                    Apply
                  </Text>
                </Pressable>

                <Divider />

                {/* Location Filter */}
                <Text className="text-lg font-semibold mt-2 px-3">
                  Location
                </Text>
                <TextInput
                  value={location}
                  onChangeText={setLocation}
                  className="border-2 border-gray-300 w-[80%] ms-5 h-10 rounded-sm p-3 mt-3"
                  placeholder="Location"
                />
                <Pressable
                  onPress={fetchProducts}
                  className="mt-4 flex justify-end items-center bg-red-500 w-[70px] rounded-sm p-2 mb-4"
                  style={{ height: 30 }}
                >
                  <Text className="text-center text-white font-semibold text-sm">
                    Apply
                  </Text>
                </Pressable>

                <Divider />

                {/* Price Type */}
                <Text className="font-semibold text-lg p-3">Price Type</Text>
                <RadioGroup
                  radioButtons={radioButton}
                  onPress={setSelectedId}
                  selectedId={selectedId}
                  layout="row"
                />
                <Divider />

                {/* Brand Filter */}
                <Text className="font-semibold text-lg p-3">Brand</Text>
                <TextInput
                  value={brand}
                  onChangeText={setBrand}
                  className="border-2 border-gray-300 w-[80%] ms-5 h-10 rounded-sm p-3 mt-3 mb-3"
                  placeholder="Brand"
                />
                <Pressable
                  onPress={fetchProducts}
                  className="mt-4 flex justify-end items-center bg-red-500 w-[70px] rounded-sm p-2 mb-4"
                  style={{ height: 30 }}
                >
                  <Text className="text-center text-white font-semibold text-sm">
                    Apply
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Main Product List */}
            <ScrollView
              className={`${isOpen ? "w-[80%]" : "w-full"} mb-4 transition-all`}
            >
              {!screen && !isOpen && (
                <Pressable
                  onPress={() => setIsOpen(true)}
                  className="flex flex-row"
                >
                  <Icon name="filter" size={30} color="black" />
                  <Text className="mt-2 ms-2">Filter</Text>
                </Pressable>
              )}

              <View
                className="grid gap-4 mt-2 px-4"
                style={{
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                }}
              >
                {products.length > 0 &&
                  products.map((product) => (
                    <Pressable
                      // key={product._id}
                      onPress={() => handleProductPress(product._id)}
                      className="mb-4"
                      style={{
                        width: Platform.OS !== "web" ? "90%" : "100%",
                        maxWidth: 400,
                        margin: "auto",
                      }}
                    >
                      <View className="rounded-2xl p-3 bg-white border border-gray-300 shadow-sm">
                        <View style={{ position: "relative" }}>
                          <Image
                            className="rounded-md"
                            source={{
                              uri: `data:image/jpeg;base64,${product.machineImages[0]}`,
                            }}
                            style={{
                              width: "100%",
                              height: 200,
                              objectFit: "cover",
                            }}
                          />
                          <View className="flex flex-row items-center justify-between mt-4 mb-2">
                            <View className="p-2 w-[100px] bg-TealGreen rounded-md justify-center items-center">
                              <Text className="text-white text-base font-bold">
                                ₹ {product.price}
                              </Text>
                            </View>
                            <Text className="text-TealGreen font-bold text-base">
                              {product.condition}
                            </Text>
                          </View>
                        </View>
                        <View>
                          <Text className="text-TealGreen font-semibold mt-2 mb-1 truncate">
                            {product.category}
                          </Text>
                          <Text
                            className="text-gray-600 font-semibold mt-1 overflow-hidden"
                            numberOfLines={2}
                          >
                            {product.description}
                          </Text>
                        </View>
                      </View>
                    </Pressable>
                  ))}
              </View>

              {/* Pagination (optional) */}
              <View className="flex items-end justify-center w-full my-4">
                <Pressable
                  className="bg-blue-600 rounded-sm w-[100px] flex items-center justify-center"
                  style={{ height: 30 }}
                >
                  <Text className="text-white font-semibold text-sm">
                    Next Page
                  </Text>
                </Pressable>
              </View>
            </ScrollView>
          </View>

          {/* Web only footer sections */}
          {Platform.OS === "web" && <GuidePage />}
          {Platform.OS === "web" && <Footer />}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
