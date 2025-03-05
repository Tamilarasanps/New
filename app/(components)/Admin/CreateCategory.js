import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Pressable,
  Platform,
} from "react-native";
import { TextInput } from "react-native-paper";

import SubCategoryList from "./SubCategoryList";
import { useWindowDimensions } from "react-native";

const createCategory = ({
  setCat,
  cat,
  temp,
  setTemp,
  setPopUp,
  setSelectedSub,
  popUp,
  handleSubmit,
  handleAddSubcategory,
}) => {
  const { width } = useWindowDimensions();
  console.log(cat[0])
  return (
    <View
      className={`${
        Platform.OS !== "web" ? "max-h-fit" : "flex-1"
      } bg-white shadow-sm  rounded-md px-6 py-8`}
    >
      {/* <View> */}
      <TextInput
        label="Enter Category Name"
        mode="outlined"
        value={cat[0]}
        onChangeText={(text) => {
          setCat((prev) => [text, prev[1]]);
        }}
        style={{ marginBottom: 12, backgroundColor: "white" }}
      />

      <TextInput
        label="Enter Subcategory Name"
        mode="outlined"
        value={temp}
        onChangeText={(text) => setTemp(text)}
        style={{
          marginBottom: 12,
          marginTop: 16,
          backgroundColor: "white",
        }}
      />
      <Pressable
        onPress={handleAddSubcategory}
        className="bg-teal-600 rounded-md p-4 mt-4"
      >
        <Text className="text-white text-center">Add SubCategory</Text>
      </Pressable>
      <ScrollView className="mt-4 " showsVerticalScrollIndicator={false} >
        {Platform.OS !== "web" && width < 1024 && (
          
          <SubCategoryList
            cat={cat}
            setPopUp={setPopUp}
            popUp={popUp}
            setSelectedSub={setSelectedSub}
          />
        )}

        <Pressable
          onPress={() => {
            handleSubmit();
          }}
          className="bg-teal-600 mt-8 px-4 py-6 rounded-md mb-4"
        >
          <Text className="text-white text-center font-bold">Submit</Text>
        </Pressable>
        {/* </View> */}
      </ScrollView>
    </View>
  );
};

export default createCategory;
