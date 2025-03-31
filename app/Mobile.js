import React from "react";
import { View,Platform,Pressable,TextInput,Text } from "react-native";
import { FlatList } from "react-native";

const Mobile = ({
  dropdownVisible,
  setDropdownVisible,
  selectedCode,
  setSelectedCode,
  phoneNumber,
  setPhoneNumber,
  searchQuery,
  setSearchQuery,
  filteredCountries,
}) => {
  return (
    <View
      className={`border-2 border-TealGreen ${
        Platform.OS === "web" ? "w-[75%]" : "w-[90%]"
      } rounded-md mx-auto mt-6 z-50`}
    >
      <View className="flex-row items-center h-[50] bg-white justify-center align-items-center rounded-md px-3 py-2">
        <Pressable
          className="p-2 min-h-[40px] my-auto mt-1"
          onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <Text className="font-bold text-gray-500">{selectedCode} ▼</Text>
        </Pressable>
        <TextInput
          className="bg-white flex-1 text-gray-700 text-md px-3 py-2 outline-none"
          placeholder="Enter phone number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      {/* Dropdown Country List */}
      {dropdownVisible && (
        <View className="border border-teal-500 bg-white mt-2 rounded-md max-h-[250px] top-[50] right-0 left-0 absolute overflow-hidden shadow-lg z-50">
          <TextInput
            className="border-b border-teal-500 p-3"
            placeholder="Search country..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <FlatList
            data={filteredCountries}
            keyExtractor={(item) => item.iso2}
            renderItem={({ item }) => (
              <Pressable
                className="p-3"
                onPress={() => {
                  setSelectedCode(`+${item.dialCode}`);
                  setDropdownVisible(false);
                }}
              >
                <Text className="text-[16px] text-gray-600">
                  {item.name} ({item.dialCode})
                </Text>
              </Pressable>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default Mobile;
