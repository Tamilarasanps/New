import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native";
import createCategory from "./CreateCategory";
import CategoryManager from "./CategoryManager";
import ProductApproval from "./ProductApproval";
// import HomePageAdmin from "./HomePageAdmin";

const AdminHomePage = () => {
  const [admin, setAdmin] = useState("products");
  return (
    <View>
      {/* <HomePageAdmin /> */}
      <View className="bg-red-100 flex-1 p-2 shadow-lg bg-gray-900">
        <View className="h-24 w-full bg-white flex flex-row">
          <Pressable
            className="flex-1  h-full"
            onPress={() => setAdmin("products")}
          >
            <View className=" bg-TealGreen flex-1  h-full justify-center items-center cursor-pointer hover:bg-slate-500 duration-300">
              <Text className="font-bold text-white text-lg">PRODUCTS</Text>
            </View>
          </Pressable>
          <View style={{ width: 2 }}></View>
          <Pressable
            className="flex-1  h-full "
            onPress={() => setAdmin("category")}
          >
            <View className=" bg-TealGreen  flex-1 h-full  justify-center items-center cursor-pointer hover:bg-slate-500 duration-300">
              <Text className="font-bold text-white text-lg">CATEGORY</Text>
            </View>
          </Pressable>
        </View>
        <View className="flex-1 bg-white">
          {admin === "products" ? <ProductApproval /> : <CategoryManager />}
        </View>
      </View>
    </View>
  );
};

export default AdminHomePage;
