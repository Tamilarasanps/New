import React, { useState } from "react";
import { View, Text, Pressable, FlatList, Platform } from "react-native";
import { TextInput } from "react-native-paper";
import { FloatingLabelInput } from "react-native-floating-label-input";

import Mobile from "./Mobile"; // Correct import for Mobile component
import Email from "./Email"; // Correct import for Email component

const UsernameScreen = ({
  username,
  setUsername,
  mailOrphone,
  setMailOrphone,
  mobile,
  setMobile,
  selectedCode,
  setSelectedCode,
  phoneNumber,
  setPhoneNumber,
  dropdownVisible,
  setDropdownVisible,
  filteredCountries,
  searchQuery,
  setSearchQuery,
  formSubmit,
}) => {
  return (
    <View
      className={`${
        Platform.OS === "web" ? "w-[60%] h-[415px]" : "w-full mx-auto"
      } p-5 py-8`}
    >
      <Text className="text-2xl font-bold mx-auto text-TealGreen mb-10">
        Create Your Account
      </Text>
      {/* Username Input */}
      <View
        className={`bg-white h-[50] ${
          Platform.OS === "web" ? "w-[75%]" : "w-[90%]"
        } mx-auto`}
      >
        <TextInput
          label="Username"
          value={username}
          onChangeText={setUsername}
          mode="outlined"
          placeholderTextColor="#aaa"
          outlineColor="#2095A2"
          outlineStyle 
          activeOutlineColor="#2095A2"
          style={{
            fontSize : "",
            backgroundColor: "white",
            width: "100%",
            alignSelf: "center",
          }}
        />
      </View>
      {mobile ? (
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
          mailOrphone={mailOrphone}
          setMailOrphone={setMailOrphone}
        />
      ) : (
        <Email mailOrphone={mailOrphone} setMailOrphone={setMailOrphone} />
      )}

      <View
        className={`${
          Platform.OS === "web" ? "w-[75%]" : "w-[90%]"
        } mx-auto align-items-right mt-2`}
      >
        <Text
          className="text-blue-500 text-md font-semibold text-right mt-2 underline"
          onPress={() => setMobile(!mobile)}
        >
          {mobile ? "E-mail" : "Mobile Number"}
        </Text>
      </View>
      <Pressable
        onPress={() => {
          formSubmit({ username, mailOrphone });
        }}
        className="bg-TealGreen mb-4 py-4 px-4 h-max mt-10 w-24 mx-auto rounded-md"
      >
        <Text className="text-white m-auto">Next</Text>
      </Pressable>
      {/* <Text className="mx-auto text-TealGreen mt-4">Already have an account? <span className="underline text-red-500">Login</span></Text> */}
    </View>
  );
};

export default UsernameScreen;
