import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  useWindowDimensions,
} from "react-native";
import { Video } from "expo-av"; // Importing from expo-av
import { Ionicons } from "@expo/vector-icons"; // For Play icon
import { getThumbnailAsync } from "expo-video-thumbnails"; // Importing from expo-video-thumbnails
import useApi from "@/app/hooks/useApi"; // Assuming you have this API hook for fetching data

const VideoComponent = ({ id }) => {
  const [product, setProduct] = useState({});
  const { getJsonApi } = useApi();
  const [videoUri, setVideoUri] = useState(null);
  const [thumbnailUri, setThumbnailUri] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { width } = useWindowDimensions();
  const screen = width < 768;

  // Fetch product details

  useEffect(() => {
    if (!id) {
      console.log("ID is still undefined");
      return;
    }

    // console.log("Calling fetchProduct with ID:", id);
    fetchProduct();
  }, [id]);

  
  const fetchProduct = async () => {
    try {
      const response = await getJsonApi(`productDetails/${id}`);
      // console.log("Raw API response:", response);

      const productData = response?.data?.[0];
      if (!productData) {
        console.warn("No product found for ID:", id);
      }

      setProduct(productData || {});

      if (productData?.machineVideos) {
        const videoUri = `http://192.168.1.6:5000/video/${productData.machineVideos}`;

        // console.log("Video URI:", videoUri);
        setVideoUri(videoUri);
        await generateThumbnail(videoUri);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const generateThumbnail = async (uri) => {
    try {
      const { uri: thumbnail } = await getThumbnailAsync(uri, {
        time: 1000, // Generate thumbnail at 1 second
      });
      console.log("Generated Thumbnail URI:", thumbnail); // Log the generated thumbnail URI
      setThumbnailUri(thumbnail);
    } catch (error) {
      console.error("Error generating thumbnail:", error);
    }
  };

  const handleThumbnailClick = () => {
    setIsPlaying(true); // Start playing when thumbnail is clicked
  };

  return (
    <View style={styles.contentContainer}>
      {videoUri ? (
        isPlaying ? (
          <Video
            source={{ uri: videoUri }}
            style={[styles.video, { marginTop: screen ? -110 : 260 }]}
            shouldPlay={isPlaying}
            useNativeControls
            resizeMode="contain"
          />
        ) : (
          <>
            {thumbnailUri ? (
              <Image source={{ uri: thumbnailUri }} style={styles.thumbnail} />
            ) : (
              <Text style={{ marginTop: -10 }}>Loading Thumbnail...</Text>
            )}
            <TouchableOpacity onPress={handleThumbnailClick}>
              <View style={styles.playIconWrapper}>
                <Ionicons name="play-circle" size={60} color="red" />
              </View>
            </TouchableOpacity>
          </>
        )
      ) : (
        ""
      )}
      <View style={styles.controlsContainer}>
        {/* You can add play/pause controls here if you want */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
    marginTop: 100,
  },
  video: {
    width: 130,
    height: 460,
    // marginLeft: -30,
  },
  controlsContainer: {
    padding: 10,
  },
  thumbnail: {
    width: 130, // Make sure thumbnail has width
    height: 460, // Make sure thumbnail has height
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    overflow: "hidden",
  },
  playIconWrapper: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2, // Border around the icon
    borderColor: "black", // Black border color
    borderRadius: 10, // Makes the border round around the play icon
    padding: 10,
    height: 80,
    marginTop: -101,
    marginLeft: -20, // Padding to create space around the icon inside the border
  },
});

export default VideoComponent;
