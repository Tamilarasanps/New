import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native";
import createCategory from "./CreateCategory";
import CategoryManager from "./CategoryManager";
import ProductApproval from "./ProductApproval";
import { ScrollView } from "react-native";
// import HomePageAdmin from "./HomePageAdmin";

const AdminHomePage = () => {
  const [admin, setAdmin] = useState("products");
  return (
    <ScrollView>
      <View>
        {/* <HomePageAdmin /> */}
        <View className="flex-1 p-2 shadow-lg ">
          <View className="h-24 w-full  flex flex-row"></View>
          <View className="flex-1 ">
            {admin === "products" ? <ProductApproval /> : <CategoryManager />}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AdminHomePage;
