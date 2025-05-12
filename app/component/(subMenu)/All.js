import {
  View,
  Text,
  Platform,
  Pressable,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { router, Link } from "expo-router";
import useApi from "@/app/hooks/useApi";

export default function All() {
  const [show, setShow] = useState(false);
  const [subCategoryShow, setSubCategoryShow] = useState(false);
  const [hoverClr, setHoverClr] = useState(null);
  const [industries, setIndustries] = useState([]);
  console.log("indus :", industries);
  const [subCategories, setSubCategories] = useState([]);
  console.log("subcategory :", subCategories);
  const [industry, setIndustry] = useState(null);

  const { width } = useWindowDimensions();
  const isScreen = width > 430;
  const { getJsonApi } = useApi();

  const [showSubItems, setShowSubItems] = useState(false);

  // Use a ref for the timeout so it persists across renders
  const closeTimeout = useRef(null);

  useEffect(() => {
    if (industry) {
      getCategory();
    }
  }, [industry]);

  useEffect(() => {
    getIndustries();
  }, []);

  const getIndustries = async () => {
    try {
      const data = await getJsonApi(`CategoryPage`);
      setIndustries(data.data.industries.industries || []);
      setSubCategories(data.data.industries.subcategories || []);
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
      // Do something with categoryData if needed
    } catch (error) {
      console.log(error, "what error");
    }
  };

  // Helper to get subcategories for the hovered industry
  const getSubcategoriesForIndustry = (index) => {
    if (!subCategories || !industries || !industries[index]) return null;
    // Try both array and object structures for robustness
    if (Array.isArray(subCategories)) {
      // Array of objects: [{Industry1: [...]}, ...]
      const matched = subCategories[index];
      if (!matched) return null;
      const subCate = Object.keys(matched)[0];
      return { name: subCate, items: matched[subCate] };
    } else if (typeof subCategories === "object") {
      // Object: { Industry1: [...] }
      const industryName = industries[index];
      return { name: industryName, items: subCategories[industryName] || [] };
    }
    return null;
  };

  // --- Dropdown Hover Delay Logic ---
  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setShow(false);
      setHoverClr(null);
      setSubCategoryShow(false);
    }, 120); // 120ms delay
  };

  const handleMouseEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setShow(true);
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeout.current) clearTimeout(closeTimeout.current);
    };
  }, []);
  //  href={`/screens/CategoryList/?industry=${encodeURIComponent(
  //                             industry
  // )}`}

  const handleProductPress = (category) => {
    console.log(category, "category");
    if (Platform.OS === "web") {
      router.push(`/screens/(productPage)/ProductList?searchTerms=${category.name}`);
    } else {
      navigation.navigate("ProductList", { searchTerms: category });
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
              <View
                className="relative flex ms-5 md:ms-32 mt-4 z-50 flex-row w-full mb-2"
                onMouseLeave={() => {
                  handleMouseLeave();
                  setShowSubItems(false);
                }}
                onMouseEnter={handleMouseEnter}
              >
                {/* Industry List (Left Panel) */}
                <Pressable className="flex-1">
                  <View
                    className="absolute left-0 top-full border-2 border-gray-300 bg-white mt-2 rounded-md flex flex-col z-50"
                    style={{ width: isScreen ? "100%" : "200%" }}
                  >
                    {industries?.length > 0 &&
                      industries.map((industry, index) => (
                        <Link
                          key={index}
                          href={`/screens/CategoryList/?industry=${encodeURIComponent(
                            industry
                          )}`}
                          asChild
                        >
                          <Pressable
                            onMouseEnter={() => {
                              setHoverClr(index);
                              setSubCategoryShow(true);
                            }}
                          >
                            <Text
                              className={`p-1 ml-1 text-gray-600 text-lg hover:text-TealGreen hover:underline ${
                                hoverClr === index
                                  ? "text-TealGreen underline"
                                  : ""
                              }`}
                            >
                              {industry}
                            </Text>
                          </Pressable>
                        </Link>
                      ))}
                  </View>
                </Pressable>

                {/* Subcategory Panel (Middle Panel) */}
                {subCategoryShow && hoverClr !== null && (
                  <Pressable
                    className="absolute top-full left-[calc(100%+1rem)] mt-2 z-50 bg-white border border-gray-300 rounded-md p-2"
                    onMouseEnter={() => setShowSubItems(true)}
                    onMouseLeave={() => {
                      setShowSubItems(false);
                    }}
                    style={{ width: 200 }}
                  >
                    {(() => {
                      const subData = getSubcategoriesForIndustry(hoverClr);
                      console.log("subData :", subData);

                      if (!subData) return <Text>No subcategory</Text>;

                      return (
                        <Pressable
                          onPress={() => handleProductPress(subData)}
                          className="min-h-screen bg-yellow-500"
                        >
                          <Text
                            className={`p-1 ml-1 text-gray-600 text-lg hover:text-TealGreen hover:underline ${
                              hoverClr === subData
                                ? "text-TealGreen underline"
                                : ""
                            }`}
                          >
                            {subData.name}
                          </Text>
                        </Pressable>
                      );
                    })()}
                  </Pressable>
                )}

                {/* SubItems Panel (Right Panel) */}
                {showSubItems && hoverClr !== null && (
                  <View
                    className="absolute top-full left-[calc(200%+2rem)] mt-2 z-50 bg-white border border-gray-300 rounded-md p-2"
                    style={{ width: 200 }}
                  >
                    {(() => {
                      const subData = getSubcategoriesForIndustry(hoverClr);
                      if (!subData || !subData.items?.length)
                        return <Text>No items</Text>;

                      return subData.items.map((item, i) => (
                        <Text
                          key={i}
                          className={`p-1 ml-1 text-gray-600 text-lg hover:text-TealGreen hover:underline ${
                            hoverClr === subData
                              ? "text-TealGreen underline"
                              : ""
                          }`}
                        >
                          {item}
                        </Text>
                      ));
                    })()}
                  </View>
                )}
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
          <Link href={`/screens/LocationBased?priceType=negotiable`} asChild>
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
