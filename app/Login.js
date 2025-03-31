import React, { useState } from "react";
import { View, Text, Pressable, Platform } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { allCountries } from "country-telephone-data";
import { useToast } from "react-native-toast-notifications";
import axios from "axios";
import Mobile from "./Mobile";
import Email from "./Email";
import useApi from "./hooks/useApi";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({}) => {
  const [mailOrphone, setMailOrphone] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [selectedCode, setSelectedCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { postJsonApi } = useApi();
  const router = useRouter();
  const toast = useToast();

  //cleaning country name
  const cleanCountryName = (name) => name.replace(/\s*\(.*?\)/g, "").trim();

  //fetching all countries list
  const filteredCountries = allCountries
    .filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .map((c) => ({
      name: cleanCountryName(c.name),
      dialCode: c.dialCode,
      iso2: c.iso2,
    }));

  //form submission

  const formSubmit = async () => {
    console.log("Form submission started");
    console.log(!mailOrphone || !password);

    //null check
    if (!mailOrphone || !password) {
      // toast.show("Please fill all fields", { type: "warning" });
      return;
    }

    try {
      // Dynamically generate the signup URL

      const response = await postJsonApi(`login`, {
        mailOrphone,
        password,
      });
      if (response && response.status === 200) {
        await AsyncStorage.setItem("userToken", response.data.token);
        router.back();
      }

      // axios.post(
      //   "http://192.168.1.11:5000/login",
      //   {
      //     mailOrphone,
      //     password,
      //   },
      //   {
      //     headers: { "Content-Type": "application/json" },
      //   }
      // );
    } catch (error) {
      console.error("Error during form submission:", error);
      // toast.show(
      //   error.response?.data?.message || "An unexpected error occurred.",
      //   { type: "danger" }
      // );
    }
  };

  return (
    <View className="h-screen w-screen justify-center align-items-center bg-gray-200 bg-blue-300">
      <View
        className={`bg-white ${
          Platform.OS === "web"
            ? "w-[50%] flex flex-row"
            : "w-[90%] flex flex-col gap-6 "
        } mx-auto shadow-[5] rounded-md`}
      >
        {/* welcome card */}
        {Platform.OS === "web" && (
          <View
            className={`bg-teal-600 w-[40%]            
            h-[415px] p-5 rounded-tl-md rounded-bl-md text-white`}
          >
            <View className="shadow-md  p-5 ">
              <Text className="text-2xl font-bold mt-5 ml-3 text-white  ">
                Log In
              </Text>
              <Text className="mt-8 text-base font-medium ml-3 leading-6 text-white">
                Get access to your{" "}
                <Text className="font-semibold mt-8  text-white">Orders,</Text>{" "}
                <Text className="font-semibold  text-white">Wishlist, and</Text>{" "}
                <Text className="font-semibold  text-white">
                  Recommendations.
                </Text>
              </Text>
            </View>
            <Pressable
              onPress={() => {
                router.push("/SignUp");
              }}
              className="w-[90%] flex justify-center items-center p-2 "
              style={{
                position: "absolute",
                bottom: 16,
              }}
            >
              <Text className="text-white font-semibold">
                New to Machine Market ?{" "}
                <span className="underline rounded-md text-white">SignUp</span>
              </Text>
            </Pressable>
          </View>
        )}
        <View
          className={`${
            Platform.OS === "web" ? "w-[60%] h-[415px]" : "w-full mx-auto"
          } p-5 py-8`}
        >
          <Text className="text-2xl font-bold mx-auto text-TealGreen mb-4">
            Log In to your account
          </Text>

          {/* Email/mobile Input */}

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

          {/* Password Input */}
          <View
            className={`bg-white h-[50] ${
              Platform.OS === "web" ? "w-[75%]" : "w-[90%]"
            } mx-auto mt-6`}
          >
            <FloatingLabelInput
              label="Password"
              value={password}
              staticLabel
              hintTextColor={"#aaa"}
              containerStyles={{
                borderWidth: 2,
                paddingHorizontal: 10,
                backgroundColor: "#fff",
                borderColor: "#2095A2",
                borderRadius: 8,
              }}
              customLabelStyles={{
                leftFocused: 10,
                colorFocused: "#5C6670",
                fontSizeFocused: 16,
              }}
              labelStyles={{
                backgroundColor: "#fff",
                paddingHorizontal: 5,
              }}
              inputStyles={{
                borderWidth: 0,
                outline: "none",
                color: "#5C6670",
                paddingHorizontal: 10,
              }}
              secureTextEntry={!isPasswordVisible}
              onChangeText={setPassword}
            />

            {/* Eye icon for password */}
            <Pressable
              onPress={() => setIsPasswordVisible((prev) => !prev)}
              style={{ position: "absolute", right: 10, top: 12 }}
            >
              <Icon
                name={isPasswordVisible ? "eye" : "eye-slash"}
                size={20}
                color="#5C6670"
              />
            </Pressable>
          </View>

          {/*email/mobile switch*/}
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

          {/*Login button*/}
          <Pressable
            onPress={() => {
              formSubmit();
            }}
            className="bg-TealGreen mb-4 py-4 px-4 h-max mt-10 w-24 mx-auto rounded-md"
          >
            <Text className="text-white m-auto">Log In</Text>
          </Pressable>
          {/* <Text className="mx-auto text-TealGreen mt-4">Already have an account? <span className="underline text-red-500">Login</span></Text> */}
        </View>
      </View>
    </View>
  );
};

export default Login;
