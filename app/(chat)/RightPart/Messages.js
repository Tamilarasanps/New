import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { View } from "react-native";
import Message from "./Message";
import TypeSend from "./TypeSend";

const Messages = () => {
  return (
    <View className="bg-yellow-500 h-[85%] w-full">
      <ScrollView>
        <Message />
      </ScrollView>
      <View>
        <TypeSend/>
      </View>
    </View>
  );
};

export default Messages;
