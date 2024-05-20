import { Text, View, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import TextIconButton from "./TextIconButton";
import { COLORS, SIZES, icons } from "../constants";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Audio } from "expo-av";

export default function CameraVideoMedia({
  setAlbums,
  setStoredRecording,
  setPhotoUri,
}) {
  //const [albums, setAlbums] = useState(null);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [recording, setRecording] = useState();
  //const [storedRecording, setStoredRecording] = useState(null);
  const [audioPermissionResponse, audioRequestPermission] =
    Audio.usePermissions();
  const [hasPermission, setHasPermission] = useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    if (!permissionResponse) {
      requestPermission();
    }
  }, []);

  async function getAlbums() {
    if (!permissionResponse || permissionResponse.status !== "granted") {
      Alert.alert(
        "Citizen X Permission",
        "This app requires permission to access media files"
      );
      return;
    }
    const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true,
    });
    setAlbums(fetchedAlbums);
  }

  async function takePicture() {
    if (!hasPermission) {
      // Camera permissions are still loading.
      return <Text>Loading...</Text>;
    }
    if (!hasPermission.granted) {
      // Camera permissions are not granted yet.
      return Alert.alert(
        "Citizen X Permission",
        "This App requires permission to access camera",
        [
          {
            text: "Cancel",
            onPress: () => {},
            style: "cancel",
          },
          {
            text: "Grant permission",
            onPress: async () => await requestPermission(),
          },
        ],
        { cancelable: true }
      );
    }
    const { uri } = await cameraRef.takePictureAsync();
    setPhotoUri(uri);
  }

  //Audio Recording
  async function startRecording() {
    try {
      if (audioPermissionResponse.status !== "granted") {
        console.log("Requesting permission..");
        Alert.alert(
          "Citizen X requires permission",
          "This app requires permission to access media files"
        );
        await audioRequestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    console.log("Recording stopped and stored at", uri);
    setStoredRecording(uri);
  }

  return (
    <View style={{ justifyContent: "flex-start", marginVertical: 15 }}>
      <Text style={{ marginVertical: 5, fontSize: 14 }}>Add Media</Text>
      <TextIconButton
        containerStyle={{
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          marginTop: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: "#0585FA",
          width: 160,
        }}
        icon={icons.cloudUpload}
        iconPosition="LEFT"
        iconStyle={{
          tintColor: null,
        }}
        label="Upload Media"
        labelStyle={{
          marginLeft: SIZES.radius,
          color: "white",
        }}
        onPress={() => getAlbums()}
      />
      <CameraView
        style={{
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          marginTop: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: "#0585FA",
          width: 160,
        }}
        CameraViewRef={(ref) => setCameraRef(ref)}
      >
        <TextIconButton
          containerStyle={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: SIZES.radius,
            borderRadius: SIZES.radius,
            backgroundColor: "#0585FA",
          }}
          icon={icons.cameraIcon}
          iconPosition="LEFT"
          iconStyle={{
            tintColor: null,
          }}
          label="Take a Picture"
          labelStyle={{
            marginLeft: SIZES.radius,
            color: "white",
          }}
          onPress={() => takePicture()}
        />
      </CameraView>
      <TextIconButton
        containerStyle={{
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          marginTop: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: "#0585FA",
          width: 160,
        }}
        icon={icons.audioRecord}
        iconPosition="LEFT"
        iconStyle={{
          tintColor: "white",
          width: 10,
        }}
        label={recording ? "Stop Recording" : "Record Audio"}
        labelStyle={{
          marginLeft: SIZES.radius,
          color: "white",
        }}
        onPress={() => {
          recording ? stopRecording() : startRecording();
        }}
      />
    </View>
  );
}
