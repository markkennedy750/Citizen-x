import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ReportWrapper from "./ReportWrapper";
import InsidentType from "../../components/InsidentType";
import TextDesc from "../../components/TextDesc";
import CameraVideoMedia from "../../components/CameraVideoMedia";
import UserLocation from "../../components/UserLocation";
import DateTime from "../../components/DateTime";
import StateLocal from "../../components/StateLocal";
import CheckBox from "../../components/CheckBox";

const Crime = () => {
  const [insidentType, setInsidentType] = useState("");
  const [textInput, setTextInput] = useState("");
  const [albums, setAlbums] = useState(null);
  const [storedRecording, setStoredRecording] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [location, setLocation] = useState(null);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [selectedState, setSelectedState] = useState();
  const [selectedLocalGov, setSelectedLocalGov] = useState();
  const [checked, setChecked] = useState(false);

  const crime = [
    { label: "Theft", value: "Theft" },
    { label: "Robbery", value: "Robbery" },
    { label: "Vandalism", value: "Vandalism" },
    { label: "Kidnapping", value: "Kidnapping" },
    { label: "Assault", value: "Kidnapping" },
  ];

  return (
    <ReportWrapper title="Crime & Safety">
      <InsidentType
        insidenType={insidentType}
        setInsidentType={setInsidentType}
        labelType="Crime Type"
        label="Select the type of Insident"
        insident={crime}
      />
      <TextDesc
        onChange={setTextInput}
        value={textInput}
        placeholder="Enter Description"
      />
      <CameraVideoMedia
        setAlbums={setAlbums}
        setStoredRecording={setStoredRecording}
        setPhotoUri={setPhotoUri}
      />
      <DateTime date={date} setDate={setDate} time={time} setTime={setTime} />
      <StateLocal
        selectedState={selectedState}
        setSelectedState={setSelectedState}
        selectedLocalGov={selectedLocalGov}
        setSelectedLocalGov={setSelectedLocalGov}
      />
      <UserLocation location={location} setLocation={setLocation} />

      <View style={styles.checkBoxContainer}>
        <Text
          style={{
            fontWeight: "400",
            fontSize: 15,
            lineHeight: 20,
            marginVertical: 10,
            color: "#000000B2",
          }}
        >
          Was there a response from the emergency services as of the time of
          making this report?
        </Text>
        <CheckBox checked={checked} setChecked={setChecked} label="Yes" />
      </View>
    </ReportWrapper>
  );
};

export default Crime;

const styles = StyleSheet.create({
  checkBoxContainer: {
    marginVertical: 20,
  },
});
