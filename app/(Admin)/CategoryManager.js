import React, { useEffect } from "react";
import { Platform, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OperationSwitcher from "./OperationSwitcher";
import { useState } from "react";
import CreateCategory from "./CreateCategory";
import SubCategoryDisplayer from "./SubCategoryDisplayer";
import Toast from "react-native-toast-message";
import axios from "axios";
import EditCategory from "./EditCategory";

const CategoryManager = () => {
  const [cat, setCat] = useState(["", []]);
  const [temp, setTemp] = useState("");
  const [tempMake, setTempMake] = useState([]);
  const [selected, setSelected] = useState("add");
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [popUp, setPopUp] = useState(false);
  const { width } = useWindowDimensions();
  const [selectedSub, setSelectedSub] = useState(0);


  console.log(cat+"kkkkkkk")
  const handleSubmit = async () => {
    if (cat[0].length <= 0) {
      return showToast("Industry name cannot be empty");
    } else if (cat[1].length <= 0) {
      return showToast("Category name cannot be empty");
    }
    const emptyCategory = cat[1].find((obj) =>
      Object.values(obj).some((arr) => Array.isArray(arr) && arr.length === 0)
    );

    if (emptyCategory) {
      return showToast(
        `${String(
          Object.keys(emptyCategory)
        ).toUpperCase()} is empty, Please add at least one make`
      );
    }

    try {
      const response = await axios.post(
        "http://192.168.1.5:5000/adminCategories",
        { cat },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200) {
        showToast(response.data.message);
        setCat(["", []]);
        console.log(response.data, "sent success");
      }
    } catch (error) {
      if (error.response?.data?.code === 409) {
        showToast("You have already entered this field!");
      } else {
      }
      console.log("Backend error:", error.response?.data);
    }
  };

  useEffect(() => {
    console.log(selected);
    if (selected === "edit" || (selected === "add" && selectedCategory.length > 0)) {
      console.log("driggered");
      getCategory();
    }
  }, [selected, selectedCategory]);

  const getCategory = async () => {
    console.log(selectedCategory);
    try {
      const response = await axios.get(
        `http://192.168.1.5:5000/adminCategories/getCategory/${selectedCategory}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        selectedCategory.length > 0
          ? setCat(() => {
              const updated = [...cat];
              updated[1] = Object.values(response.data.category);
              return updated;
            })
          : setCategoryList(response?.data?.category);
      }
    } catch (err) {
      showToast(err.message);
    }
  };
  console.log(categoryList);
  const showToast = (message, type = "error") => {
    Toast.show({
      type: type, // 'success' or 'error'
      text1: message,
      position: "top",
    });
  };

  useEffect(() => {
    setSelectedSub(() => cat[1].length - 1);
  }, [cat[1]]);

  const handleAddSubcategory = () => {
    setCat((prev) => [prev[0], [...prev[1], { [temp]: [] }]]);
    setTemp("");
    setPopUp(!popUp);
  };
  return (
    <SafeAreaView>
      {/* Toast */}
      <View className="z-50">
        <Toast />
      </View>

      <View className=" flex h-screen">
        {/* Swicher */}
        <View className="h-[10%] ">
          <OperationSwitcher selected={selected} setSelected={setSelected} setCat={setCat} setSelectedCategory={setSelectedCategory}/>
        </View>

        <View
          className={`${
            Platform.OS === "web" && width >= 1024
              ? "flex-row"
              : selected === "add"
              ? "flex-col max-h-[50%]"
              : ""
          } flex-1 flex gap-2 p-2 mt-8`}
        >
          {selected === "add" || (selected === "edit" && cat[0].length > 0) ? (
            <>
              <CreateCategory
                setCat={setCat}
                cat={cat}
                temp={temp}
                setTemp={setTemp}
                setPopUp={setPopUp}
                popUp={popUp}
                setSelectedSub={setSelectedSub}
                handleAddSubcategory={handleAddSubcategory}
                handleSubmit={handleSubmit}
              />
              <SubCategoryDisplayer
              setSelectedSub={setSelectedSub}
                cat={cat}
                tempMake={tempMake}
                setTempMake={setTempMake}
                setCat={setCat}
                showToast={showToast}
                popUp={popUp}
                setPopUp={setPopUp}
                selectedSub={selectedSub}
              />
            </>
          ) : (
            <EditCategory
              categoryList={categoryList}
              setCategoryList={setCategoryList}
              setCat={setCat}
              cat={cat}
              Toast={Toast}
              showToast={showToast}
              setSelected={setSelected}
              setSelectedCategory={setSelectedCategory}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CategoryManager;