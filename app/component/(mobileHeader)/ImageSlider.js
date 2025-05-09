import React, { useEffect, useRef, useState } from "react";
import { View, Animated, Image } from "react-native";

export default ImageSlider = () => {
  // Array of images
  const images = [
    require("../../assests/machine/fabric.png"),
    require("../../assests/machine/circular.jpg"),
    require("../../assests/machine/cone.jpg"),
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.Value(400)).current;

  useEffect(() => {
    const slideShow = () => {
      Animated.timing(position, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(position, {
            duration: 3000,
            useNativeDriver: true,
          }).start(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images?.length);
          });
        }, 3000);
      });
    };
    slideShow();
    const interval = setInterval(slideShow, 5000);
    return () => clearInterval(interval);
  }, [position, images?.length, currentIndex]);

  return (
    <>
      <View className="bg-red-600 h-[300px] relative flex items-center justify-center ">
        <View className="bg-purple-500 w-full h-[50%]" />
        <View
          className="bg-gray-900 w-[90%] absolute  items-center "
          style={{
            aspectRatio: 16 / 9,
            zIndex: 10,
          }}
        >
          <Animated.View className="w-full h-full flex justify-center items-center overflow-hidden">
            <Image
              source={images[currentIndex]}
              className="w-full h-full rounded-md"
            />
          </Animated.View>
        </View>
        <View className="bg-yellow-500 w-full h-[50%] " />
      </View>
    </>
  );
};
