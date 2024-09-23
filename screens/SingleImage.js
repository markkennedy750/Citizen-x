import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const SingleImage = ({ route }) => {
  const { imageUrl } = route.params; // Get the image URL passed from the previous screen

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.fullImage} />
    </View>
  );
};

export default SingleImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: screenWidth,
    height: screenHeight,
    resizeMode: "contain",
  },
});
