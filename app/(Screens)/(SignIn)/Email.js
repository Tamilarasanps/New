import React from "react";
import { View, Platform } from "react-native";
import { TextInput } from "react-native-paper";

const Email = ({ setMailOrphone, mobile, mailOrphone }) => {
  return (
    <View
      className={`bg-white h-[50] ${
        Platform.OS === "web" ? "w-[75%]" : "w-[90%]"
      } mx-auto mt-6`}
    >
      <TextInput
        label={mobile ? "Mobile" : "Email"}
        value={mailOrphone}
        onChangeText={setMailOrphone}
        mode="outlined"
        placeholderTextColor="#aaa"
        outlineColor="#2095A2"
        outlineStyle
        activeOutlineColor="#2095A2"
        style={{
          fontSize: "",
          backgroundColor: "white",
          width: "100%",
          alignSelf: "center",
        }}
      />
    </View>
  );
};

export default Email;
