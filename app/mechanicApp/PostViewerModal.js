import {
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  View,
  Modal,
  SafeAreaView,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import profile from "../assests/machine/profile.jpg";
import { BlurView } from "expo-blur";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";
import { useRef, useEffect, useState } from "react";
import CommentModal from "./CommentModal";
import { useSocketContext } from "../context/SocketContext";
import Entypo from "@expo/vector-icons/Entypo";
import { useCallback } from "react";
import { useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PostViewerModal = ({
  posts,
  activeIndex,
  onClose,
  userProfile,
  width,
  handleLike,
  setPosts,
  handlePostComment,
  comments,
  setComments,
  comment,
  setComment,
  fetchComments,
  deleteApi,
}) => {
  if (activeIndex === null) return null;

  const scrollRef = useRef(null);
  const postOffsets = useRef([]);
  const [isLayoutDone, setIsLayoutDone] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const { socket } = useSocketContext();
  const [showDelete, setShowDelete] = useState("");

  const navigation = useNavigation();

  async function deletePostLogic(postId) {
  const token = await AsyncStorage.getItem("userToken");
  console.log("token :", token)

    try {
      const response = await deleteApi(`mechanicList/deletePosts`, {"postId" :postId}, token);
      console.log("response :", response)
      if (response.status === 200) {
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      }
    } catch (error) {
      console.error(error.message, "error");
  // }
}

  const handleDeletePost = useCallback(function (postId) {
    try {
      deletePostLogic(postId);
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  }, []);
  useEffect(() => {
    const handleLikeUpdate = async (data) => {
      try {
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            console.log("socket");
            if (post._id.toString() === data.postId.toString()) {
              return {
                ...post,
                likes: data.likes,
              };
            }
            return post;
          })
        );
      } catch (error) {
        console.log("Error playing notification sound:", error);
      }
    };
    if (socket) {
      console.log;
      socket.on("like-updated", handleLikeUpdate);
    }

    return () => {
      if (socket) {
        socket.off("like-updated", handleLikeUpdate);
      }
    };
  }, [socket]);

  useEffect(() => {
    // console.log("jjjkkkkkkk");
    if (scrollRef.current && isLayoutDone && activeIndex !== null) {
      const targetY = postOffsets.current[activeIndex] || 0;
      // Delay scroll to allow for layout update
      setTimeout(() => {
        scrollRef.current.scrollTo({ y: targetY, animated: false });
      }, 100); // Adjust timeout duration if needed
    }
  }, [activeIndex, isLayoutDone]);

  // console.log("posts 120:", posts);

  return (
    <Modal visible={true} transparent={true} animationType="fade">
      <BlurView
        intensity={50}
        tint="light"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <SafeAreaView style={{ width: "100%" }}>
          {/* Back Icon */}
          <View
            className="  bg-gray-300 z-50 flex justify-center"
            style={{ width: "100%", height: "48" }}
          >
            <Pressable
              onPress={onClose}
              className="flex-row items-center h-12 px-4"
            >
              <Icon name="arrow-left" size={24} color="white" />
              {/* <Text className="text-white font-semibold ml-2">Back</Text> */}
            </Pressable>
          </View>
        </SafeAreaView>

        <ScrollView
          ref={scrollRef}
          scrollEventThrottle={16}
          style={{
            backgroundColor: "#ffffff",
            flex: 1,
            width: width >= 1024 ? 500 : "100%",
            alignSelf: "center",
          }}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {posts?.map((post, index) => {
            const videoSource = `http://192.168.1.5:5000/video/${post.media}`;
            const player = useVideoPlayer(videoSource, (player) => {
              player.loop = true;
              player.play();
            });

            const { isPlaying } = useEvent(player, "playingChange", {
              isPlaying: player.playing,
            });

            return (
              <View
                key={post._id}
                onLayout={(event) => {
                  const { y } = event.nativeEvent.layout;
                  postOffsets.current[index] = y;
                  if (index === posts.length - 1) {
                    // Set layout done once last post layout is measured
                    setIsLayoutDone(true);
                  }
                }}
                style={{
                  width: "100%",
                  marginBottom: 8,
                }}
              >
                {/* Header */}
                <View
                  className="overflow-hidden py-4"
                  style={{
                    width: "100%",
                    backgroundColor: "white",
                    zIndex: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 16,
                  }}
                >
                  <Image
                    source={{
                      uri: `data:image/jpeg;base64,${userProfile?.profileImage}`,
                    }}
                    style={{
                      height: 56,
                      width: 56,
                      borderRadius: 9999,
                      resizeMode: "cover",
                      marginRight: 12,
                    }}
                  />
                  <Text
                    style={{
                      color: "black",
                      fontWeight: "600",
                      fontSize: 16,
                    }}
                  >
                    {userProfile?.username}
                  </Text>
                  <Pressable
                    onPress={() => setShowDelete(() => post._id)}
                    style={{ position: "absolute", right: 8 }}
                  >
                    <Entypo
                      name="dots-three-vertical"
                      size={24}
                      color="black"
                    />
                  </Pressable>

                  {showDelete === post._id && (
                    <Pressable
                      onPress={() => {
                        handleDeletePost(post._id);
                      }}
                      style={{
                        position: "absolute",
                        top: 60,
                        right: 8,
                        backgroundColor: "#f8d7da",
                        padding: 8,
                        borderRadius: 4,
                        elevation: 5,
                      }}
                    >
                      <Text style={{ color: "red", fontWeight: "bold" }}>
                        Delete
                      </Text>
                    </Pressable>
                  )}
                </View>

                {/* Content */}
                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Media Container */}
                  <View
                    style={{
                      width: "100%",
                      aspectRatio: 1,
                      backgroundColor: "#f0f0f0",
                      justifyContent: "center",
                      alignItems: "center",
                      marginVertical: 8,
                    }}
                  >
                    {post.media.length === 24 ? (
                      <TouchableOpacity
                        onPress={() => {
                          if (isPlaying) {
                            player.pause();
                          } else {
                            player.play();
                          }
                        }}
                      >
                        <VideoView
                          style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: "contain",
                          }}
                          player={player}
                          allowsFullscreen={false}
                          allowsPictureInPicture={false}
                          controls={false}
                        />
                      </TouchableOpacity>
                    ) : (
                      <Image
                        source={{
                          uri: `data:image/jpeg;base64,${post.media}`,
                        }}
                        style={{
                          width: "100%",
                          height: "100%",
                          resizeMode: "contain",
                        }}
                      />
                      // <View className="bg-red-600"></View>
                    )}
                  </View>

                  <View
                    style={{
                      width: "100%",
                      padding: 12,
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", gap: 16 }}
                      className="items-center "
                    >
                      <>
                        {post.likes.includes(post.userId) ? (
                          <TouchableOpacity
                            onPress={() => handleLike(post._id)}
                          >
                            <FontAwesome name="heart" size={24} color="red" />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => handleLike(post._id)}
                          >
                            <Feather name="heart" size={24} color="black" />
                          </TouchableOpacity>
                        )}
                        <Text>{post?.likes.length}</Text>
                      </>
                      <>
                        <Icon
                          onPress={() => {
                            fetchComments(post._id);
                            setSelectedPost(post._id);
                            setCommentModal(true);
                          }}
                          name="message-circle"
                          size={24}
                          color="TealGreen"
                          className="cursor-pointer"
                        />
                        <Text>{post?.comments.length}</Text>
                      </>

                      <Icon
                        name="send"
                        size={24}
                        color="TealGreen"
                        className="cursor-pointer"
                      />
                    </View>
                    <Text
                      style={{ color: "black", marginTop: 16, marginLeft: 8 }}
                    >
                      {post.bio}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
          {/* {commentModal && (
            <CommentModal
              onClose={() => setCommentModal(false)}
              handlePostComment={handlePostComment}
              comments={comments}
              setComments={setComments}
              comment={comment}
              setComment={setComment}
              selectedPost={selectedPost}
            />
          )} */}
        </ScrollView>
      </BlurView>
    </Modal>
  );
};

export default PostViewerModal;
