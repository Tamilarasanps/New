import React, { useState } from "react";
import { View, Button, ImageBackground, StyleSheet } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import QRCode from "react-native-qrcode-svg";

const QR_SIZE = 450;

export default function App() {
  const [imageUri, setImageUri] = useState(null);

  const pickImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Upload Image" onPress={pickImage} />
      {imageUri && (
        <View style={styles.qrWrapper}>
          <ImageBackground
            source={{ uri: imageUri }}
            style={styles.background}
            imageStyle={{ borderRadius: 10 }}
          >
            {/* Lighter overlay so image is more visible */}
            <View style={styles.overlay} />
            <View style={styles.qrContainer}>
              <QRCode
                value="https://github.com/Tamilarasanps"
                size={QR_SIZE * 0.8}
                backgroundColor="transparent"
                color="rgba(3, 3, 100, 0.5)" // Fully visible black
              />
            </View>
          </ImageBackground>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  qrWrapper: {
    marginTop: 40,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 4,
  },
  background: {
    width: QR_SIZE,
    height: QR_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.1)" ,// More transparent overlay
    zIndex: 1,
  },
  qrContainer: {
    zIndex: 2,
  },
});

// import React, { useState } from "react";
// import { View, Button, Image, StyleSheet } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { Svg, Rect, Defs, Filter, FeColorMatrix } from "react-native-svg";

// export default function GrayscaleImage() {
//   const [imageUri, setImageUri] = useState(null);

//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImageUri(result.assets[0].uri);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Pick Image" onPress={pickImage} />
//       {imageUri && (
//         <View style={{ marginTop: 20 }}>
//           <Image source={{ uri: imageUri }} style={styles.image} />
//           <Svg height="0" width="0">
//             <Defs>
//               <Filter id="grayscale">
//                 <FeColorMatrix
//                   type="matrix"
//                   values="0.33 0.33 0.33 0 0
//                           0.33 0.33 0.33 0 0
//                           0.33 0.33 0.33 0 0
//                           0 0 0 1 0"
//                 />
//               </Filter>
//             </Defs>
//           </Svg>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   image: {
//     width: 300,
//     height: 300,
//     resizeMode: "cover",
//     filter: "url(#grayscale)", // This might not apply depending on platform
//   },
// });
