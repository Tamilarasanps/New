import { View } from "react-native";
import { TextInput } from "react-native-paper";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function MObileHeader() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View className="bg-TealGreen">
      <View className="mt-8 mb-12 w-[90%] self-center">
        <TextInput
          style={{ borderRadius: 60 }}
          mode="outlined"
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
          activeOutlineColor="gray"
          outlineColor="gray"
          left={
            <TextInput.Icon
              icon={() => <Icon name="search" size={24} color="gray" />}
            />
          }
        />
      </View>
    </View>
  );
}
