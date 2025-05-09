import {
  View,
  Text,
  ScrollView,
  Platform,
  Pressable,
  Image,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

export default function BannerUpload() {
  const [selectedImage, setSelectedImage] = useState([]);
  const { width } = useWindowDimensions(); // Get screen width

  const pickMedia = async (type) => {
    if (Platform.OS === "android" && Platform.Version < 29) {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        return showToast(
          "Permission Required",
          "Please allow access to the gallery."
        );
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        type === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      quality: 0.8,
      allowsMultipleSelection: type === "image",
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      type === "image"
        ? handleImages(result.assets)
        : handleVideo(result.assets[0]);
    }
  };

  const handleImages = (files) => {
    if ((selectedImage?.length || 0) + files.length > 10) {
      return showToast(
        "Image Limit Exceeded",
        "You can upload a maximum of 10 images."
      );
    }
    setSelectedImage((prev) => [...(prev || []), ...files]);
  };

  const deleteImg = (index) => {
    setSelectedImage((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <View className="items-center">
      <Text className="text-xl font-bold my-4">Banner Upload</Text>

      <Pressable className="bg-red-600 rounded-md ">
        <Text className="text-xl font-bold my-4 text-white ">
          Mechanic Banner
        </Text>
      </Pressable>

      <View
        className="mt-7 bg-gray-100 py-8 w-full mx-auto gap-8 px-4"
        style={{
          flexDirection: width < 768 ? "column" : "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MaterialIcons
          name="insert-photo"
          onPress={() => pickMedia("image")}
          size={50}
          color="teal"
        />

        {/* Display selected images */}
        <ScrollView
          horizontal={width >= 768}
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{
            paddingHorizontal: 10,
            alignItems: "center",
            flexWrap: width < 768 ? "wrap" : "nowrap",
          }}
          style={{
            maxHeight: width < 768 ? 300 : 500, // Responsive height
          }}
        >
          {selectedImage?.length > 0 ? (
            selectedImage.map((imageUri, index) => (
              <Pressable key={index} className="relative mr-3 mb-3">
                <Image
                  source={{ uri: imageUri.uri }}
                  style={{
                    width: width < 768 ? width * 0.9 : 300, // 90% of screen on mobile, fixed 300px on desktop
                    height: width < 768 ? 200 : 200, // Consistent height
                    borderRadius: 10,
                    resizeMode: "cover",
                  }}
                />
                <Pressable
                  className="absolute top-1 right-1 bg-red-500 rounded-full w-5 h-5 items-center justify-center"
                  onPress={() => deleteImg(index)}
                >
                  <MaterialIcons name="close" size={14} color="white" />
                </Pressable>
              </Pressable>
            ))
          ) : (
            <Text className="text-gray-500 text-sm italic self-center">
              Select a Banner
            </Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
