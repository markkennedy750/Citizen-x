import React, { useRef, useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
  Pressable,
} from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera/legacy";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";

const CameraScreen = ({ route, navigation }) => {
  const { setPhotoUri, videoMedia, setVideoMedia } = route.params;
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.on);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const { width } = useWindowDimensions();
  const height = Math.round((width * 16) / 9);
  const cameraRef = useRef();

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const capturePhoto = async () => {
    try {
      let photo = await cameraRef.current.takePictureAsync();
      setPreviewVisible(true);
      setPhotoUri(photo);

      const { status } = await MediaLibrary.requestPermissionsAsync();

      const asset = await MediaLibrary.createAssetAsync(photo.uri);
      await MediaLibrary.createAlbumAsync("CitizenXProject", asset, false);
    } catch (error) {
      console.log(error);
    }
  };

  const recordMedia = async () => {
    try {
      setIsRecording(true);
      await Camera.requestMicrophonePermissionsAsync();
      let recording = await cameraRef.current.recordAsync();

      const asset = await MediaLibrary.createAssetAsync(recording.uri);
      await MediaLibrary.createAlbumAsync("CitizenXProject", asset, false);
      setVideoMedia(asset);
    } catch (error) {
      //Alert.alert(error.message);
      console.log(error.message);
    }
  };

  const handleFlashMode = () => {
    setFlashMode((current) => {
      if (current === FlashMode.on) {
        return FlashMode.off;
      } else if (current === FlashMode.off) {
        return FlashMode.auto;
      } else {
        return FlashMode.on;
      }
    });
  };

  const stopRecording = () => {
    cameraRef.current.stopRecording();
    setIsRecording(false);
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          You need permission to access the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handleFlashMode}
        style={[
          styles.flashButton,
          flashMode === FlashMode.off
            ? styles.flashButtonOff
            : styles.flashButtonOn,
        ]}
      >
        {flashMode === FlashMode.on ? (
          <Ionicons name="flash-sharp" size={30} color="black" />
        ) : (
          <Ionicons name="flash-off" size={30} color="black" />
        )}
      </Pressable>
      <Camera
        type={type}
        ratio="16:9"
        flashMode={flashMode}
        style={{ height: height }}
        ref={cameraRef}
        autoFocus={true}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={capturePhoto}>
            <Text style={styles.text}>Capture</Text>
          </TouchableOpacity>
          {isRecording ? (
            <TouchableOpacity style={styles.button} onPress={stopRecording}>
              <Text style={styles.text}>Stop recording</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={recordMedia}>
              <Text style={styles.text}>Take a record</Text>
            </TouchableOpacity>
          )}
        </View>
        <Pressable onPress={capturePhoto} style={styles.captureBtn}>
          <View style={styles.captureBtnInner} />
        </Pressable>
      </Camera>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000000",
  },
  captureBtn: {
    position: "absolute",
    left: "50%",
    width: 80,
    bottom: "10%",
    borderWidth: 4,
    borderColor: "#fff",
    height: 80,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateX: -50 }],
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    margin: 64,
    marginBottom: 40,
    padding: 10,
    borderRadius: 30,
    top: "150%",
  },
  button: {
    flex: 1,
    alignItems: "center",
    alignSelf: "flex-end",
  },
  captureBtnInner: {
    backgroundColor: "#fff",
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  flashButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    position: "absolute",
    zIndex: 200,
    top: "1%",
    right: "2%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  flashButtonOff: {
    backgroundColor: "#000",
  },
  flashButtonOn: {
    backgroundColor: "#C1C3C5",
  },
  text: {
    color: "black",
  },
});
