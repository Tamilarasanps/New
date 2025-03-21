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
import { FlatList } from "react-native";

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
import ImageAndVideo from "./ImageAndVideo";
export default function Sell() {
  const { width } = useWindowDimensions();
  const { getJsonApi } = useApi();

  const [industries, setIndustries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [makes, setMakes] = useState([]);
  const [price, setPrice] = useState("");
  const [priceType, setPriceType] = useState("");
  const [description, setDescription] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCode, setSelectedCode] = useState("+91");
  const [searchQuery, setSearchQuery] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState(["", ""]);
  const [condition,setCondition] = useState("")

  // filter mobile countries

  const cleanCountryName = (name) => name.replace(/\s*\(.*?\)/g, "").trim();

  const filteredCountries = allCountries
    .filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .map((c) => ({
      name: cleanCountryName(c.name),
      dialCode: c.dialCode,
      iso2: c.iso2,
    }));

  // search COmponenets
  const [searchValues, setSearchValues] = useState({
    industry: "",
    category: "",
    make: "",
  });

  // fetching industries
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

  // fetching categories

  const getCategory = async () => {
    try {
      if (searchValues.industry.length > 0) {
        const data = await getJsonApi(
          `CategoryPage/${searchValues.industry}/sell`
        );
        setCategories(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // fetching makes
  const getMakes = async () => {
    try {
      if (searchValues.category.length > 0) {
        const data = await getJsonApi(`CategoryPage/${searchValues.category}`);
        setMakes(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // setting searchValues
  const handleChange = (key, value) => {
    setSearchValues((prev) => ({ ...prev, [key]: value }));
  };
  console.log(searchValues.industry);

  // sending data to backend

  const sentData = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("industry", value);
    formData.append("category", subcato);
    formData.append("make", machineMake);
    formData.append("price", price);
    formData.append("negotiable", negotiable);
    formData.append("description", description);
    formData.append("location", location);

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
          {/* form header */}
          <Text className="text-3xl font-bold text-center text-teal-600">
            Upload Form
          </Text>

          {/* image field */}

          <ImageAndVideo />
          {/* industry, category and make */}

          <View>
            <SearchComponent
              data={industries}
              getCategory={getCategory}
              getMakes={getMakes}
              handleChange={handleChange}
              label="Industry"
              value={searchValues.industry}
              onChange={(value) => handleChange("industry", value)}
            />

            <SearchComponent
              data={categories}
              getCategory={getCategory}
              handleChange={handleChange}
              getMakes={getMakes}
              label="Category"
              value={searchValues.category}
              onChange={(value) => handleChange("category", value)}
            />

            <SearchComponent
              getCategory={getCategory}
              getMakes={getMakes}
              handleChange={handleChange}
              data={makes}
              label="Make"
              value={searchValues.make}
              onChange={(value) => handleChange("make", value)}
            />
          </View>

          {/* Radio Buttons for Condition */}

          <Text className="text-lg font-semibold text-teal-600 mt-6">
            Condition:
          </Text>
          <View className="flex flex-row gap-10 mt-4">
            {["Running", "Dismantled"].map((item) => (
              <Pressable
                key={item.id}
                onPress={() => setCondition(item)}
                className={`px-4 py-2 rounded-sm ${
                  condition === item
                    ? "bg-teal-600"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                <Text
                  className={`text-sm ${
                    condition === item ? "text-white" : "text-gray-600"
                  }`}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Price */}

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

          {/* machine condition */}
          <Text className="text-lg font-semibold text-teal-600 mt-6">
            Price Type:
          </Text>
          <View className="flex flex-row gap-10 mt-4">
            {["Negotiable", "Fixed"].map((item) => (
              <Pressable
                key={item.id}
                onPress={() => setPriceType(item)}
                className={`px-4 py-2 rounded-sm ${
                  priceType === item
                    ? "bg-teal-600"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                <Text
                  className={`text-sm ${
                    priceType === item ? "text-white" : "text-gray-600"
                  }`}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
          {/* description */}

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

          {/* mobile */}

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
// search components

const SearchComponent = ({
  data,
  label,
  value,
  onChange,
  getCategory,
  getMakes,
  handleChange,
}) => {
  const filteredData = data
    .filter((item) => item.toLowerCase().includes(value.toLowerCase()))
    .slice(0, 10);

  return (
    <View>
      <Text className="text-lg font-semibold text-teal-600 mt-6">{label}</Text>
      <TextInput
        className="border outline-teal-600 rounded-lg h-12 w-full mt-4 p-3 text-gray-500 focus:border-teal-600"
        placeholder={`Search ${label}...`}
        value={value}
        onFocus={() => {
          if (label === "Category") {
            getCategory();
          }
          if (label === "Make") {
            getMakes();
          }
        }}
        onChangeText={onChange}
        style={{ borderWidth: 1, padding: 10, margin: 10, borderRadius: 5 }}
      />
      {value.length > 0 && (
        <View className="w-full bg-white border border-gray-300 rounded-md shadow-md mt-2 z-10">
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  switch (label) {
                    case "Industry":
                      handleChange("industry", item);
                      break;
                    case "Category":
                      handleChange("category", item);
                      break;
                    case "Make":
                      handleChange("make", item);
                      break;
                    default:
                      break;
                  }
                }}
              >
                <Text style={{ padding: 5 }}>{item}</Text>
              </Pressable>
            )}
          />
        </View>
      )}
    </View>
  );
};
