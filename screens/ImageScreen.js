import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { StatusBar } from "react-native";
import CustomImageSlider from "../components/CustomImageSlider";
import { COLORS, icons } from "../constants";

const ImageScreen = ({ navigation, route }) => {
  const { images } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.goBackBtn}
      >
        <Image
          source={icons.arrowleft}
          style={{ width: 20, height: 20, tintColor: "black" }}
        />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <CustomImageSlider images={images} />
      </View>
    </View>
  );
};

export default ImageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 45,
    backgroundColor: "white",
    backgroundColor: COLORS.black,
  },
  goBackBtn: {
    alignSelf: "flex-start",
    marginLeft: 12,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.black,
  },
});
