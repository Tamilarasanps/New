// import { View, Text, Platform, Pressable } from "react-native";
// import React, { useEffect, useState } from "react";
// import { router } from "expo-router";
// import { Link } from "expo-router";
// import useApi from "@/app/hooks/useApi";
// export default function All() {
//   const [show, setShow] = useState(false);
//   const [hoverClr, setHoverClr] = useState(null);
//   const [industries, setIndustries] = useState([]);
//   const { getJsonApi } = useApi();

//   useEffect(() => {
//     getIndustries();
//   }, []);

//   const getIndustries = async () => {
//     try {
//       const data = await getJsonApi(`CategoryPage`);
//       setIndustries(data.data.industries);

//       console.log(data.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <View className="">
//       {Platform.OS === "web" && (
//         <View
//           className="flex   flex-row w-full mb-2 mt-5 z-50 flex justify-center"
//           style={{ position: "sticky", top: 0 }}
//         >
//           {/* Categories Section */}
//           <Pressable className="flex-1">
//             <Text
//               className="text-center text-TealGreen text-sm font-semibold md:text-lg md:font-bold"
//               onMouseEnter={() => setShow(true)}
//             >
//               Industries
//             </Text>

//             {show && (
//               <View className="relative flex ms-5 md:ms-32 mt-4 z-50 flex-row w-full mb-2 ">
//                 <Pressable className="flex-1">
//                   {show && (
//                     <View
//                       className="absolute left-0 top-full z-50 w-[250%] border-2 border-gray-300 bg-white mt-2 rounded-md flex flex-row flex-wrap z-50 "
//                       onMouseLeave={() => setShow(false)}
//                     >
//                       {industries?.length > 0 &&
//                         industries.map((industry, index) => (
//                           <Link
//                             href={`/(Screens)/(screen)/CategoryList/?industry=${industry}`}
//                             asChild
//                           >
//                             <Pressable
//                               onMouseEnter={() => setHoverClr(index)}
//                               onMouseLeave={() => setHoverClr(null)}
//                             >
//                               <Text className="p-5 text-lg z-50 hover:text-TealGreen hover:underline">
//                                 {industry}
//                               </Text>
//                             </Pressable>
//                           </Link>
//                         ))}
//                     </View>
//                   )}
//                 </Pressable>
//               </View>
//             )}
//           </Pressable>

//           {/* Fixed Price Section */}
//           <Link
//             href={`/(components)/Client/(screen)/ProductList?priceType=fixed`}
//             asChild
//           >
//             <Pressable className="flex-1">
//               <Text className="text-center text-TealGreen text-sm font-semibold md:text-lg md:font-bold ">
//                 Mechanics
//               </Text>
//             </Pressable>
//           </Link>
//           {/* Negotiable Price Section */}
//           <Link
//             href={`/(components)/Client/(screen)/ProductList?priceType=negotiable`}
//             asChild
//           >
//             <Pressable className="flex-1">
//               <Text className="text-center text-TealGreen text-sm font-semibold md:text-lg md:font-bold ">
//                 Location
//               </Text>
//             </Pressable>
//           </Link>

//           {/* Favourite Section */}
//           <Pressable className="flex-1">
//             <Text className="text-center text-TealGreen text-sm font-semibold md:text-lg md:font-bold ">
//               Favourite
//             </Text>
//           </Pressable>
//         </View>
//       )}
//     </View>
//   );
// }

import { View, Text, Platform, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { router, Link } from "expo-router";
import useApi from "@/app/hooks/useApi";

export default function All() {
  const [show, setShow] = useState(false);
  const [hoverClr, setHoverClr] = useState(null);
  const [industries, setIndustries] = useState([]);
  const { getJsonApi } = useApi();

  useEffect(() => {
    getIndustries();
  }, []);

  const getIndustries = async () => {
    try {
      const data = await getJsonApi(`CategoryPage`);
      console.log("Industries API Response:", data.data);
      setIndustries(data.data.industries || []);
    } catch (err) {
      console.log("API Error:", err);
    }
  };

  return (
    <View>
      {/* TEMP DEBUG VIEW - Shows fetched industries as plain list */}
      {industries.length > 0 && (
        <View className="p-4 bg-gray-100 border border-gray-400 rounded-lg my-4">
          <Text className="font-bold text-lg mb-2">Fetched Industries:</Text>
          {industries.map((item, i) => (
            <Text key={i} className="text-black">
              {item}
            </Text>
          ))}
        </View>
      )}

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
              <View className="relative flex ms-5 md:ms-32 mt-4 z-50 flex-row w-full mb-2">
                <Pressable className="flex-1">
                  <View
                    className="absolute left-0 top-full w-[250%] border-2 border-gray-300 bg-white mt-2 rounded-md flex flex-row flex-wrap z-50"
                    onMouseLeave={() => {
                      setShow(false);
                      setHoverClr(null);
                    }}
                  >
                    {industries?.length > 0 &&
                      industries.map((industry, index) => (
                        <Link
                          key={industry?.id || index}
                          href={`/(Screens)/(screen)/CategoryList/?industry=${encodeURIComponent(
                            industry?.name || industry
                          )}`}
                          asChild
                        >
                          <Pressable
                            onMouseEnter={() => setHoverClr(index)}
                            onMouseLeave={() => setHoverClr(null)}
                          >
                            <Text
                              className={`p-5 text-lg hover:text-TealGreen hover:underline ${
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
            href={`/(components)/Client/(screen)/ProductList?priceType=negotiable`}
            asChild
          >
            <Pressable className="flex-1">
              <Text className="text-center text-TealGreen text-sm font-semibold md:text-lg md:font-bold">
                Location
              </Text>
            </Pressable>
          </Link>

          {/* Favourite */}
          <Pressable className="flex-1">
            <Text className="text-center text-TealGreen text-sm font-semibold md:text-lg md:font-bold">
              Favourite
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
