import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "react-native";
import CustomImageSlider from "../components/CustomImageSlider";
import { COLORS } from "../constants";

const ImageScreen = ({ navigation, route }) => {
  const { images } = route.params;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.goBackBtn}
      >
        <AntDesign name="arrowleft" size={27} color={COLORS.white} />
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
