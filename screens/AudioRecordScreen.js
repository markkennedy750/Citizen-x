import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Audio } from "expo-av";

const AudioRecordScreen = ({ route, navigation }) => {
  const [recording, setRecording] = useState();
  const { setStoredRecording } = route.params;

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
    navigation.goBack();
    setStoredRecording(uri);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text>AudioRecordScreen</Text>
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
});
