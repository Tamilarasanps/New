import React, { useState } from "react";
import { View, Button, Alert, Text, TouchableOpacity } from "react-native";
import { FloatingLabelInput } from "react-native-floating-label-input";
import axios from "axios";

const SignUp = () => {
  const [mobileOrEmail, setMobileOrEmail] = useState(null);
  const [username, setUsername] = useState(null);

  const formSubmit = async () => {
    console.log("Form submission started...");
    console.log(!mobileOrEmail);
    if (!username || !mobileOrEmail) {
      return alert("Please fill all fields");
      // return(Alert("Please fill all fields"))
    }

    try {
      // Using the URI variable
      const response = await axios.post(`http://192.168.1.11:5000/signup`, {
        username,
        mobileOrEmail,
      });
      if (response.status === 200) {
        console.log("Success:", response.data); // Handle success, e.g., store token or navigate
        // You can store the response data in the state or navigate to another screen
      }
    } catch (error) {
      // Handling errors
      if (error.response) {
        // Server responded with an error
        console.error("Server Error:", error.response.data); // Get the error message from the response body
        alert(`Error: ${error.response.data.message}`); // Display server error
      } else if (error.request) {
        // No response from server
        console.error("No response from server:", error.request);
        alert("No response from server, please try again later.");
      } else {
        // Error in setting up the request
        console.error("Error", error.message);
        // alert(`Request Error: ${error.message}`);
      }
    }
  };

  return (
    <View className="h-screen w-screen align-items-center">
      {/* <Text style={{ fontSize: 24, marginBottom: 32, textAlign: "center" }}>
        Let's start {"\n"} Your Business Journey
      </Text> */}


      <Text className="text-2xl mb-8 mx-auto text-TealGreen mt-16">Create Your Account</Text>

      {/* Username Input */}
      <View className="bg-white h-[60] w-[90%] mx-auto mt-10 ">
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
            colorFocused: "#5C6670",
            fontSizeFocused: 16,
          }}
          labelStyles={{
            backgroundColor: "#fff",
            paddingHorizontal: 5,
          }}
          inputStyles={{
            color: "blue",
            paddingHorizontal: 10,
          }}
          onChangeText={setUsername}
        />
      </View>

      {/* Mobile or Email Input */}
      <View className="bg-white h-[60] w-[90%] mx-auto mt-10">
        <FloatingLabelInput
          label="Mobile or E-mail"
          value={mobileOrEmail}
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
            colorFocused: "#5C6670",
            fontSizeFocused: 12,
          }}
          labelStyles={{
            backgroundColor: "#fff",
            paddingHorizontal: 5,
          }}
          inputStyles={{
            color: "blue",
            paddingHorizontal: 10,
          }}
          onChangeText={setMobileOrEmail}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity className="bg-TealGreen py-4 px-4 w-max h-max mt-10 w-24 mx-auto rounded-md">
        <Text className="text-white m-auto">Next</Text>
      </TouchableOpacity>
      <Text className="mt-8 mb-8 mx-auto text-red-500">Already have an account? LogIn</Text>

    </View>
  );
};

export default SignUp;
