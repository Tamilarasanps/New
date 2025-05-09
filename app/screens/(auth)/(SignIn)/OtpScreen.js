import React, { useEffect, useRef } from "react";
import { useSearchParams } from "expo-router/build/hooks";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Pressable,
} from "react-native";

const OtpScreen = ({ mailOrphone, otp, setOtp, formSubmit, setStep }) => {
  console.log(otp, "otp");

  const inputs = useRef([]);

  const handleChange = (text, index) => {
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    console.log("new", newOtp);

    // Move to next input automatically
    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (text, index) => {
    if (!text && index > 0) {
      // Clear the value in the current field
      let newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      // Move focus to the previous input
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View
      className={`${
        Platform.OS === "web" ? "w-[60%] h-[415px]" : "w-full"
      } flex flex-col gap-8 p- items-center bg-white rounded-md m-auto p-5 py-8`}
    >
      <Text className="text-2xl font-bold mx-auto text-TealGreen ">
        Enter Your OTP
      </Text>
      <View className="flex-row gap-4 mt-10 mx-auto">
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputs.current[index] = el)}
            className="w-12 h-12 text-center border-2 border-gray-300 rounded-md text-xl text-black outline-TealGreen"
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) =>
              nativeEvent.key === "Backspace"
                ? handleBackspace("", index)
                : null
            }
          />
        ))}
      </View>

      {/* Verify OTP Button */}
      <TouchableOpacity className="bg-TealGreen rounded-sm mt-4 w-24 py-2 mx-auto">
        <Text
          className="text-white text-center"
          onPress={() => formSubmit({ mailOrphone, otp })}
        >
          Verify OTP
        </Text>
      </TouchableOpacity>

      {/* Resend OTP */}
      <Pressable
        className="mt-4 mx-auto"
        onPress={() => {
          setStep(4);
        }}
      >
        <Text className="text-blue-500 mx-auto underline">Resend OTP</Text>
      </Pressable>
    </View>
  );
};

export default OtpScreen;
