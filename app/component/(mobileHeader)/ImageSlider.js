import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

const ImageSlider = ({
  images,
  onDelete,
  onChange,
  currentIndex,
  setCurrentIndex,
}) => {
  // If no images are available
  if (!images || images.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Please upload banners</Text>
      </View>
    );
  }

  // Navigation logic
  const goLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const goRight = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: `data:image/jpeg;base64,${images[currentIndex]?.bannerImages}`,
          }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Buttons inside image */}
        <View style={styles.buttonContainer}>
          {/* Optional Change button */}
          {/* <TouchableOpacity
            onPress={() => onChange(currentIndex)}
            style={styles.actionButton}
          >
            <Text style={styles.buttonText}>Change</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => onDelete(images[currentIndex]._id)}
            style={[styles.actionButton, { backgroundColor: "#ff4d4d" }]}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Arrow Controls */}
      <View style={styles.navigation}>
        <TouchableOpacity onPress={goLeft} disabled={currentIndex === 0}>
          <Text style={[styles.arrow, currentIndex === 0 && styles.disabled]}>
            ◀
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={goRight}
          disabled={currentIndex === images.length - 1}
        >
          <Text
            style={[
              styles.arrow,
              currentIndex === images.length - 1 && styles.disabled,
            ]}
          >
            ▶
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ImageSlider;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  imageContainer: {
    width: screenWidth * 0.9,
    aspectRatio: 16 / 9,
    position: "relative",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#ccc",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    backgroundColor: "#007AFF",
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: screenWidth * 0.6,
    marginTop: 10,
  },
  arrow: {
    fontSize: 30,
    color: "#000",
  },
  disabled: {
    color: "#aaa",
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  emptyText: {
    fontSize: 16,
    color: "gray",
    fontStyle: "italic",
  },
});
