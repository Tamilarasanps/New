import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "expo-router/build/hooks";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import {
  QueryClientProvider,
  QueryClient,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { useToast } from "react-native-toast-notifications";

const OtpScreen = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef([]);
  const router = useRouter();
  const toast = useToast();
  const { mobileOrEmail } = useSearchParams();
  const queryClient = new QueryClient();


  const sendOtp = async () => {
    const response = await axios.post(
      "http://192.168.1.11:4000/signup/otpcheck",
      {
        mobileOrEmail,
        otp,
      }
    );
    if (response.status === 200) router.push("/Homepage");
    if (response.status !== 200) {
      throw new Error("failed to fetch data");
    }
    return response;
  };
  const mutation = useMutation({
    mutationfn: sendOtp,
    onSuccess: (data) => {
      console.log("Form submitted successfully:", data);
      toast.show("OTP verified successfully!", { type: "success" });
      router.push("/Homepage");
    },
    onError: (error) => {
      console.error("Error submitting form:", error);
      toast.show("Failed to verify OTP!", { type: "danger" });
    },
  });

  //   console.log(data)
  const handleChange = (text, index) => {
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to next input automatically
    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (text, index) => {
    if (!text && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <View className="flex flex-col gap-8 align-items-center mt-8 ">
        <Text className="text-lg mx-auto ">Enter OTP</Text>
        <View className="flex-row gap-4 mt-4 mx-auto">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              className="w-12 h-12 text-center border-2 border-gray-300 rounded-md text-xl text-black"
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
            onPress={() => mutation.mutate({ mobileOrEmail, otp })}
          >
            Verify OTP
          </Text>
        </TouchableOpacity>

        {/* Resend OTP */}
        <TouchableOpacity className="mt-4 mx-auto">
          <Text className="text-blue-500 mx-auto">Resend OTP</Text>
        </TouchableOpacity>
      </View>
    </QueryClientProvider>
  );
};

export default OtpScreen;
