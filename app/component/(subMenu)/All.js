import {
  View,
  Text,
  Platform,
  Pressable,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, Link } from "expo-router";
import useApi from "@/app/hooks/useApi";

export default function All() {
  const [show, setShow] = useState(false);
  const [hoverClr, setHoverClr] = useState(null);
  const [industries, setIndustries] = useState([]);
  const [industry, setIndustry] = useState(null);

  const { width } = useWindowDimensions();
  const isScreen = width > 430;
  const { getJsonApi } = useApi();

  useEffect(() => {
    if (industry) {
      getCategory();
      // console.log("loding");
    }
    // console.log("loading");
  }, [industry]);

  useEffect(() => {
    getIndustries();
    // console.log("loadede");
  }, []);

  const getIndustries = async () => {
    try {
      const data = await getJsonApi(`CategoryPage`);

      // console.log("Industries API Response:", data.data);
      setIndustries(data.data.industries || []);
    } catch (err) {
      console.log("API Error:", err);
    }
  };
  const getCategory = async () => {
    if (!industry) return;
    try {
      const categoryData = await getJsonApi(
        `CategoryPage/${industry}/categoryPage`
      );
      console.log("category data", categoryData);
    } catch (error) {
      console.log(error, "what error");
    }
  };

  return (
    <View>
      {/* Web-only navigation menu */}
      {Platform.OS === "web" && (
        <View
          className="flex flex-row w-full mb-2 mt-5 z-50 justify-center"
          style={{ position: "sticky", top: 0 }}
        >
          {/* Industries Dropdown */}
          <Pressable className="flex-1">
            <Text
              className="text-center text-TealGreen text-sm font-semibold md:text-lg md:font-bold"
              onMouseEnter={() => setShow(true)}
            >
              Industries
            </Text>

            {show && (
              <View className="relative flex ms-5 md:ms-32 mt-4 z-50 flex-row w-full mb-2 bg-red-500">
                <Pressable className="flex-1 ">
                  <View
                    className="absolute left-0 top-full   border-2 border-gray-300 bg-white mt-2 rounded-md flex flex-col  flex-wrap z-50"
                    onMouseLeave={() => {
                      setShow(false);
                      setHoverClr(null);
                    }}
                    style={{ width: isScreen ? "100%" : "200%" }}
                  >
                    {industries?.length > 0 &&
                      industries.map((industry, index) => (
                        <Link
                          key={industry?.id || index}
                          href={`/screens/CategoryList/?industry=${encodeURIComponent(
                            industry?.name || industry
                          )}`}
                          asChild
                        >
                          <Pressable
                            onMouseEnter={() => setHoverClr(index)}
                            onMouseLeave={() => setHoverClr(null)}
                          >
                            <Text
                              className={`p-1 ml-1 text-gray-600 text-lg hover:text-TealGreen hover:underline ${
                                hoverClr === index
                                  ? "text-TealGreen underline"
                                  : ""
                              }`}
                            >
                              {industry?.name || industry}
                            </Text>
                          </Pressable>
                        </Link>
                      ))}
                  </View>
                </Pressable>
              </View>
            )}
          </Pressable>

          {/* Mechanics Link */}
          <Link
            href={`/(components)/Client/(screen)/ProductList?priceType=fixed`}
            asChild
          >
            <Pressable className="flex-1">
              <Text className="text-center text-TealGreen text-sm font-semibold md:text-lg md:font-bold">
                Mechanics
              </Text>
            </Pressable>
          </Link>

          {/* Location Link */}
          <Link
            // href={`/(components)/Client/(screen)/ProductList?priceType=negotiable`}
            href={`/screens/LocationBased?priceType=negotiable`}
            asChild
          >
            <Pressable className="flex-1">
              <Text className="text-center text-TealGreen text-sm font-semibold md:text-lg md:font-bold">
                Location
              </Text>
            </Pressable>
          </Link>

          {/* Favourite */}
          <Pressable
            className="flex-1"
            onPress={() => router.push("/screens/(wishlists)/WishlistScreen")}
          >
            <Text className="text-center text-TealGreen text-sm font-semibold md:text-lg md:font-bold">
              Favourite
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
