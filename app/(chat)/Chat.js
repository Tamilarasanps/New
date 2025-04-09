import React, { useContext, useEffect, useState } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Left from "./leftPart/Left";
import Right from "./RightPart/Right";
import Logout from "./left1/Logout";
import { AuthContext } from "@/app/context/AuthProvider";

const ChatPage = () => {
  const [authUser, setAuthUser] = useContext(AuthContext);
  const navigation = useNavigation();
  const [userClick, setUserClick] = useState(false);
  const { width } = useWindowDimensions(); // Corrected usage

  // useEffect(() => {
  //   if (!authUser) {
  //     navigation.navigate("Login");
  //   }
  // }, [authUser]);

  // if (!authUser) return null;

  return (
    <View className="flex flex-row h-screen w-screen">
      <Left width={width} userClick={userClick} setUserClick={setUserClick} />
      <Right width={width} setUserClick={setUserClick} userClick={userClick} />
      {/* <Logout /> */}
    </View>
  );
};

export default ChatPage;
