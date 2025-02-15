import { View, Text, SafeAreaView } from "react-native";
import { FloatingLabelInput } from "react-native-floating-label-input";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  const [mailnum,setMailNum] = useState();
  const [password,setPassword] = useState();

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-4">
      {/* Card Wrapper */}
      <View className="bg-white w-96 p-6 rounded-lg shadow-lg">
        <Text
          className="text-2xl font-bold text-center mb-4"
          style={{ color: "#2095A2" }}
        >
          Welcome to Login Page
        </Text>

        {/* Email Input */}
        <View className="mb-4">
          <FloatingLabelInput
            label="Email Or Mobile"
            value={mailnum}
            onChangeText={setMailNum}
            className="outline-none border-transparent text-black"
          />
        </View>

        {/* Password Input */}
        <View className="mb-4">
          <FloatingLabelInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            className="outline-none border-transparent text-black"
          />
        </View>

        {/* Login Button */}
        <View className="w-full items-center mt-4">
          <TouchableOpacity
            onPress={() => router.push("/components/SignUp")}
            className="bg-[#2095A2] rounded-lg w-80 py-3 items-center"
          >
            <Text className="text-white text-xl font-bold">Login</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-1 flex-row justify-around items-center p-4">
          <View>
            <Text className="mt-4 text-black">New to GetnGo?</Text>
          </View>
          <View>
            <Text className="mt-4 text-red-500">Create An Account</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
