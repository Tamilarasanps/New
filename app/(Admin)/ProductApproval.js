import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import useApi from "../hooks/useApi";
import Product from "../Product";
import ProductApprovalModal from "./ProctApprovalModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductApproval = () => {
  const { getJsonApi, pathchApi } = useApi();
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("pending");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getJsonApi(`adminApproval/getPendingProducts/${status}` );
        console.log(data)
        setProducts(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [status]);

  const product = products[currentIndex];

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < products.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handleApprove = (index,statuss) => {

    const token = AsyncStorage.getItem("userToken");
    const updatedProduct = pathchApi(
      `adminApproval/updateAdminApproval/`,
      { productId: products[index]._id, status: statuss },
      token
    );
    setProducts(() => {
      const updated = products;
      updated[index] = updatedProduct.data;
      return updated;
    });
  };
  
  return (
    <View className="bg-blue-500 flex-1">
      <View className="h-24 flex flex-row w-full">
        <View className="bg-red-400 flex-1 rounded-full p-4 cursor-pointer">
          <Pressable onPress={() => setStatus("pending")}>
            <Text className="text-center my-auto text-lg font-bold">
              Pending Approval
            </Text>
          </Pressable>
        </View>
        <View className="bg-yellow-400 flex-1 rounded-full p-4 cursor-pointer">
          <Pressable onPress={() => setStatus("approved")}>
            <Text className="text-center my-auto text-lg font-bold">
              Accepted
            </Text>
          </Pressable>
        </View>
        <View className="bg-green-400 flex-1 rounded-full p-4 cursor-pointer">
          <Pressable onPress={() => setStatus("rejected")}>
            <Text className="text-center my-auto text-lg font-bold">
              Rejected
            </Text>
          </Pressable>
        </View>
      </View>
      <Product
        products={products}
        status={status}
        setIsModalVisible={setIsModalVisible}
        setCurrentIndex={setCurrentIndex}
      />
      {product && isModalVisible && (
        <ProductApprovalModal
          isVisible={isModalVisible}
          product={product}
          onClose={() => setIsModalVisible(false)}
          onApprove={handleApprove}
          // onReject={handleReject}
          onPrev={handlePrev}
          onNext={handleNext}
          currentIndex={currentIndex}
          totalProducts={products.length}
        />
      )}
    </View>
  );
};

export default ProductApproval;
