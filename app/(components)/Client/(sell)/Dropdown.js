import axios from "axios";
import { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  Dimensions,
} from "react-native";
import { IconButton } from "react-native-paper";

export default function Dropdown() {
  const { width } = Dimensions.get("window");

  const [cat, setCat] = useState({});
  const [tempText, setTempText] = useState({
    category: "",
    subCategory: "",
    maker: "",
  });

  // Step 1: Add Category
  const handleAddCategory = () => {
    
const { width } = Dimensions.get("window");

    if (!tempText.category.trim()) return;
    setCat((prev) => ({
      ...prev,
      [tempText.category]: prev[tempText.category] || {},
    }));
  };

  // Step 2: Add Subcategory
  const handleAddSubcategory = () => {
    if (!tempText.category.trim() || !tempText.subCategory.trim()) return;
    setCat((prev) => ({
      ...prev,
      [tempText.category]: {
        ...prev[tempText.category],
        [tempText.subCategory]:
          prev[tempText.category]?.[tempText.subCategory] || [],
      },
    }));
  };

  // Step 3: Add Maker
  const handleAddMakers = () => {
    if (
      !tempText.category.trim() ||
      !tempText.subCategory.trim() ||
      !tempText.maker.trim()
    )
      return;
    setCat((prev) => ({
      ...prev,
      [tempText.category]: {
        ...prev[tempText.category],
        [tempText.subCategory]: [
          ...(prev[tempText.category]?.[tempText.subCategory] || []),
          tempText.maker,
        ],
      },
    }));
  };

  // Step 4: Delete Maker
  const handleDeleteMaker = (category, subCategory, index) => {
    setCat((prev) => {
      const newCat = { ...prev };
      newCat[category][subCategory].splice(index, 1);
      if (newCat[category][subCategory].length === 0) {
        delete newCat[category][subCategory];
      }
      if (Object.keys(newCat[category]).length === 0) {
        delete newCat[category];
      }
      return newCat;
    });
  };

  // Step 5: Send data to backend
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.5:5000/adminCategories",
        cat,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert("Data sent successfully!");
      console.log(response.data, "sent success");
    } catch (error) {
      alert("Error, failed to send data");
      console.log("error", error);
    }
  };

  return (
    <View className="flex flex-col md:flex-row w-full min-h-screen p-5 space-y-5 md:space-y-0 md:space-x-5">
      {/* Left Panel (Form Input) */}
      <View className="bg-blue-500 p-5 flex-1 rounded-lg shadow-md">
        <Text className="text-white text-lg font-bold mb-3">Add Details</Text>

        <TextInput
          placeholder="Enter Category Name"
          value={tempText.category}
          onChangeText={(text) => setTempText({ ...tempText, category: text })}
          className="border border-gray-300 p-2 rounded mb-3 w-full bg-white"
        />
        <Button title="Add Category" onPress={handleAddCategory} />

        <TextInput
          placeholder="Enter Subcategory Name"
          value={tempText.subCategory}
          onChangeText={(text) =>
            setTempText({ ...tempText, subCategory: text })
          }
          className="border border-gray-300 p-2 rounded mb-3 w-full bg-white"
        />
        <Button title="Add Subcategory" onPress={handleAddSubcategory} />

        <TextInput
          placeholder="Enter Maker Name"
          value={tempText.maker}
          onChangeText={(text) => setTempText({ ...tempText, maker: text })}
          className="border border-gray-300 p-2 rounded mb-3 w-full bg-white"
        />
        <Button title="Add Maker" onPress={handleAddMakers} />

        <Button
          title="Send Data to Backend"
          onPress={handleSubmit}
          color="green"
          className="mt-3"
        />
      </View>

      {/* Right Panel (Data Display) */}
      <View className="bg-green-500 p-5 flex-1 rounded-lg shadow-md">
        <Text className="text-white text-lg font-bold mb-3">Categories</Text>

        {Object.keys(cat).length === 0 ? (
          <Text className="text-white">No categories added</Text>
        ) : (
          <FlatList
            className="w-full"
            data={Object.entries(cat)}
            keyExtractor={(item) => item[0]}
            renderItem={({ item }) => (
              <View className="bg-white shadow-md rounded-lg p-4 mb-3">
                <Text className="text-lg font-bold text-gray-900">
                  Category: {item[0]}
                </Text>

                {Object.keys(item[1]).length === 0 ? (
                  <Text className="text-gray-600">No subcategories</Text>
                ) : (
                  Object.entries(item[1]).map(([sub, makers]) => (
                    <View key={sub} className="ml-4 mt-2">
                      <Text className="text-md font-semibold text-gray-700">
                        Subcategory: {sub}
                      </Text>

                      {makers.length === 0 ? (
                        <Text className="text-gray-500 ml-2">No makers</Text>
                      ) : (
                        makers.map((maker, index) => (
                          <View
                            key={index}
                            className="flex-row items-center ml-3"
                          >
                            <Text className="text-gray-600">- {maker}</Text>
                            <IconButton
                              icon="delete"
                              size={20}
                              color="red"
                              onPress={() =>
                                handleDeleteMaker(item[0], sub, index)
                              }
                            />
                          </View>
                        ))
                      )}
                    </View>
                  ))
                )}
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}
