import {
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  View,
  Platform,
} from "react-native";
import { FlatList } from "react-native";
import { useEffect, useState } from "react";

import React from "react";

function IndustyLineup({
  data,
  label,
  value,
  onChange,
  getCategory,
  getMakes,
  getSubCategory,
  handleChange,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [delayedFocus, setDelayedFocus] = useState(false);

  const filteredData =
    data?.length > 0
      ? data.filter((item) => item.toLowerCase().includes(value.toLowerCase()))
      : data;

  useEffect(() => {
    if (isFocused) {
      const timer = setTimeout(() => setDelayedFocus(true), 1000); // 1-second delay
      return () => clearTimeout(timer); // Clear timeout on unmount
    } else {
      setDelayedFocus(false);
    }
  }, [isFocused]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <View className="relative">
        <Text className="text-lg font-semibold text-teal-600 mt-6">
          {label}
        </Text>

        <View className="flex items-center">
          <TextInput
            className="border outline-teal-600 rounded-lg h-12 w-full mt-4 p-3 text-gray-500 focus:border-teal-600"
            placeholder={`Search ${label}...`}
            value={value}
            onFocus={() => {
              setIsFocused(true);
              if (label === "Category") getCategory();
              if (label === "SubCategory") getSubCategory();
              if (label === "Make") getMakes();
            }}
            // onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            onChangeText={onChange}
            style={{ borderWidth: 1, padding: 10, margin: 10, borderRadius: 5 }}
          />

          {delayedFocus && (
            <View
              className="absolute  mt-16 left-0 right-0  bg-red-500 order border-teal-500 rounded-md shadow-md"
              style={{ maxHeight: 200 }}
            >
              <FlatList
                data={filteredData}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => {
                      handleChange(label.toLowerCase(), item);
                      setTimeout(() => setIsFocused(false), 200);
                    }}
                  >
                    <Text className="p-3 text-gray-700">{item}</Text>
                  </Pressable>
                )}
                style={{ maxHeight: 200 }}
                nestedScrollEnabled
              />
            </View>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
export default IndustyLineup;
