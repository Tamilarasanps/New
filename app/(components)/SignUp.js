import React, { useState, useRef } from "react";
import { useRouter } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import { Link } from "expo-router";
import { KeyboardAvoidingView } from "react-native";
import {
  View,
  Text,
  Pressable,
  TextInput,
  FlatList,
  Platform,
} from "react-native";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { allCountries } from "country-telephone-data";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const SignUp = () => {
  const [mailOrphone, setMailOrphone] = useState("");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState(false);
  const [selectedCode, setSelectedCode] = useState("+91"); // Default to India
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const toast = useToast();
  const router = useRouter();

  const cleanCountryName = (name) => name.replace(/\s*\(.*?\)/g, "").trim();

  // When mapping country data
  const filteredCountries = allCountries
    .filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .map((c) => ({
      name: cleanCountryName(c.name), // Cleans localized names
      dialCode: c.dialCode,
      iso2: c.iso2,
    }));

    

  const formSubmit = async () => {
    if (!username || !mailOrphone) {
      toast.show("please fill all fields", {
        type: "danger",
        duration: 2000,
        placement: "top",
      });
      return;
    }

    try {
      // Using the URI variable
      const response = await axios.post(
        `http://192.168.1.11:4000/signup`,
        {
          username,
          mailOrphone,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        router.push({
          pathname: "/(components)/OtpScreen",
          query: { mailOrphone: mailOrphone },
        });
      }
    } catch (error) {
      console.log(error)
      toast.show(`${error.response.data?.message}`, {
        type: "warning",
        duration: 2000,
        placement: "top",
      });
    }
  };

  const mutation = useMutation({
    mutationfn: formSubmit,
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-200 justify-center items-center"
    >
      <View className="h-screen w-screen justify-center align-items-center bg-gray-200">
        <View
          className={`bg-white  ${
            Platform.OS === "web"
              ? "w-[50%] flex flex-row"
              : "w-[90%] flex flex-col gap-6 "
          } mx-auto shadow-[5] rounded-md`}
        >
          {Platform.OS === "web" && (
            <View className="bg-teal-600 w-[40%] p-5 rounded-tl-md rounded-bl-md text-white">
              <Text className="text-2xl font-bold mt-5 ml-3 text-white shadow-md p-5 ">
                SignUp
                <Text className="mt-4 text-base font-medium ml-3 leading-6">
                  <br></br>
                  Get access to your{" "}
                  <span className="font-semibold">Orders</span>,{" "}
                  <span className="font-semibold">Wishlist</span>, and{" "}
                  <span className="font-semibold">Recommendations</span>.
                </Text>
              </Text>
            </View>
          )}
          <View
            className={`${
              Platform.OS === "web" ? "w-[60%]" : "w-full mx-auto"
            }   p-5 py-8 `}
          >
            <Text className="text-2xl font-bold mx-auto text-TealGreen mb-10">
              Create Your Account
            </Text>
            {/* Username Input */}
            <View
              className={`bg-white h-[50] ${
                Platform.OS === "web" ? "w-[75%]" : "w-[90%]"
              }  mx-auto`}
            >
              <FloatingLabelInput
                label="Username"
                value={username}
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
                onChangeText={setUsername}
              />
            </View>
            {mobile ? (
              <View
                className={`border-2 border-TealGreen ${
                  Platform.OS === "web" ? "w-[75%]" : "w-[90%]"
                } rounded-md mx-auto mt-6`}
              >
                <View className="flex-row items-center h-[50] bg-white justify-center align-items-center rounded-md px-3 py-2">
                  <Pressable
                    className="p-2 min-h-[40px] my-auto mt-1"
                    onPress={() => setDropdownVisible(!dropdownVisible)}
                  >
                    <Text className="font-bold text-gray-500">
                      {selectedCode} ▼
                    </Text>
                  </Pressable>
                  <TextInput
                    className="bg-white flex-1 text-gray-700 text-md px-3 py-2"
                    placeholder="Enter phone number"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                  />
                </View>

                {/* Dropdown Country List */}
                {dropdownVisible && (
                  <View className="border border-teal-500 bg-white mt-2 rounded-md max-h-[250px] top-[50] right-0 left-0 absolute  overflow-hidden shadow-lg z-50">
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
            ) : (
              <View
                className={`bg-white h-[50] ${
                  Platform.OS === "web" ? "w-[75%]" : "w-[90%]"
                }    mx-auto mt-6`}
              >
                <FloatingLabelInput
                  label={mobile ? "Mobile" : "Email"}
                  value={mailOrphone.toLowerCase()}
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
                    fontSizeFocused: 12,
                  }}
                  labelStyles={{
                    backgroundColor: "#fff",
                    paddingHorizontal: 5,
                  }}
                  inputStyles={{
                    outline: "none",
                    color: "#5C6670",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                  }}
                  onChangeText={setMailOrphone}
                />
              </View>
            )}

            {/* Mobile or Email Input */}

            <View
              className={` ${
                Platform.OS === "web" ? "w-[75%]" : "w-[90%]"
              } mx-auto align-items-right mt-2 `}
            >
              <Text
                className="text-blue-500 text-md font-bold text-right mt-2 mr-2 underline"
                onPress={() => setMobile(!mobile)}
              >
                {mobile ? "e-mail" : "Mobile Number"}
              </Text>
            </View>
            {/* Submit Button */}
            <Pressable
              onPress={formSubmit}
              className="bg-TealGreen mb-8 py-4 px-4  h-max mt-10 w-24 mx-auto rounded-md"
            >
              <Text className="text-white  m-auto">Next</Text>
            </Pressable>
            <Text className=" text-red-500 text-center">
              Already have an account?{" "}
              <Link href={"/Login"}>
                <Text className="underline">Log In</Text>
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
