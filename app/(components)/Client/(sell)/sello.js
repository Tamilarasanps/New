import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Pressable,
  Text,
  Image,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";
import axios from "axios";
import Toast from "react-native-toast-message";
import React from "react";
import Mobile from "../../common/SignIn/Mobile";
import { allCountries } from "country-telephone-data";
import useApi from "@/app/hooks/useApi";

export default function Sell() {
  const [value, setValue] = useState("");
  const [subcato, setSubcato] = useState("");
  const [machineMake, setMachineMake] = useState("");
  const [selectedCode, setSelectedCode] = useState("+91");
  const [searchQuery, setSearchQuery] = useState("");
  const [radio, setRadiobtn] = useState("");
  // const [phone, setPhone] = useState("");
  // const [email, setEmail] = useState("");
  // const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [selectedImage, setSelectedImage] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState([]);
  const [negotiable, setNegotiable] = useState(false);
  const [description, setDescription] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [industries, setIndustries] = useState([]);
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState(["", ""]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const { width } = useWindowDimensions();
  const { getJsonApi } = useApi();

  const cleanCountryName = (name) => name.replace(/\s*\(.*?\)/g, "").trim();

  const filteredCountries = allCountries
    .filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .map((c) => ({
      name: cleanCountryName(c.name),
      dialCode: c.dialCode,
      iso2: c.iso2,
    }));


  const pickMedia = async (type) => {
    if (Platform.OS === "android" && Platform.Version < 29) {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        return Toast.show({
          type: "error",
          text1: "Permission Required",
          text2: "Please allow access to the gallery.",
          position: "top",
          topOffset: 0,
        });
      }
    }

    const mediaTypes = type === "image" ? ["images"] : ["videos"];

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes,
      quality: 0.8,
      allowsMultipleSelection: type === "image",
    });

    if (!result.canceled && result.assets.length > 0) {
      let validFiles = [];

      if (type === "image") {
        if (selectedImage.length + result.assets.length > 10) {
          return Toast.show({
            type: "error",
            text1: "Image Limit Exceeded",
            text2: "You can upload a maximum of 10 images.",
            position: "top",
            topOffset: 0,
          });
        }

        result.assets.forEach((file) => {
          if (file.fileSize > 2 * 1024 * 1024) {
            Toast.show({
              type: "error",
              text1: "File size exceeds 2MB.",
              text2: "Please select a smaller file.",
              position: "top",
              topOffset: 0,
            });
          } else {
            validFiles.push(file);
          }
        });

        if (validFiles.length > 0) {
          setSelectedImage((prev) => [...prev, ...validFiles]);
        }
      } else {
        const fileUri = result.assets[0];
        if (fileUri.duration > 16000) {
          return Toast.show({
            type: "error",
            text1: "File duration should be within 15 seconds",
            position: "top",
            topOffset: 0,
          });
        } else if (selectedVideo.length > 0 || fileUri.length > 1) {
          return Toast.show({
            type: "error",
            text1: "You can upload only one video",
            text2: "video duration should be within 15 Sec",
            position: "top",
            topOffset: 0,
          });
        }
        setSelectedVideo((prev) => [...prev, fileUri]);
      }
    }
  };

  const deleteImg = (index) => {
    const newImg = selectedImage.filter((_, i) => i !== index);
    setSelectedImage(newImg);
  };

  const deleteVid = (index) => {
    const newVid = selectedVideo.filter((_, i) => i !== index);
    setSelectedVideo(newVid);
  };
  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        try {
          const data = await getJsonApi(`CategoryPage`);
          setIndustries(data);
        } catch (error) {
          console.error(error);
        }
      } catch (err) {}
    };
    fetchIndustries();
  }, []);
  const sentData = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("industry", value);
    formData.append("category", subcato);
    formData.append("make", machineMake);
    formData.append("price", price);
    formData.append("negotiable", negotiable);
    formData.append("description", description);

    // Append all images
    selectedImage.forEach((image) => {
      formData.append("images", image.file);
    });

    // Append all videos
    selectedVideo.forEach((video, index) => {
      formData.append("videos", video.file);
    });

    try {
      const response = await axios.post(
        "http://192.168.162.158:5000/productupload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error uploading data:", error.response);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="absolute top-10 left-0 right-0 z-50">
        <Toast />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className={`bg-white z-10 py-8 rounded-lg shadow-lg mx-auto mt-8 ${
            Platform.OS === "web"
              ? width < 1024
                ? "max-w-[90%] min-w-[90%] px-8"
                : "max-w-2xl px-24"
              : "max-w-[90%] min-w-[90%] px-8"
          } mb-8`}
        >
          {/* <View className="w-[80%] mx-auto"> */}
          <Text className="text-3xl font-bold text-center text-teal-600">
            Upload Form
          </Text>
          <View className="h-[2px] bg-gray-300 my-6 mx-auto w-[90%]" />

          {/* Machine Images Section */}
          <Text className="text-lg font-semibold text-teal-600 mt-6">
            Machine Images
          </Text>
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

          {/* Machine Videos Section */}
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

          {/* Industry Details Section */}
          <Text className="text-lg font-semibold text-teal-600 mt-6">
            Industry
          </Text>
          <TextInput
            className="border outline-teal-600 rounded-lg h-12 w-full mt-4 p-3 text-gray-500  focus:border-teal-600"
            // data={data}
            labelField="label"
            valueField="value"
            placeholder="Select Industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          />
          <Text className="text-lg font-semibold text-teal-600 mt-6">
            Category
          </Text>
          <Dropdown
            style={{
              height: 50,
              width: Platform.OS === "web" ? "100%" : "100%",
              marginTop: 10,
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 5,
              padding: 10,
            }}
            // data={subcategory}
            labelField="label"
            valueField="value"
            placeholder="Select Industry"
            value={subcato}
            onChange={(item) => setSubcato(item.value)}
          />
          <Text className="text-lg font-semibold text-teal-600 mt-6">Make</Text>
          <Dropdown
            style={{
              height: 50,
              width: Platform.OS === "web" ? "100%" : "100%",
              marginTop: 10,
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 5,
              padding: 10,
            }}
            // data={make}
            labelField="label"
            valueField="value"
            placeholder="Select Industry"
            value={machineMake}
            onChange={(item) => setMachineMake(item.value)}
          />

          {/* Radio Buttons for Condition */}

          <Text className="text-lg font-semibold text-teal-600 mt-6">
            Condition:
          </Text>
          <View className="flex flex-row gap-10 mt-4">
            {["Negotiable","Fixed"].map((item) => (
              <Pressable
                key={item.id}
                onPress={() => setRadiobtn(item)}
                className={`px-4 py-2 rounded-sm ${
                  radio === item.value
                    ? "bg-teal-600"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                <Text
                  className={`text-sm ${
                    radio === item ? "text-white" : "text-gray-600"
                  }`}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Price Input Section */}
          <Text className="text-lg font-semibold text-teal-600 mt-6">
            Price:
          </Text>
          <View className="flex flex-row items-center mt-4">
            <TextInput
              className="border border-gray-300 rounded-lg w-[50%] p-3 focus:border-teal-600 outline-teal-600"
              placeholder="Enter price"
              keyboardType="numeric"
              value={price}
              onChangeText={(item) => setPrice(item)}
            />
          </View>
          <Text className="text-lg font-semibold text-teal-600 mt-6">
            Price Type:
          </Text>
          <View className="flex flex-row flex-wrap mt-4 gap-8">
            {["Fixed", "Negotiable"].map((i) => (
              <View key={i} className="flex flex-row items-center mb-2">
                <Pressable
                  onPress={() => setNegotiable(i)}
                  className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center ${
                    negotiable === i
                      ? "bg-yellow-400 border-yellow-400"
                      : "border-gray-400"
                  }`}
                >
                  {negotiable === i && (
                    <Text className="text-white font-bold text-xs md:text-sm leading-none">
                      ✔
                    </Text>
                  )}
                </Pressable>
                <Text className="ml-2 text-gray-600">{i}</Text>
              </View>
            ))}
          </View>
          <Text className="text-lg font-semibold text-teal-600 mt-6">
            Description:
          </Text>

          <TextInput
            className="border border-gray-300 rounded-lg h-48 w-full mt-4 p-3 text-gray-500 focus:border-teal-600"
            placeholder="Type about your product"
            value={description}
            onChangeText={(item) => setDescription(item)}
            placeholderTextColor="gray"
            style={{
              textAlignVertical: "center",
            }}
          />

          <Text className="text-lg font-semibold text-teal-600 mt-6">
            Mobile
          </Text>

          <View className="w-full z-50">
            <Mobile
              dropdownVisible={dropdownVisible}
              setDropdownVisible={setDropdownVisible}
              selectedCode={selectedCode}
              setSelectedCode={setSelectedCode}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filteredCountries={filteredCountries}
            />
          </View>
          {/* Location Section with Suggestions */}
          {["State", "country"].map((i, ind) => (
            <View key={ind}>
              <Text className="text-lg font-semibold text-teal-600 mt-6">
                {i}
              </Text>
              <View className="relative mt-4">
                <TextInput
                  key={i}
                  className="border border-gray-300 h-[50] rounded-lg w-full p-3  focus:border-teal-600 outline-teal-600"
                  placeholder={`Enter your  ${i}`}
                  value={location[ind]}
                  onChangeText={(text) => {
                    setLocation((prevLocation) => {
                      const updated = [...prevLocation]; // Copy the previous array
                      updated[ind] = text; // Update the specific index
                      return updated; // Return new state
                    });
                  }}
                />
              </View>
            </View>
          ))}

          <Pressable
            onPress={sentData}
            className="bg-teal-600 w-max px-4 py-2 rounded-md mx-auto mt-12 mb-24"
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              Post
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


// import React, { useState } from 'react';
// import { View, TextInput, FlatList, Text } from 'react-native';

// const industries = ["Agriculture", "Automotive", "Banking", "Construction", "Education"];
// const categories = ["Cars", "Trucks", "Motorcycles", "Buses", "Boats"];
// const makes = ["Toyota", "Ford", "Honda", "BMW", "Tesla"];

// const SearchComponent = ({ data, label, value, onChange }) => {
//   const filteredData = data.filter(item => item.toLowerCase().includes(value.toLowerCase())).slice(0, 10);

//   return (
//     <View>
//       <TextInput
//         placeholder={`Search ${label}...`}
//         value={value}
//         onChangeText={onChange}
//         style={{ borderWidth: 1, padding: 10, margin: 10, borderRadius: 5 }}
//       />
//       <FlatList
//         data={filteredData}
//         keyExtractor={(item) => item}
//         renderItem={({ item }) => <Text style={{ padding: 5 }}>{item}</Text>}
//       />
//     </View>
//   );
// };

// const Sell = () => {
//   const [searchValues, setSearchValues] = useState({
//     industry: "",
//     category: "",
//     make: ""
//   });

//   const handleChange = (key, value) => {
//     setSearchValues(prev => ({ ...prev, [key]: value }));
//   };

//   return (
//     <View>
//       <SearchComponent
//         data={industries}
//         label="Industry"
//         value={searchValues.industry}
//         onChange={(value) => handleChange('industry', value)}
//       />
      
//       <SearchComponent
//         data={categories}
//         label="Category"
//         value={searchValues.category}
//         onChange={(value) => handleChange('category', value)}
//       />
      
//       <SearchComponent
//         data={makes}
//         label="Make"
//         value={searchValues.make}
//         onChange={(value) => handleChange('make', value)}
//       />
//     </View>
//   );
// };

// export default Sell;
