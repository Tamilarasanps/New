// import { View, Text, StyleSheet, Image, Animated } from "react-native";
// import React, { useEffect, useRef } from "react";

// export default function ImageSlider() {
//   const img = [
//     require("../../../assets/machine/cone.jpg"),
//     require("../../../assets/machine/lovepik.jpg"),
//     require("../../../assets/machine/fabric.png"),
//   ];

//   // Animated values for each image
//   const moveAnims = useRef(img.map(() => new Animated.Value(400))).current; // Start off-screen right

//   useEffect(() => {
//     const startAnimation = () => {
//       img.forEach((_, index) => {
//         setTimeout(() => {
//           Animated.timing(moveAnims[index], {
//             // Move to the left
//             duration: 2000,
//             useNativeDriver: true,
//           }).start(() => {
//             moveAnims[index].setValue(400); // Reset to right
//           });
//         }, index * 1000); // Delay each image slide
//       });
//     };

//     // Start the animation loop
//     const interval = setInterval(() => {
//       startAnimation();
//     }, img.length * 2000); // Restart animation after all images move

//     startAnimation(); // Start on mount

//     return () => clearInterval(interval); // Cleanup interval
//   }, []);
//   return (
//     <View className="">
//       <Text>ImageSlider</Text>
//       {/* Image Slideshow */}
//       <View>
//         {img.map((image, index) => (
//           <Animated.View
//             key={index}
//             style={[{ transform: [{ translateX: moveAnims[index] }] }]}
//           >
//             <Image source={image} style={styles.image} />
//           </Animated.View>
//         ))}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   image: {
//     width: 300,
//     height: 200,
//     borderRadius: 10,
//   },
// });

// import { View, Text, StyleSheet, Image, Animated } from "react-native";
// import React, { useEffect, useRef } from "react";

// export default function ImageSlider() {
//   const img = [
//     require("../../../assets/machine/cone.jpg"),
//     require("../../../assets/machine/lovepik.jpg"),
//     require("../../../assets/machine/fabric.png"),
//   ];

//   // Animated values for each image
//   const moveAnims = useRef(img.map(() => new Animated.Value(400))).current; // Start off-screen right

//   useEffect(() => {
//     const startAnimation = () => {
//       img.forEach((_, index) => {
//         setTimeout(() => {
//           Animated.timing(moveAnims[index], {
//             toValue: -300, // Move image to the left of the screen
//             duration: 2000,
//             useNativeDriver: true,
//           }).start(() => {
//             // After animation finishes, reset position to off-screen right
//             moveAnims[index].setValue(400);
//           });
//         }, index * 2000); // Delay each image's animation
//       });
//     };

//     // Start the animation loop
//     const interval = setInterval(() => {
//       startAnimation();
//     }, img.length * 3000); // Start over after all images move

//     startAnimation(); // Start on mount

//     return () => clearInterval(interval); // Cleanup interval
//   }, []);

//   return (
//     <View style={styles.wrapper}>
//       <Text style={styles.title}>ImageSlider</Text>
//       {/* Image Slideshow */}
//       <View style={styles.container}>
//         {img.map((image, index) => (
//           <Animated.View
//             key={index}
//             style={[
//               styles.imageContainer,
//               { transform: [{ translateX: moveAnims[index] }] },
//             ]}
//           >
//             <Image source={image} style={styles.image} />
//           </Animated.View>
//         ))}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   wrapper: {
//     alignItems: "center",
//     justifyContent: "center",
//     flex: 1,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   container: {
//     alignItems: "center",
//     backgroundColor: "#D9D9D9",
//     height: 200, // Give enough height for images to fit
//     width: "90%",
//     flexDirection: "row", // Ensure images are lined up horizontally
//     overflow: "hidden", // Hide images when off-screen
//   },
//   imageContainer: {
//     position: "absolute",
//   },

//   image: {
//     width: 300,
//     height: 200,
//     borderRadius: 10,
//   },
// });

// import { View, Text, StyleSheet, Image, Animated } from "react-native";
// import React, { useEffect, useRef } from "react";

// export default function ImageSlider() {
//   const img = [
//     require("../../../assets/machine/cone.jpg"),
//     require("../../../assets/machine/lovepik.jpg"),
//     require("../../../assets/machine/fabric.png"),
//   ];

//   // Animated values for each image (position off-screen initially)
//   const moveAnims = useRef(img.map(() => new Animated.Value(400))).current;

//   useEffect(() => {
//     // Function to animate the images one after another
//     const animateImages = () => {
//       const animations = img.map((_, index) => {
//         return Animated.timing(moveAnims[index], {
//           toValue: -300, // Move image off-screen left
//           duration: 2000, // Duration for each image to slide
//           useNativeDriver: true,
//         });
//       });

//       // Sequential animation: one after the other
//       const sequence = Animated.sequence(animations);

//       // Create a loop that repeats continuously without delay
//       Animated.loop(sequence).start();
//     };

//     animateImages(); // Start the animation loop

//     return () => {}; // Cleanup (if needed)
//   }, []);

//   return (
//     <View style={styles.wrapper}>
//       <Text style={styles.title}>ImageSlider</Text>
//       {/* Image Slideshow */}
//       <View style={styles.container}>
//         {img.map((image, index) => (
//           <Animated.View
//             key={index}
//             style={[
//               styles.imageContainer,
//               { transform: [{ translateX: moveAnims[index] }] },
//             ]}
//           >
//             <Image source={image} style={styles.image} />
//           </Animated.View>
//         ))}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   wrapper: {
//     alignItems: "center",
//     justifyContent: "center",
//     flex: 1,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   container: {
//     alignItems: "center",
//     backgroundColor: "#D9D9D9",
//     height: 200, // Height of the container
//     width: "90%",
//     flexDirection: "row", // Align images horizontally
//     overflow: "hidden", // Hide images when off-screen
//   },
//   imageContainer: {
//     position: "absolute",
//   },
//   image: {
//     width: 300,
//     height: 200,
//     borderRadius: 10,
//   },
// });

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Animated,
  Image,
  StyleSheet,
  Text,
  Platform,
} from "react-native";
import Header from "../(header)/Header";

const MovingImages = () => {
  // Array of images
  const images = [
    require("../../../assets/machine/fabric.png"),
    require("../../../assets/machine/circular.jpg"),
    require("../../../assets/machine/cone.jpg"),
  ];

  // State to keep track of the current image index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Create a reference for the animated value (for sliding images)
  const position = useRef(new Animated.Value(400)).current; // Start off-screen

  useEffect(() => {
    const slideShow = () => {
      // Slide the image in from the right (off-screen position 400)
      Animated.timing(position, {
        toValue: 0, // Move image to center (0 position)
        duration: 3000, // 1 second to slide in
        useNativeDriver: true,
      }).start(() => {
        // After the image has slid in, wait for 3 seconds and then slide it out
        setTimeout(() => {
          // Slide the image out to the left (position -400)
          Animated.timing(position, {
            // Move the image off-screen to the left
            duration: 3000, // 1 second to slide out
            useNativeDriver: true,
          }).start(() => {
            // After sliding out, move to the next image
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
          });
        }, 3000); // Show the image for 3 seconds before sliding out
      });
    };

    // Start the slideshow
    slideShow();
    const interval = setInterval(slideShow, 5000); // Run slideshow every 5 seconds

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, [position, images.length, currentIndex]);

  return (
    // <View style={styles.container} className="bg-red-500 ">
    //   <View className="bg-red-500 z-50  ">
    //
    //   </View>
    //   {/* Animated Image */}
    // </View>
    <View className="bg-white h-[300] relative flex items-center">
      {/* Header Section */}
      <View className="bg-TealGreen w-full h-[70%]">
        <Header />
      </View>

      {/* Image Container with Aspect Ratio 16:9 */}
      <View
        className="bg-gray-500 w-[90%] absolute bottom-0 items-center justify-center"
        style={{
          aspectRatio: 16 / 9, // Ensure aspect ratio is 16:9 for the container
          // height: Platform.OS === "ios" ? undefined : "56.25%", // Adjust for iOS specifically
          width: "90%",
        }}
      >
        {/* Animated Box for Image */}
        <Animated.View className="w-full h-full flex justify-center items-center overflow-hidden">
          <Image
            source={images[currentIndex]} // Use the current image based on the index
            className="w-full h-full rounded-md"
          />
        </Animated.View>
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   animatedBox: {
//     width: 350,
//     height: 200,
//     justifyContent: "center",
//     alignItems: "center",
//     overflow: "hidden",
//   },
//   image: {
//     width: 450,
//     height: 200,
//     marginBottom: 0,
//   },
// });

export default MovingImages;
