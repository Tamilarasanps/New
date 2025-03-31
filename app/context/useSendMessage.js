import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useConversation from "../stateManagement/useConversation";
import axios from "axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();

  const sendMessages = async (message) => {
    if (!selectedConversation?._id) return;
    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("jwt"); // Retrieve token from AsyncStorage

      const res = await axios.post(
        `/api/message/send/${selectedConversation._id}`,
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage([...messages, res.data]);
    } catch (error) {
      console.log("Error in sending messages:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessages };
};

export default useSendMessage;
