import { View, Text, Platform, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { Link } from "expo-router";
import useApi from "@/app/hooks/useApi";
export default function All() {
  const [show, setShow] = useState(false);
  const [hoverClr, setHoverClr] = useState(null);
  const [industries, setIndustries] = useState([]);
  const { getJsonApi } = useApi();

  const subCate = () => {
    router.push("/(component)/(screen)/CategoryList");
  };

  useEffect(() => {
    getIndustries();
  }, []);

  const getIndustries = async () => {
    try {
      const data = await getJsonApi(`CategoryPage`);
      setIndustries(data.data.industries);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(industries + "pl")

  const subcategory = [
    "Spinning Machines",
    "Weaving Machines",
    "Knitting Machines",
    "Textile Dyeing Machines",
    "Textile Printing Machines",
    "Finishing Machines",
    "Nonwoven Machines",
    "Textile Testing Machines",
    "Textile Reprocessing Machines",
    "Embroidery Machines",
  ];

  return (
    <View className="">
      {Platform.OS === "web" && (
        <View
          className="flex   flex-row w-full mb-2 mt-5 z-50 flex justify-center"
          style={{ position: "sticky", top: 0 }}
        >
          {/* Categories Section */}
          <Pressable className="flex-1">
            <Text
              className="text-center text-TealGreen text-sm font-semibold md:text-lg md:font-bold"
              onMouseEnter={() => setShow(true)}
            >
              Industries
            </Text>

            {show && (
              <View className="relative flex ms-5 md:ms-32 mt-4 z-50 flex-row w-full mb-2 ">
                <Pressable className="flex-1">
                  {show && (
                    <View
                      className="absolute left-0 top-full z-50 w-[250%] border-2 border-gray-300 bg-white mt-2 rounded-md flex flex-row flex-wrap z-50 "
                      onMouseLeave={() => setShow(false)}
                    >
                      {industries?.length > 0 &&
                        industries.map((industry, index) => (
                          <Link
                            href={`/(Screens)/(screen)/CategoryList/?industry=${industry}`}
                            asChild
                          >
                            <Pressable
                              onMouseEnter={() => setHoverClr(index)}
                              onMouseLeave={() => setHoverClr(null)}
                            >
                              <Text
                                className="p-5 text-lg z-50 hover:text-TealGreen hover:underline"
                              >
                                {industry}
                              </Text>
                            </Pressable>
                          </Link>
                        ))}
                    </View>
                  )}
                </Pressable>
              </View>
            )}
          </Pressable>

          {/* Fixed Price Section */}
          <Link
            href={`/(components)/Client/(screen)/ProductList?priceType=fixed`}
            asChild
          >
            <Pressable className="flex-1">
              <Text className="text-center text-TealGreen text-sm font-semibold md:text-lg md:font-bold ">
                Mechanics
              </Text>
            </Pressable>
          </Link>
          {/* Negotiable Price Section */}
          <Link
            href={`/(components)/Client/(screen)/ProductList?priceType=negotiable`}
            asChild
          >
            <Pressable className="flex-1">
              <Text className="text-center text-TealGreen text-sm font-semibold md:text-lg md:font-bold ">
                Location
              </Text>
            </Pressable>
          </Link>
          

          {/* Favourite Section */}
          <Pressable className="flex-1">
            <Text className="text-center text-TealGreen text-sm font-semibold md:text-lg md:font-bold ">
              Favourite
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
