import { StyleSheet, Text, View } from "react-native";
import React from "react";

const CameraScreen = ({ route, navigation }) => {
  const { setPhotoUri, videoMedia, setVideoMedia } = route.params;
  return (
    <View>
      <Text>CameraScreen</Text>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({});
