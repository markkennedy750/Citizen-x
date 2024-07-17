import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { FontAwesome, } from "@expo/vector-icons";
import { COLORS } from "../constants";
import { MaterialIcons } from "@expo/vector-icons";
import * as Font from "expo-font";


const AudioRecordScreen = ({ route, navigation }) => {
  const { setStoredRecording } = route.params;
  const [recording, setRecording] = useState();
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        ...FontAwesome.font,
        ...MaterialIcons.font,
      });
    };

    loadFonts();
  }, []);

  //Audio Recording
  async function startRecording() {
    try {
      if (permissionResponse.status !== "granted") {
        console.log("Requesting permission..");
        await requestPermission();
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
    setStoredRecording(uri);
    console.log("Recording stopped and stored at", uri);
    console.log(recording);
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.parentButtonConatiner,
          recording ? styles.parentrecordingStop : styles.parentrecordStart,
        ]}
        onPress={() => {
          recording ? stopRecording() : startRecording();
        }}
      >
        <View
          style={[
            styles.buttonContainer,
            recording ? styles.buttonStop : styles.buttonStart,
          ]}
        >
          {recording ? (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <FontAwesome name="microphone-slash" size={65} color="white" />
              <Text style={styles.text}>Recording...</Text>
              <Text style={styles.text}>Click to stop</Text>
            </View>
          ) : (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <FontAwesome name="microphone" size={75} color="white" />
              <Text style={styles.text}>Start Record</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AudioRecordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  parentButtonConatiner: {
    backgroundColor: "white",
    width: 170,
    height: 170,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  buttonContainer: {
    width: 150,
    height: 150,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  parentrecordStart: {
    backgroundColor: COLORS.white2,
  },
  parentrecordingStop: {
    backgroundColor: "#28a7c9",
  },
  buttonStart: {
    backgroundColor: COLORS.primary,
  },
  buttonStop: {
    backgroundColor: "#f72346",
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.white,
  },
});
