import { View, Text, Pressable } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";
import { responsiveFontSize } from "react-native-responsive-dimensions";
export default function Contact() {
  return (
    <View className="bg-gray-200 mt-">
      <Text className="text-2xl font-bold flex justify-center items-center mt-8 mb-8 text-TealGreen" style={{fontSize:responsiveFontSize(1.5)}}>
      Ask Us Anything – We’ve Got You!
      </Text> 
      <View className="items-center">
        <TextInput
          label="Enter your mail"
          mode="outlined"
          outlineColor="teal"
          activeOutlineColor="teal"
          style={{ width: "80%" }}
        />
        <TextInput
          label="Descrption"
          mode="outlined"
          outlineColor="teal"
          activeOutlineColor="teal"
          multiline
          numberOfLines={6}
          style={{ width: "80%", marginTop: 20 }}
        />
      </View>
      <View className="items-center">
        <Pressable className="bg-TealGreen mt-8 px-4 py-2 rounded-lg mb-8">
          <Text className="text-white text-lg font-semibold">
            Send a Message
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
