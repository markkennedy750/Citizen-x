import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState,useMemo } from "react";
import ReportWrapper from "./ReportWrapper";
import InsidentType from "../../components/InsidentType";
import TextDesc from "../../components/TextDesc";
import CameraVideoMedia from "../../components/CameraVideoMedia";
import UserLocation from "../../components/UserLocation";
import StateLocal from "../../components/StateLocal";
import AnonymousPost from "../../components/AnonymousPost";
import TextButton from "../../components/TextButton";
import { COLORS, SIZES } from "../../constants";
import FormInput from "../../components/FormInput";
import { useNavigation } from "@react-navigation/native";
import RadioGroup from "react-native-radio-buttons-group";

const Corruption = () => {
  const [insidentType, setInsidentType] = useState("");
  const [textInput, setTextInput] = useState("");
  const [albums, setAlbums] = useState(null);
  const [storedRecording, setStoredRecording] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [location, setLocation] = useState(null);
  const [selectedState, setSelectedState] = useState();
  const [selectedLocalGov, setSelectedLocalGov] = useState();
  const [isEnabled, setIsEnabled] = useState(false);
  const [address, setAddress] = useState("");
  const [videoMedia, setVideoMedia] = useState()

  const { navigation } = useNavigation();

  const corruption = [
    { label: "Bribery Cases", value: "Bribery Cases" },
    { label: "Embazzlement Incidents", value: "Embazzlement Incidents" },
    { label: "Public Office Bribery", value: "Public Office Bribery" },
    { label: "Kickbacks Reports", value: "Kickbacks Reports" },
    { label: "Misuse of Public Funds", value: "Misuse of Public Funds" },
  ];

  function submitPost() {
    return insidentType != "" && textInput != "" && selectedState != null;
  }

  const radioButtons = useMemo(
    () => [
      {
        id: "1",
        label: "Highly likely",
        value: "Highly likely",
      },
      {
        id: "2",
        label: "Very likely",
        value: "Very likely",
      },
      {
        id: "3",
        label: "Neutral",
        value: "Neutral",
      },
      {
        id: "4",
        label: "unlikely",
        value: "unlikely",
      },
      {
        id: "5",
        label: "Highly unlikely",
        value: "Highly unlikely",
      },
    ],
    []
  );

  return (
    <ReportWrapper title="Corruption">
      <InsidentType
        insidenType={insidentType}
        setInsidentType={setInsidentType}
        labelType="Corruption"
        label="Select the type of Insident"
        insident={corruption}
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
        videoMedia={videoMedia}
        setVideoMedia={setVideoMedia}
      />

      <StateLocal
        selectedState={selectedState}
        setSelectedState={setSelectedState}
        selectedLocalGov={selectedLocalGov}
        setSelectedLocalGov={setSelectedLocalGov}
      />
      <FormInput
        label="Address/Landmark"
        //keyboardType="text"
        onChange={(value) => {
          setAddress(value);
        }}
        autoCapitalize="words"
        value={address}
        formInputStyle={{
          //height: 40,
          borderWidth: 1,
          borderColor: COLORS.gray2,
          borderRadius: 7,
        }}
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
          What is the tendency of an official taking a bribe?
        </Text>
        <View style={{ alignItems: "flex-start" }}>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={setSelectedId}
            selectedId={selectedId}
            containerStyle={{
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          />
        </View>
      </View>

      <AnonymousPost isEnabled={isEnabled} setIsEnabled={setIsEnabled} />
      <TextButton
        label="Submit Report"
        disabled={submitPost() ? false : true}
        buttonContainerStyle={{
          height: 55,
          alignItems: "center",
          justifyContent: "center",
          marginVertical: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: submitPost() ? "#0E9C67" : COLORS.gray3,
        }}
        labelStyle={{
          color: COLORS.white,
          fontWeight: "700",
          fontSize: 17,
        }}
        onPress={() => navigation.navigate("MainScreen")}
      />
    </ReportWrapper>
  );
};

export default Corruption;

const styles = StyleSheet.create({
  checkBoxContainer: {
    marginVertical: 20,
  },
});
