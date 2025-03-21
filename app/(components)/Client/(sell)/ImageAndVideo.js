import React from "react";
import { View,Text } from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native";

const ImageAndVideo = () => {
  const [selectedImage, setSelectedImage] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState([]);

  //image and video picker

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
      mediaTypes: type === "image" ? ["images"] : ["videos"],
      quality: 0.8,
      allowsMultipleSelection: type === "image",
    });

    if (!result.canceled && result.assets.length > 0) {
      type === "image"
        ? handleImages(result.assets)
        : handleVideo(result.assets[0]);
    }
  };

  const showToast = (text1, text2) => {
    Toast.show({
      type: "error",
      text1,
      text2,
      position: "top",
      topOffset: 0,
    });
  };

  const handleImages = (files) => {
    if (selectedImage.length + files.length > 10) {
      return showToast(
        "Image Limit Exceeded",
        "You can upload a maximum of 10 images."
      );
    }

    const validFiles = files.filter((file) => {
      if (file.fileSize > 2 * 1024 * 1024) {
        showToast("File size exceeds 2MB.", "Please select a smaller file.");
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setSelectedImage((prev) => [...prev, ...validFiles]);
    }
  };

  const handleVideo = (file) => {
    if (file.duration > 16000) {
      return showToast("File duration should be within 15 seconds.");
    }

    if (selectedVideo.length > 0) {
      return showToast(
        "You can upload only one video",
        "Video duration should be within 15 Sec."
      );
    }

    setSelectedVideo((prev) => [...prev, file]);
  };

  //image and video delete

  const deleteImg = (index) => {
    const newImg = selectedImage.filter((_, i) => i !== index);
    setSelectedImage(newImg);
  };

  const deleteVid = (index) => {
    const newVid = selectedVideo.filter((_, i) => i !== index);
    setSelectedVideo(newVid);
  };
  return (
    <View>
      <View className="mt-7 bg-gray-100 py-8 w-[100%] mx-auto flex flex-row gap-8 px-4">
        <MaterialIcons
          className="my-auto"
          name="insert-photo"
          onPress={() => pickMedia("image")}
          size={50}
          color="teal"
        />

        {/* Display selected images */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-1"
        >
          {selectedImage.length > 0 ? (
            selectedImage.map((imageUri, index) => (
              <View key={index} className="relative mr-3">
                <Image
                  source={{ uri: imageUri.uri }}
                  style={{ width: 80, height: 80, borderRadius: 8 }}
                />
                <Pressable
                  className="absolute top-1 right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center shadow-md"
                  onPress={() => deleteImg(index)}
                >
                  <MaterialIcons name="close" size={14} color="white" />
                </Pressable>
              </View>
            ))
          ) : (
            <Text className="text-gray-500 text-sm italic my-auto">
              No images selected
            </Text>
          )}
        </ScrollView>
      </View>

      {/* video  */}

      <Text className="text-lg font-semibold text-teal-600 mt-6">
        Machine Videos
      </Text>
      <View className="mt-7 bg-gray-100 py-8 w-[100%] mx-auto flex flex-row gap-8 px-4">
        <MaterialIcons
          className="my-auto"
          name="videocam"
          onPress={() => pickMedia("video")}
          size={50}
          color="teal"
        />
        {/* Display selected videos */}
        <ScrollView horizontal>
          {selectedVideo.length > 0 ? (
            selectedVideo.map((vid, index) => (
              <View key={index} className="mr-2">
                <Video
                  source={{ uri: vid.uri }}
                  style={{ width: 80, height: 80, borderRadius: 8 }}
                  useNativeControls
                  resizeMode="cover"
                />

                <Pressable
                  className="absolute top-1 right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center shadow-md"
                  onPress={() => deleteVid(index)}
                >
                  <MaterialIcons name="close" size={14} color="white" />
                </Pressable>
              </View>
            ))
          ) : (
            <Text className="text-gray-500 text-sm italic my-auto">
              No Videos selected
            </Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default ImageAndVideo;
