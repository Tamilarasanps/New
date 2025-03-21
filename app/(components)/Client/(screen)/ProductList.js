import {
  View,
  Text,
  Pressable,
  Image,
  useWindowDimensions,
  TextInput,
  ScrollView,
  Platform,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import Header from "../(header)/Header";
import All from "../(frontPage)/All";
import GuidePage from "../(frontPage)/GuidePage";
import Footer from "../(frontPage)/Footer";
import { Divider } from "react-native-paper";
import RadioGroup from "react-native-radio-buttons-group";
import Icon from "react-native-vector-icons/Ionicons";
import { useLocalSearchParams } from "expo-router";
import useApi from "@/app/hooks/useApi";
import { Link } from "expo-router";

export default function ProductList() {
  // const productPage = () => {
  //   router.push("/(component)/(screen)/SelectProduct");
  // };
  const radioButton = useMemo(() => [
    {
      id: 1,
      label: "Price",
    },
    {
      id: 2,
      label: "Negotiable",
    },
  ]);
  const { searchTerms,priceType } = useLocalSearchParams() ?? {};

  const { getJsonApi } = useApi();

  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useWindowDimensions();
  const screen = width > 1024;
  useEffect(() => {
    if (searchTerms) {
      fetchProducts();
    }
  }, [searchTerms]);

  const fetchProducts = async () => {
    try {
      let data;
      if(searchTerms){
         data = await getJsonApi(`productPage/${searchTerms}`);
      }
      else{
       data = await getJsonApi(`productPage/${priceType}`);
      }
      console.log(data);
      setProducts(data.products);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(products);

  return (
    <ScrollView>
      <View>
        {/* <View className="items-center mt-5 ">
          <Text className="text-2xl font-bold ">Machine Street</Text>
        </View> */}
        <Header />
        <All />
        <View
          className="flex flex-row px-3 rounded-sm mt-5  "
          style={{ zIndex: -1 }}
        >
          {/* Left Side (Fixed) */}
          <View
            className={`bg-red-500 rounded-sm p-3 transition-all duration-300 absolute z-10 ${
              isOpen || screen ? "flex" : "hidden"
            }`}
            style={{
              width: screen ? "20%" : "300px",
              height: "auto",
              position: screen ? "relative" : "absolute",
              top: 0,
            }}
          >
            <View className="bg-white rounded-sm">
              {isOpen && (
                <Pressable onPress={() => setIsOpen(false)} className="mb-4">
                  <Icon name="close" size={30} color="black" />
                </Pressable>
              )}
              <Text className="text-lg font-semibold p-3 text-red-600">
                Price
              </Text>
              <Divider />
              <Text className="p-3 text-lg font-semibold">From</Text>
              <View className="flex flex-row gap-4 justify-center items-center">
                <TextInput
                  className="border-2 border-gray-300 w-[36%] h-10 rounded-sm px-3"
                  placeholder="From"
                  keyboardType="numeric"
                  maxLength={7}
                />
                <TextInput
                  className="border-2 border-gray-300 w-[36%] h-10 rounded-sm px-3"
                  placeholder="To"
                  keyboardType="numeric"
                  maxLength={7}
                />
              </View>
              <Pressable
                className="mt-4 flex justify-end items-center bg-red-500 w-[70px] rounded-sm p-2  mb-4"
                style={{ height: 30 }}
              >
                <Text className="text-center text-white font-semibold text-sm">
                  Apply
                </Text>
              </Pressable>
              <Divider />
              <Text className="text-lg font-semibold mt-2 px-3">Location</Text>
              <TextInput
                className="border-2 border-gray-300 w-[80%] ms-5 h-10 rounded-sm p-3 mt-3"
                placeholder="Location"
              />
              <Pressable
                className="mt-4 flex justify-end items-center bg-red-500 w-[70px] rounded-sm p-2  mb-4"
                style={{ height: 30 }}
              >
                <Text className="text-center text-white font-semibold text-sm">
                  Apply
                </Text>
              </Pressable>
              <Divider />

              <Text className="font-semibold text-lg p-3">Price Type</Text>
              <View className={`flex flex-row`}>
                <RadioGroup
                  radioButtons={radioButton}
                  onPress={setSelectedId}
                  selectedId={selectedId}
                  layout="row"
                />
              </View>
              <Pressable
                className="mt-4 flex justify-end items-center bg-red-500 w-[70px] rounded-sm p-2  mb-4"
                style={{ height: 30 }}
              >
                <Text className="text-center text-white font-semibold text-sm">
                  Apply
                </Text>
              </Pressable>
              <Divider />

              <Text className="font-semibold text-lg p-3">Brand</Text>
              <TextInput
                className="border-2 border-gray-300 w-[80%] ms-5 h-10 rounded-sm p-3 mt-3 mb-3"
                placeholder="Brand"
              />
              <Pressable
                className="mt-4 flex justify-end items-center bg-red-500 w-[70px] rounded-sm p-2 mb-4"
                style={{ height: 30 }}
              >
                <Text className="text-center text-white font-semibold text-sm">
                  Apply
                </Text>
              </Pressable>
            </View>
          </View>

          <ScrollView
            className={`${isOpen ? "w-[80%]" : "w-full"}  mb-4 transition-all `}
          >
            {!screen && !isOpen && (
              <Pressable
                onPress={() => setIsOpen(!isOpen)}
                className="flex flex-row  "
              >
                <Icon name="filter" size={30} color="black" />
                <Text className="mt-2 ms-2">Fliter</Text>
              </Pressable>
            )}

            <View
              className="grid gap-4 mt-2 px-4"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", // Increased min size for better readability
              }}
            >
              {products.length > 0 &&
                products.map((product, index) => (
                  <Pressable
                    key={index}
                    className="mb-4 bg-blue-500 "
                    style={{
                      width: Platform.OS !== "web" ? "90%" : "100%",
                      maxWidth: 400, // Ensure cards don't stretch too much on wider screens
                      margin: "auto",
                    }}
                  >
                    <View className="rounded-2xl p-3 bg-white border border-gray-300 shadow-sm">
                      <Link
                        href={`/(components)/Client/(screen)/SelectProduct?id=${product._id}`}
                        asChild
                      >
                        <Pressable>
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
                              numberOfLines={2} // Limits description text to 2 lines
                            >
                              {product.description}
                            </Text>
                          </View>
                        </Pressable>
                      </Link>
                    </View>
                  </Pressable>
                ))}
            </View>

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
        <GuidePage />
        <Footer />
      </View>
    </ScrollView>
  );
}
