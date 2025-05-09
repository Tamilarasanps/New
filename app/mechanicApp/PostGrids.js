import React from "react";
import {
  View,
  Image,
  FlatList,
  Pressable,
  Text,
  ActivityIndicator,
} from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";

const PostGrid = ({ posts, onPostPress, width }) => {
  // console.log("posts :", posts)
  if (!posts) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 40,
        }}
      >
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={{ marginTop: 10, fontSize: 16, color: "#555" }}>
          Loading posts...
        </Text>
      </View>
    );
  }

  if (posts.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text className="text-lg font-semibold mt-24">No posts available</Text>
      </View>
    );
  }
  return (
    <View
      className={`flex flex-row flex-wrap p-4 ${width >= 1024 ? "px-8" : ""}`}
    >
      {posts.map((item, index) => {
        const isVideo = item.media.length === 24; // assume 24-character ID = video

        return (
          <Pressable
            key={item._id}
            onPress={() => onPostPress(index)}
            style={{
              width: width >= 1024 ? "25%" : "33.33%",
              aspectRatio: 1,
              padding: 1,
            }}
          >
            {isVideo ? (
              <View>
                <VideoGridItem
                  videoId={item.media}
                  onPostPress={onPostPress}
                  index={index}
                />
              </View>
            ) : (
              <View>
                <Image
                  source={{ uri: `data:image/jpeg;base64,${item.media}` }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
};

const VideoGridItem = ({ videoId, onPostPress, index }) => {
  const player = useVideoPlayer(
    `http://192.168.1.5:5000/video/${videoId}`,
    (player) => {
      player.loop = true;
      player.play();
    }
  );

  return (
    <Pressable
      onPress={() => onPostPress(index)}
      className="flex justify-center items-center h-full w-full"
    >
      <View>
        <VideoView
          player={player}
          style={{ width: "100%", height: "100%" }}
          controls={false}
          allowsFullscreen={false}
          allowsPictureInPicture={false}
          resizeMode="cover"
        />
      </View>
    </Pressable>
  );
};

export default PostGrid;
