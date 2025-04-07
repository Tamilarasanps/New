import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable } from "react-native";
import { useToast } from "react-native-toast-notifications";
import axios from "axios";
import { allCountries } from "country-telephone-data";
import UsernameScreen from "./UsernameScreen";
import { View, Text } from "react-native";
import OtpScreen from "./OtpScreen";
import Password from "./Password";
import { router } from "expo-router";
import useApi from "../hooks/useApi";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [mailOrphone, setMailOrphone] = useState("");
  const [mobile, setMobile] = useState(false);
  const [selectedCode, setSelectedCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmPass] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const { postJsonApi } = useApi();

  let api_Data;

  const toast = useToast();

  const cleanCountryName = (name) => name.replace(/\s*\(.*?\)/g, "").trim();

  const filteredCountries = allCountries
    .filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .map((c) => ({
      name: cleanCountryName(c.name),
      dialCode: c.dialCode,
      iso2: c.iso2,
    }));

  const getSignupUrl = (step) => {
    if (step === 2) {
      return "signup/otpcheck";
    } else if (step === 3) {
      return "signup/register";
    } else if (step === 4) {
      return "signup/resendotp";
    }
    return "signup"; // Default case when no step matches
  };

  switch (true) {
    case step === 1:
      api_Data = { mailOrphone, username };
      break;

    case step === 2:
      api_Data = { mailOrphone, otp: otp.join("") };
      break;

    case step === 3:
      api_Data = { mailOrphone, password, confirmpass };
      break;

    case step === 4:
      api_Data = { mailOrphone };
      break;

    default:
      console.log("Invalid step");
  }

  const formSubmit = async () => {
    console.log("Form submission started");

    // Validate form fields based on the step
    if (
      step === 1
        ? !username || !mailOrphone
        : step === 3
        ? !password || !confirmpass
        : step === 2
        ? !otp || !mailOrphone
        : ""
    ) {
      console.log(step);
      // toast.show("Please fill all fields", { type: "danger" });
      return;
    }
    console.log(step);

    try {
      // Dynamically generate the signup URL

      const response = await postJsonApi(getSignupUrl(step), api_Data);
      console.log("Response received:", response);

      if (response && response.status === 200) {
        // if (step == 2) {
        //   toast.show("OTP verified successfully!", { type: "success" });
        // }
        if (step == 3) {
          setUsername("");
          setMailOrphone("");
          setOtp("");
          setPassword("");
          setConfirmPass("");
          // toast.show("Registration successfully!", { type: "success" });
        }
        if (step !== (3 || 4)) {
          setStep((prevStep) => prevStep + 1);
        }
        if (step === 4) {
          setStep(2);
        }
      }
    } catch (error) {
      console.error("Error during form submission:", error);

      // Handle specific error scenarios
      if (error.response?.status === 401) {
        toast.show("Invalid OTP. Please try again.", { type: "warning" });
      } else if (error.response?.status === 500) {
        toast.show("Server error. Please try again later.", { type: "danger" });
      } else {
        toast.show(
          error.response?.data?.message || "An unexpected error occurred.",
          { type: "danger" }
        );
      }
    }
  };

  if (step === 4) {
    formSubmit(mailOrphone);
    setStep(2);
  }

  return (
    <View className="h-screen w-screen justify-center align-items-center bg-gray-200 bg-blue-300">
      <View
        className={`bg-white ${
          Platform.OS === "web"
            ? "w-[50%] flex flex-row"
            : "w-[90%] flex flex-col gap-6 "
        } mx-auto shadow-[5] rounded-md`}
      >
        {Platform.OS === "web" && (
          <View
            className={`bg-teal-600 w-[40%] ${
              step === 1 ? "h-[415px]" : "h-[415px]"
            } p-5 rounded-tl-md rounded-bl-md text-white`}
          >
            <View className="shadow-md  p-5 ">
              <Text className="text-2xl font-bold mt-5 ml-3 text-white  ">
                SignUp
              </Text>
              <Text className="mt-8 text-base font-medium ml-3 leading-6 text-white">
                Get access to your{" "}
                <Text className="font-semibold mt-8  text-white">Orders,</Text>{" "}
                <Text className="font-semibold  text-white">Wishlist, and</Text>{" "}
                <Text className="font-semibold  text-white">
                  Recommendations.
                </Text>
              </Text>
              {/* <View className="bg-white justify-center align-items-center shadow-sm rounded-sm mt-4">
                  <Text className="mx-auto text-TealGreen p-2 mt-4">
                    Already have an account?{" "}
                    <span className="underline rounded-md text-red-500">
                      Login
                    </span>
                  </Text>
                </View> */}
            </View>
            <Pressable
              onPress={() => {
                router.push("/Login");
              }}
              className="w-[90%] flex justify-center items-center p-2 "
              style={{
                position: "absolute",
                bottom: 16,
              }}
            >
              <Text className="text-white font-semibold">
                Already have an account?{" "}
                <span className="underline rounded-md text-white">Login</span>
              </Text>
            </Pressable>
          </View>
        )}
        {step === 1 && (
          <UsernameScreen
            username={username}
            setUsername={setUsername}
            mailOrphone={mailOrphone}
            setMailOrphone={setMailOrphone}
            mobile={mobile}
            setMobile={setMobile}
            selectedCode={selectedCode}
            setSelectedCode={setSelectedCode}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            dropdownVisible={dropdownVisible}
            setDropdownVisible={setDropdownVisible}
            filteredCountries={filteredCountries}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            formSubmit={formSubmit}
          />
        )}
        {step === 2 && (
          <OtpScreen
            otp={otp}
            setOtp={setOtp}
            formSubmit={formSubmit}
            setStep={setStep}
          />
        )}
        {step === 3 && (
          <Password
            password={password}
            confirmpass={confirmpass}
            setPassword={setPassword}
            setConfirmPass={setConfirmPass}
            formSubmit={formSubmit}
            buttonLabel="Register"
            mailOrphone={mailOrphone}
          />
        )}
      </View>
    </View>
  );
};

export default SignUp;
