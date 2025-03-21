import {
  View,
  Text,
  Platform,
  Image,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import React, { useEffect } from "react";
import Header from "../(header)/Header";
import All from "../(frontPage)/All";
import ProductDetails from "./ProductDetails";
import Footer from "../(frontPage)/Footer";
import Recommeded from "../(frontPage)/Recommeded";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useLocalSearchParams } from "expo-router";
import useApi from "@/app/hooks/useApi";
import { useState } from "react";

export default function SelectProduct() {
  const { width } = useWindowDimensions();
  const isScreen = width > 786;

  const { id } = useLocalSearchParams() || {};
  const { getJsonApi } = useApi();

  const [product, setProduct] = useState({});
  let searchTerms;

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const data = await getJsonApi(`productDetails/${id}`);
      console.log(data);
      setProduct(data[0]);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(product[0] + "jhbnibib");
  return (
    <ScrollView>
      <View>
        <Header />
        <All />

        {/* Responsive Layout */}
        {Object.keys(product).length > 0 ? (
          <>
            <View>
              {/* Star Icon */}
              <View className="flex flex-row mt-5">
                <View className="mt-2 absolute right-10">
                  <FontAwesome name="star" size={30} color="#FFD700" />
                </View>
              </View>

              {/* Name and Share Icon */}
              <View className="flex flex-row mt-3">
                <Text
                  className="text-xl mt-3 ms-6"
                  style={{ marginLeft: Platform.OS === "web" ? "45%" : "" }}
                >
                  Tamilarasan
                </Text>
                <View className="absolute right-10 mt-12 pt-3">
                  <FontAwesome name="share" size={30} color="gray" />
                </View>
              </View>

              {/* Machine Name */}
              <Text
                className="text-2xl font-bold mt-2 ms-6 pt-3"
                style={{
                  marginLeft: Platform.OS === "web" ? "45%" : "",
                  zIndex: -1,
                }}
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
                style={{
                  width: isScreen ? "35%" : "90%",
                  marginLeft: isScreen ? 100 : 0,
                  position: isScreen ? "sticky" : "relative",
                  top: 0,
                  height: isScreen ? "70vh" : "auto",
                  zIndex: 10,
                  backgroundColor: "white",
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
                <View className="mt-5 bg-white rounded-sm p-5">
                  <View className="bg-gray-100">
                    <View className="flex flex-row">
                      <View className="mt-4 h-12 ms-5 w-[150px] bg-TealGreen rounded-sm justify-center items-center">
                        <Text className="text-white text-lg">Chat</Text>
                      </View>
                      {Platform.OS !== "web" ? (
                        <View className="mt-4 h-12 ms-5 w-[150px] bg-TealGreen rounded-sm justify-center items-center absolute right-6">
                          <Text className="text-white text-lg">Call</Text>
                        </View>
                      ) : null}
                    </View>

                    <View className="flex flex-row mt-8 ">
                      <View className="mt-4 h-10 ms-5 w-[100px] bg-TealGreen rounded-sm justify-center items-center">
                        <Text className="text-white text-lg"> ${" "}{product.price}</Text>
                      </View>

                      <View
                        className="mt-4 h-10 ms-5 w-[100px]  rounded-sm justify-center items-center"
                        style={{ backgroundColor: "#FFD700" }}
                      >
                        <Text className=" text-lg">
                          {product.negotiable ? "Negotiable" : "Fixed"}
                        </Text>
                      </View>
                    </View>

                    <ProductDetails product = {product}/>
                  </View>
                </View>
              </View>
            </View>
          </>
        ) : (
          ""
        )}

        {/* Footer Only on Web */}
        <Recommeded />
        {Platform.OS === "web" && <Footer />}
      </View>
    </ScrollView>
  );
}
