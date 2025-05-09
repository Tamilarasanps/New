import {
  View,
  Text,
  Image,
  useWindowDimensions,
  Pressable,
  ScrollView,
  Platform,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import useApi from "@/app/hooks/useApi";
import Footer from "@/app/component/(footer)/Footer";
import GuidePage from "../(Homepage)/GuidePage";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import All from "@/app/component/(subMenu)/All";

export default function CategoryList() {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const isScreen = width > 1024;
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  console.log(categories, "categories");
  const [IndustriesData, setIndustriesData] = useState([]);
  console.log(IndustriesData, "ksdkk");
  const [totalCount, setTotalCount] = useState(null);
  const route = useRoute();
  const { getJsonApi } = useApi();
  const navigation = useNavigation();
  const geoCoords = { latitude: 11.0788608, longitude: 76.9327104 };

  let industry; // Make sure this is correctly imported

  if (Platform.OS === "web") {
    industry = useLocalSearchParams().industry;
  } else {
    industry = route?.params?.industry;
  }
  useEffect(() => {
    if (industry) {
      fetchCategories();
    }
  }, [industry]);
  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getJsonApi(`CategoryPage/${industry}/categoryPage`);
      console.log(data, "check");
      setCategories(data.data.productsWithFiles);
      setTotalCount(data.data.totalProductCount);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDetails = async () => {
    try {
      const queraystring = new URLSearchParams(geoCoords).toString();
      const data = await getJsonApi(`homepage/?${queraystring}`);
      setIndustriesData(data.data.category);

      console.log(data.data.category, "data categroypage");
      console.log(queraystring);
    } catch (error) {
      console.error(error);
    }
  };

  // const filterIndustry=IndustriesData.filter((item)=>item.industry.to)

  const filteredIndustries = IndustriesData.filter(
    (item) => item.industry.toLowerCase() === industry?.toLowerCase()
  );

  const handleProductPress = (category) => {
    if (Platform.OS === "web") {
      router.push(`/screens/(productPage)/ProductList?searchTerms=${category}`);
    } else {
      navigation.navigate("ProductList", { searchTerms: category });
    }
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <View>
          <All />
          <View
            className="flex flex-row pt-2 pl-2 mt-1 bg-zinc-100 shadow items-center"
            style={{ zIndex: -1 }}
          >
            <Text className="text-lg">Home</Text>
            <Ionicons
              name="chevron-forward"
              size={13}
              color="black"
              style={{ marginTop: 3 }} // Align chevron with "Home"
            />

            {filteredIndustries &&
              filteredIndustries.length > 0 &&
              filteredIndustries.map((indus, index) => (
                <View key={index}>
                  <Text>{`${indus?.industry}`}</Text>
                </View>
              ))}
          </View>

          <View
            className="flex flex-row w-full relative flex items-center justify-center mt-2"
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
              <View className="flex items-center mt-4 z-50">
                {!isScreen && (
                  <Pressable onPress={() => setIsOpen(false)} className="mb-4">
                    <Icon name="close" size={30} color="black" />
                  </Pressable>
                )}
                {IndustriesData?.length > 0 &&
                  IndustriesData.map((category, index) => (
                    <Pressable
                      key={index}
                      className="mt-3 w-[90%] h-[40px] rounded-md flex p-2 justify-center "
                    >
                      <Text className="font-semibold text-lg text-black cursor-pointer hover:text-red-600 hover:underline">
                        {category.industry}
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
                    All Machine is ready for Sale (
                    {totalCount ? totalCount : ""})
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
                {IndustriesData?.length > 0 &&
                  IndustriesData.map((category, index) => (
                    <View
                      key={index}
                      className="mb-6 bg-TealGreen rounded-2xl shadow-lg transition-transform transform hover:scale-105"
                      style={{ height: "420px", margin: "auto" }}
                    >
                      <Pressable
                        onPress={() => handleProductPress(category.industry)}
                      >
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
                            {category.count} Different Brands
                          </Text>
                        </View>
                      </Pressable>
                    </View>
                  ))}
              </View>
            </View>
          </View>

          {Platform.OS === "web" && <GuidePage />}
          {Platform.OS === "web" && <Footer />}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
