import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import * as Camera from "expo-camera";

const CameraScreen = ({ route, navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const cameraRef = useRef(null);
  const requestCameraPermissions = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera permissions to use this feature.");
    }
  };
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting camera permissions...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No camera permissions granted.</Text>;
  }
  return (
    <View>
      <Text>CameraScreen</Text>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({});
