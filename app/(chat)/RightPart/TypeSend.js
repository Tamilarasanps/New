import React, { useState } from "react";
import { View, TextInput, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import useApi from "@/app/hooks/useApi";
import useConversation from "@/app/stateManagement/useConversation";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TypeSend = () => {
  const [msg, setMsg] = useState("");
  const {selectedConversation} = useConversation()

  const {postJsonApi} = useApi()

  const postMsg = async()=>{
    try{
      const token = await AsyncStorage.getItem("userToken"); 
      const data = await postJsonApi(`message/send/${selectedConversation}`,{message : msg},token)
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <View className="w-[90%] mx-auto h-16 mb-4 px-4 flex-row items-center bg-white rounded-full">
      <TextInput
        value={msg}
        className="flex-1 px-4 h-full outline-none"
        placeholder="Type a message..."
        onChangeText={setMsg}
      />
      <Pressable className="px-2" onPress={()=>postMsg()}>
        <MaterialIcons name="send" size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default TypeSend;
