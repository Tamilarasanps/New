import { View, Text, Pressable, Image, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import React, { useEffect, useState } from "react";
import Header from "../(header)/Header";
import All from "../(frontPage)/All";
import Footer from "../(frontPage)/Footer";
import { router } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useApi from "@/app/hooks/useApi";
import Icon from "react-native-vector-icons/FontAwesome6";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Mobile from "@/app/Mobile";
import { allCountries } from "country-telephone-data";
import Password from "../(SignIn)/Password";

export default function Profile() {
  const [userProfile, setUserProfile] = useState(null);
  const [userProfileImage, setUserProfileImage] = useState(null);
  const [updateInput, setUpdateInput] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [resetPass, setResetPass] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmPass] = useState("");

  const [selectedCode, setSelectedCode] = useState("+91");
  const [searchQuery, setSearchQuery] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const { getJsonApi, postJsonApi } = useApi();

  // filter mobile countries

  const cleanCountryName = (name) => name.replace(/\s*\(.*?\)/g, "").trim();

  const filteredCountries = allCountries
    .filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .map((c) => ({
      name: cleanCountryName(c.name),
      dialCode: c.dialCode,
      iso2: c.iso2,
    }));

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please allow access to your gallery."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [1, 1], // Square crop
      quality: 1,
    });

    if (!result.canceled) {
      // const updateProfileImage = async () => {
      try {
        // const response = await axios.get("http://192.168.1.6:5000/signup");
        const token = await AsyncStorage.getItem("userToken");
        const formdata = new FormData();
        console.log(result);
        result.assets.forEach((asset) => {
          formdata.append("images", asset.file);
        });

        const response = await postJsonApi(
          `profile/updateProfileImage`,
          formdata,
          token
        );
        setUserProfileImage(result.assets[0].uri);

        // setUserProfile(response.data);
      } catch (error) {
        console.error(error.message, "error");
      }
      // };
    }
  };

  // // api
  useEffect(() => {
    const userData = async () => {
      try {
        // const response = await axios.get("http://192.168.1.6:5000/signup");
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          router.push("/Login");
        }
        const response = await getJsonApi(`profile`, token);
        setUserProfile(response.data);
        setPhoneNumber(response.data.mobile);
        setEmail(response.data.email);
        setUsername(response.data.username);
        setUserProfileImage(
          `data:image/png;base64,${response.data.profileImage?.[0]?.machineImages}`
        );
      } catch (error) {
        console.error(error.message, "error");
      }
    };

    userData();
  }, []);

  //details update

  const update = async () => {
    try {
      // const response = await axios.get("http://192.168.1.6:5000/signup");
      const token = await AsyncStorage.getItem("userToken");

      const response = await postJsonApi(
        `profile/update`,
        {
          username: username,
          mobile: phoneNumber,
          email: email,
        },
        token
      );
      setUserProfile(response.data);
    } catch (error) {
      console.error(error.message, "error");
    }
  };
  const passwordReset = async () => {
    if (password !== confirmpass) alert("password should not match");
    try {
      // const response = await axios.get("http://192.168.1.6:5000/signup");
      const token = await AsyncStorage.getItem("userToken");
      const response = await postJsonApi(
        `profile/passwordReset`,
        { password: password },
        token
      );
    } catch (error) {
      console.error(error.message, "error");
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      console.log("Logged out successfully");
      //   alert("You have been logged out");
      // Use navigation.replace to go to the Login screen
      router.push("/(Screens)/(frontPage)/HomePage");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Failed to logout. Please try again.");
    }
  };
  return (
    <ScrollView>
      <View className="bg-red-100">
        <Header />
        <All />

        {/* Profile Picture Section */}
      </View>
      <View className="flex-1 items-center h-[500px]" style={{ zIndex: -1 }}>
        <View className="items-center mt-10" style={{ position: "relative" }}>
          <View
            className="bg-TealGreen items-center justify-center"
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              overflow: "hidden", // Ensures circular shape
            }}
          >
            <View
              className="justify-center items-center"
              style={{ width: "100%", height: "100%" }}
            >
              {userProfileImage ? (
                <Image
                source={{ uri: userProfileImage }}
                className="w-full h-full rounded-full"
               
              />
              
              ) : (
                <FontAwesome name="user" size={100} color="white" />
              )}
            </View>
          </View>

          {/* Edit Icon */}
          <View
            className="bg-white items-center justify-center"
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              position: "absolute",
              bottom: 10,
              right: 10,
              elevation: 5, // Shadow effect for better visibility
            }}
          >
            <Pressable onPress={selectImage}>
              <MaterialIcons name="edit" size={24} color="teal" />
            </Pressable>
          </View>
        </View>
      </View>

      {/* User Details */}
      <View className="items-center justify-center mt-6 mb-10">
        <Text className="text-TealGreen font-bold text-2xl">
          {userProfile?.username}
        </Text>
      </View>

      {/* Contact Info */}
      <View className="items-center mt-6">
        <View className="flex flex-row items-center gap-2 w-[300px] justify-center">
          <Icon name="phone-volume" size={20} color="teal" />
          <Text className="font-bold text-lg text-TealGreen flex-1 text-center ">
            {userProfile?.mobile || "Update your mobile"}
          </Text>
        </View>
        <View className="w-[300px] h-1 bg-TealGreen mt-3"></View>
      </View>

      <View className="items-center mt-6">
        <View className="flex flex-row items-center gap-2 w-[300px] justify-center">
          <MaterialCommunityIcons name="email" size={24} color="teal" />
          <Text className="font-bold text-lg text-TealGreen flex-1 text-center ">
            {userProfile?.email || "Update your email"}
          </Text>
        </View>
        <View className="w-[300px] h-1 bg-TealGreen mt-3"></View>
      </View>

      {/* Buttons */}
      <View className="flex flex-row justify-center gap-10 mt-10">
        <Pressable
          className="bg-TealGreen h-10 w-[100] items-center justify-center rounded-sm"
          onPress={handleLogout}
        >
          <Text className="text-white text-lg font-semibold">Log Out</Text>
        </Pressable>
        <Pressable
          className="bg-TealGreen h-10 w-[100] items-center justify-center rounded-sm"
          onPress={() => setUpdateInput(true)}
        >
          <Text className="text-white text-lg font-semibold">Update</Text>
        </Pressable>
      </View>

      {/* Update Input Section */}
      {updateInput && (
        <View className="items-center ">
          <View
            className="bg-white  flex-1   w-[500px] p-5 itmes-center justify-center"
            style={{ marginTop: -500 }}
          >
            {/* Close Button */}
            {/* Close Button */}
            <Pressable
              onPress={() => setUpdateInput(false)}
              className="absolute h-10 w-10 justify-center items-center top-2 right-2 bg-gray-200 p-2 rounded-full"
            >
              <Text className="text-lg font-bold text-gray-600">✕</Text>
            </Pressable>
            <View className="items-center">
              <TextInput
                label="UserName"
                value={username}
                onChangeText={setUsername}
                mode="outlined"
                theme={{ colors: { primary: "teal" } }}
                style={{
                  height: "50px",
                  width: 350,
                  backgroundColor: "white",
                  marginBottom: 10,
                }}
              />
              <TextInput
                label="E-mail"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                keyboardType="email-address"
                theme={{ colors: { primary: "teal" } }}
                style={{
                  height: "50px",
                  width: 350,
                  backgroundColor: "white",
                  marginBottom: 10,
                  marginTop: 20,
                }}
              />
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

              <View className="flex flex-row gap-4">
                <Pressable
                  onPress={() => setResetPass(true)}
                  className="my-5 bg-TealGreen h-10 items-center justify-center w-[150px] mt-12 rounded-sm"
                >
                  <Text className="text-lg font-bold text-white">
                    reset Password
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => update()}
                  className="my-5 bg-TealGreen h-10 items-center justify-center w-[150px] mt-12 rounded-sm"
                >
                  <Text className="text-lg font-bold text-white">Update</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      )}
      {resetPass && (
        <View className="items-center justify-center flex">
          <View
            className="bg-white flex-1 w-[600px] p-5 items-center justify-center relative"
            style={{ marginTop: -500 }}
          >
            {/* Close Button */}
            <Pressable
              onPress={() => setResetPass(false)}
              className="absolute h-10 w-10 justify-center items-center top-2 right-2 bg-gray-200 p-2 rounded-full"
            >
              <Text className="text-lg font-bold text-gray-600">✕</Text>
            </Pressable>

            {/* Password Reset Form */}
            <Password
              password={password}
              confirmpass={confirmpass}
              setPassword={setPassword}
              setConfirmPass={setConfirmPass}
              formSubmit={passwordReset}
              buttonLabel="Reset Password"
              headerLabel="Reset Password"
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
}
