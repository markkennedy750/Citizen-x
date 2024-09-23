import {
  Text,
  View,
  Alert,
  ActivityIndicator,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import TextIconButton from "./TextIconButton";
import { COLORS, SIZES, icons } from "../constants";

import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

export default function CameraVideoMedia({
  setAlbums,
  setStoredRecording,
  setPhotoUri,
  videoMedia,
  setVideoMedia,
  albums,
}) {
  const navigation = useNavigation();

  //const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions()
  //const [albums, setAlbums] = useState(null);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [recording, setRecording] = useState();
  const [imageLoading, setImageLoading] = useState(false);
  //const [storedRecording, setStoredRecording] = useState(null);

  //const [hasPermission, setHasPermission] = useCameraPermissions();
  //const [cameraRef, setCameraRef] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     if (!permissionResponse) {
  //       await requestPermission();
  //     }
  //     if (!audioPermissionResponse) {
  //       await audioRequestPermission();
  //     }
  //     if (!hasPermission) {
  //       await setHasPermission();
  //     }
  //   })();
  // }, []);

  const mediaAccess = async () => {
    try {
      setImageLoading(true);
      let result = await ImagePicker.launchImageLibraryAsync({
        //allowsEditing: true,
        quality: 1,
        allowsMultipleSelection: true,
      });

      if (!result.canceled) {
        const selectedImages = result.assets.map((asset) => asset.uri);
        setAlbums(selectedImages);
        setImageLoading(false);
        // return selectedImages;
      } else {
        Alert.alert("You did not select any images.");
        setImageLoading(false);
      }
    } catch (error) {
      Alert.alert("Error accessing media library", error);
    } finally {
      setImageLoading(false);
    }
  };
  // async function takePicture() {
  //   if (hasPermission?.status !== "granted") {
  //     Alert.alert(
  //       "Citizen X Permission",
  //       "This app requires permission to access the camera",
  //       [
  //         { text: "Cancel", style: "cancel" },
  //         {
  //           text: "Grant permission",
  //           onPress: async () => await requestCameraPermission(),
  //         },
  //       ],
  //       { cancelable: true }
  //     );
  //     return;
  //   }
  //   if (cameraRef) {
  //     const photo = await cameraRef.takePictureAsync();
  //     setPhotoUri(photo.uri);
  //   }
  // }

  //Audio Recording
  // async function startRecording() {
  //   try {
  //     if (audioPermissionResponse.status !== "granted") {
  //       console.log("Requesting permission..");
  //       Alert.alert(
  //         "Citizen X requires permission",
  //         "This app requires permission to access media files"
  //       );
  //       await audioRequestPermission();
  //     }
  //     await Audio.setAudioModeAsync({
  //       allowsRecordingIOS: true,
  //       playsInSilentModeIOS: true,
  //     });

  //     console.log("Starting recording..");
  //     const { recording } = await Audio.Recording.createAsync(
  //       Audio.RecordingOptionsPresets.HIGH_QUALITY
  //     );
  //     setRecording(recording);
  //     console.log("Recording started");
  //   } catch (err) {
  //     console.error("Failed to start recording", err);
  //   }
  // }

  // async function stopRecording() {
  //   console.log("Stopping recording..");
  //   setRecording(undefined);
  //   await recording.stopAndUnloadAsync();
  //   await Audio.setAudioModeAsync({
  //     allowsRecordingIOS: false,
  //   });
  //   const uri = recording.getURI();
  //   console.log("Recording stopped and stored at", uri);
  //   setStoredRecording(uri);
  // }

  const renderImage = ({ item }) => (
    <Image
      source={{ uri: item }}
      style={{
        width: 80,
        height: 80,
        marginRight: 10,
        borderRadius: SIZES.radius,
      }}
    />
  );

  return (
    <View style={{ justifyContent: "flex-start", marginVertical: 15 }}>
      <Text style={{ marginVertical: 5, fontSize: 14 }}>Add Media</Text>
      {imageLoading ? (
        <View
          style={{
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            marginTop: SIZES.radius,
            borderRadius: SIZES.radius,
            backgroundColor: "#0585FA",
            width: 160,
          }}
        >
          <ActivityIndicator size="large" color={`${COLORS.primary}`} />
        </View>
      ) : (
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
            tintColor: "white",
            width: 25,
            resizeMode: "cover",
            height: 17,
          }}
          label="Upload Media"
          labelStyle={{
            marginLeft: SIZES.radius,
            color: "white",
          }}
          onPress={mediaAccess}
        />
      )}
      {/* 
        
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
          icon={icons.cameraIcon}
          iconPosition="LEFT"
          iconStyle={{
            tintColor: "white",
            width: 28,
            resizeMode: "cover",
            height: 27,
          }}
          label="Take a picture"
          labelStyle={{
            marginLeft: SIZES.radius,
            color: "white",
          }}
          onPress={() => {
            navigation.navigate("CameraScreen", {
              setPhotoUri,
              videoMedia,
              setVideoMedia,
            });
          }}
        />
        */}
      <TextIconButton
        disabled={imageLoading}
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
          width: 19,
          resizeMode: "cover",
          height: 25,
        }}
        label="Record Audio"
        labelStyle={{
          marginLeft: SIZES.radius,
          color: "white",
        }}
        onPress={() =>
          navigation.navigate("AudioRecordScreen", { setStoredRecording })
        }
      />

      {albums.length > 0 && (
        <View style={{ marginTop: 15 }}>
          <FlatList
            data={albums}
            renderItem={renderImage}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
}
