// import React, { useState } from "react";
// import { View, Text, Pressable } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";

// export default function App() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <View className="flex-1 items-center justify-center bg-gray-100">
//       {/* ======= Menu Icon (Visible Only on Mobile) ======= */}
//       <Pressable onPress={() => setIsOpen(!isOpen)} className="md:hidden">
//         <Icon name="menu" size={30} color="black" />
//       </Pressable>

//       {/* ======= Content Section ======= */}
//       <View
//         className={`w-[90%] h-[40px] rounded-md flex items-center justify-center
//         ${isOpen ? "flex" : "hidden"} md:flex bg-red-600 mt-3`}
//       >
//         <Text className="font-semibold text-xl text-white">
//           Embroidery Machines
//         </Text>
//       </View>
//     </View>
//   );
// }

import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { getAllProduct } from "../(services)/ProductApi";
import Toast from "react-native-toast-message";

export default function Radiobtn() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const data = await getAllProduct();
        console.log("Fetched Products:", data);

        if (data.success !== false) {
          setProduct(data.data);
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: data.message || "Failed to fetch ",
            position: "top",
            topOffset: 0,
          });
        }
      } catch (error) {
        console.error("Fetch error:", error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Something went wrong!",
          position: "top",
          topOffset: 0,
        });
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <View>
      <Text>This is page for checking the api req</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={product}
          keyExtractor={(item) => item.id.toString()} 
          renderItem={({ item }) => (
            <View>
             <Text>welocme Hoome screen</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
