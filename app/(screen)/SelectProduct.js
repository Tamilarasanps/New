import {
  View,
  Text,
  Platform,
  Image,
  ScrollView,
  useWindowDimensions,
  Pressable,
  SafeAreaView,
} from "react-native";
import React, { useEffect } from "react";
import All from "../(frontPage)/All";
import ProductDetails from "./ProductDetails";
import Footer from "../(frontPage)/Footer";
import Recommeded from "../(frontPage)/Recommeded";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useLocalSearchParams } from "expo-router";
import useApi from "@/app/hooks/useApi";
import { useState } from "react";
import useConversation from "@/app/stateManagement/useConversation";
import { useRouter } from "expo-router";
import * as Sharing from "expo-sharing";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useWishlist from "@/app/hooks/useWishlist";
import Header from "@/app/(header)/Header";

export default function SelectProduct() {
  const { width } = useWindowDimensions();
  const isScreen = width > 786;

  const { selectedConversation, setSelectedConversation } = useConversation();
  const { wishlist, addToWishlist } = useWishlist();

  const router = useRouter();

  const { id } = useLocalSearchParams() || {};
  const { getJsonApi, pathchApi } = useApi();

  const [product, setProduct] = useState({});
  let searchTerms;

  useEffect(() => {
    fetchProduct();
  }, []);

  // const fetchProduct = async () => {
  //   try {
  //     const data = await getJsonApi(`productDetails/${id}`);
  //     setProduct(data.data[0]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const fetchProduct = async () => {
    try {
      const data = await getJsonApi(`productDetails/${id}`);
      const productData = data?.data?.[0];
      console.log(productData);
      setProduct(productData);

      // 💡 Fetch recommended products by category (but not the current product)
      if (productData?.category) {
        const recommended = await getJsonApi(
          `products?category=${productData.category}`
        );
        const filtered = recommended?.data?.filter(
          (p) => p._id !== productData._id
        );
        setRecommendedProducts(filtered || []);
      }
    } catch (error) {
      console.error("Error fetching product or recommended:", error);
    }
  };

  const share = async () => {
    const productShare = product;
    if (!productShare) {
      console.log("Product Not Found");
      return;
    }
    const isSharingAvailable = await Sharing.isAvailableAsync();
    if (!isSharingAvailable) {
      console.log("Sharing is not available on this device");
      return;
    }
    try {
      await Sharing.shareAsync(productShare.url || "no url available", {
        DialogTitle: `Check out this product: ${productShare.industry}`,
      });
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <View>
          <Header />
          <All />

          {/* Responsive Layout */}
          {Object.keys(product).length > 0 ? (
            <>
              <View>
                {/* Star Icon */}
                <View className="flex flex-row mt-5 z-50 relative">
                  <Pressable
                    className="absolute top-2 right-10 "
                    onPress={() => addToWishlist(product)}
                  >
                    <FontAwesome
                      name="star"
                      size={30}
                      color={wishlist?.includes(product._id) ? "red" : "white"}
                    />
                  </Pressable>
                </View>

                {/* Name and Share Icon */}
                <View className="flex flex-row mt-3 ">
                 
                  <Text
                    className={`text-xl mt-3 ms-6 mb-3 `}
                    style={{ marginLeft: (Platform.OS === "web" && width>=1024) ?  "45%" : "" }}
                  >
                    Tamilarasan
                  </Text>
                  <View className="absolute right-10 mt-12  pt-3">
                    <Pressable onPress={share}>
                      <FontAwesome name="share" size={30} color="gray" />
                    </Pressable>
                  </View>
                </View>

                {/* Machine Name */}
                <Text
                  className="text-2xl font-bold  ms-6 pt-3"
                  style={[
                    { marginLeft: (Platform.OS === "web" && width >= 1024) ? "45%" : "" },
                    { zIndex: -1 }
                  ]}
                  
                 
                >
                  Machine Name
                </Text>
              </View>
              <View
                style={{
                  flexDirection: isScreen ? "row" : "column",
                  marginTop: 20,
                  justifyContent: "center",
                  alignItems: isScreen ? "flex-start" : "center",
                  zIndex: -1,
                }}
              >
                {/* Sticky Image Section */}
                <View
                  className="bg-gray-100"
                  style={{
                    width: isScreen ? "35%" : "90%",
                    marginLeft: isScreen ? 100 : 0,
                    position: isScreen ? "sticky" : "relative",
                    top: 0,
                    height: isScreen ? "70vh" : "auto",
                    zIndex: 10,
                    borderRadius: 10,
                    alignItems: "center",
                  }}
                >
                  <Image
                    className="rounded-sm"
                    source={
                      {
                        uri: `data:image/jpeg;base64,${product.machineImages[0]}`,
                      }
                      // Provide a local placeholder image if needed
                    }
                    style={{
                      width: "100%",
                      height: Platform.OS === "web" ? "400px" : 300,
                    }}
                  />
                  <View className=" absolute top-2 left-2 p-2 w-[100px] bg-yellow-500 rounded-sm justify-center items-center">
                    <Text className=" text-base font-bold">
                      {product.priceType || "Negotiable"}
                    </Text>
                  </View>
                  {/* <Pressable
                  className="absolute top-2 right-2"
                  onPress={() => whislist(product)}
                >
                  <FontAwesome name="star" size={30} color="white" />
                </Pressable> */}

                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View className=" mt-4 flex flex-row gap-2  z-1">
                      {product.machineImages.map((image, index) => (
                        <View key={index}>
                          <Image
                            className="rounded-sm"
                            source={
                              {
                                uri: `data:image/jpeg;base64,${image}`,
                              } // Provide a local placeholder image if needed
                            }
                            style={{ width: 80, height: 80 }}
                          />
                        </View>
                      ))}
                    </View>
                  </ScrollView>
                </View>

                {/* Product Details Section */}
                <View
                  className=""
                  style={{
                    flex: 1,
                    // marginLeft: isScreen ? 0 : 0,
                    paddingBottom: 20,
                    width: isScreen ? 500 : "100%",
                    marginTop: Platform.OS === "web" ? "-40px" : -20,
                  }}
                >
                  <View className="mt-5 bg-gray-100 rounded-sm p-5">
                    <View className="bg-gray-100">
                      <View className="flex flex-row">
                        <View className="mt-12 h-12 ms-5 mr-auto w-[150px] bg-TealGreen rounded-sm justify-center items-center">
                          <Pressable
                            onPress={() => {
                              setSelectedConversation(product.userId);
                              router.push("/(Screens)/(chat)/Chat");
                            }}
                          >
                            <Text className="text-white text-lg">Chat</Text>
                          </Pressable>
                        </View>
                        {Platform.OS !== "web" ? (
                          <View className="mt-2 h-12 ms-5 w-[150px] bg-TealGreen rounded-sm justify-center items-center absolute right-6">
                            <Text className="text-white text-lg">Call</Text>
                          </View>
                        ) : null}
                      </View>

                      <View className="flex flex-row mt-8 ">
                        <View className="mt-2 h-10 ms-5 w-[100px] bg-TealGreen rounded-sm justify-center items-center">
                          <Text className="text-white text-lg">
                            $ {product.price}
                          </Text>
                        </View>

                        {/* <View
                        className="mt-4 h-10 ms-5 w-[100px]  rounded-sm justify-center items-center"
                        style={{ backgroundColor: "#FFD700" }}
                      >
                        <Text className=" text-lg">
                          {product.negotiable ? "Negotiable" : "Fixed"}
                        </Text>
                      </View> */}
                        <View className=" absolute right-10 mt-4  p-2 w-[100px] bg-yellow-500 rounded-sm justify-center items-center">
                          <Text className=" text-base font-bold">
                            {product.priceType || "Negotiable"}
                          </Text>
                        </View>
                      </View>

                      <ProductDetails product={product} />
                    </View>
                  </View>
                </View>
              </View>
            </>
          ) : (
            ""
          )}

          <Recommeded />
          {Platform.OS === "web" && <Footer />}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
