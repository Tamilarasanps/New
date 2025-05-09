import React from "react";
import { Platform, View, useWindowDimensions } from "react-native";
import ChatUser from "./ChatUser";
import Messages from "./Messages";

const Right = ({ setUserClick }) => {
  const { width } = useWindowDimensions();
  return (
    <View
      className={`h-screen ${width < 1024 ? "w-full" : "w-[70%]"}`}
      style={{
        width: Platform.OS !== "web" ? width : undefined, // Will apply full width dynamically
      }}
    >
      <ChatUser setUserClick={setUserClick} width={width} />
      <Messages />
    </View>
  );
};

export default Right;
