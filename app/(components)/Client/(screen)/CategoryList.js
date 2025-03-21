import {
  View,
  Text,
  Image,
  useWindowDimensions,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import All from "../(frontPage)/All";
import Header from "../(header)/Header";
import Footer from "../(frontPage)/Footer";
import Icon from "react-native-vector-icons/Ionicons";
import {  Link } from "expo-router";
import GuidePage from "../(frontPage)/GuidePage";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import useApi from "@/app/hooks/useApi";
export default function CategoryList() {
  const { width } = useWindowDimensions();
  const isScreen = width > 1024;
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [totalCount, setTotalCount] = useState(null);
  const { industry } = useLocalSearchParams(); // Make sure this is correctly imported
  const { getJsonApi } = useApi();

  // const productPage = () => {
  //   router.push("/(component)/(screen)/ProductList");
  // };

  useEffect(() => {
    if (industry) {
      fetchCategories();
    }
  }, [industry]); // Trigger fetchCategories when industry changes

  const fetchCategories = async () => {
    try {
      const data = await getJsonApi(`CategoryPage/${industry}/categoryPage`);
      setCategories(data.productsWithFiles);
      setTotalCount(data.totalProductCount);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView>
      <View>
        <Header />
        <All />

        <View
          className="flex flex-row w-full relative flex items-center justify-center mt-5"
          style={{ zIndex: -1 }}
        >
          <View
            className={`bg-gray-200 transition-all duration-300 absolute  ${
              isOpen || isScreen ? "flex" : "hidden"
            }`}
            style={{
              width: isScreen ? "30%" : "90%",
              height: "100%",
              position: isScreen ? "relative" : "absolute",
              top: 0,
            }}
          >
            <View className="flex items-center mt-4">
              {!isScreen && (
                <Pressable onPress={() => setIsOpen(false)} className="mb-4">
                  <Icon name="close" size={30} color="black" />
                </Pressable>
              )}
              {categories?.length > 0 &&
                categories.map((category, index) => (
                  <Pressable
                    key={index}
                    className="mt-3 w-[90%] h-[40px] rounded-md flex p-2 justify-center "
                  >
                    <Text className="font-semibold text-lg text-black cursor-pointer hover:text-red-600 hover:underline">
                      {category.category}
                    </Text>
                  </Pressable>
                ))}
            </View>
          </View>
          <View
            className="bg-zinc-200 ms-4 md:flex mb-4 py-8"
            style={{ width: isScreen ? "70%" : "100%" }}
          >
            {!isScreen && (
              <Pressable
                onPress={() => setIsOpen(!isOpen)}
                className="mt-4 p-3"
              >
                <Icon name="menu" size={30} color="black" />
              </Pressable>
            )}

            <View className="flex-1 justify-center items-center ">
              <View className="p-4 w-[90%]">
                <Text className="bg-white shadow-md text-lg font-semibold md:text-2xl text-black p-3 rounded-lg">
                  All Machine is ready for Sale ({totalCount ? totalCount : ""})
                </Text>
              </View>
            </View>

            {/* ✅ Product List */}
            <View
              className="grid gap-6 mt-4 px-4"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              }}
            >
              {categories?.length > 0 &&
                categories.map((category, index) => (
                  <View
                    key={index}
                    className="mb-6 bg-TealGreen rounded-2xl shadow-lg transition-transform transform hover:scale-105"
                    style={{ height: "420px", margin: "auto" }}
                  >
                    <Link
                      href={`/(components)/Client/(screen)/ProductList?searchTerms=${category.category}`}
                      asChild
                    >
                      <Pressable>
                        <Image
                          className="rounded-t-2xl"
                          source={{
                            uri: `data:image/jpeg;base64,${category.machineImages[0]}`,
                          }}
                          style={{ width: "100%", height: 280 }}
                        />
                        <View className="p-6 space-y-2">
                          <Text className="font-extrabold text-2xl text-white tracking-wide mb-1">
                            {category.category}
                          </Text>
                          <Text className="font-medium text-lg text-gray-200">
                            {category.productCount} Listings Available |{" "}
                            {category.makeCount} Different Brands
                          </Text>
                        </View>
                      </Pressable>
                    </Link>
                  </View>
                ))}
            </View>
          </View>
        </View>

        <GuidePage />
        <Footer />
      </View>
    </ScrollView>
  );
}
