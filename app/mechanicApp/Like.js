import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  return (
    <TouchableOpacity onPress={() => setLiked(!liked)} style={styles.icon}>
      <Icon
        name={liked ? "heart" : "heart-o"}
        size={30}
        color={liked ? "red" : "gray"}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    padding: 10,
  },
});

export default LikeButton;
