import React from "react";
import { View } from "react-native";
import ChatUser from "./ChatUser";
import Messages from "./Messages";

const Right = ({width,setUserClick}) => {
  return (
    <View className={`h-screen ${width<1024 ?  "w-full" : "w-[70%]"}`} >
      <ChatUser setUserClick={setUserClick} width={width}/>
      <Messages />
    </View>
  );
};

export default Right;
