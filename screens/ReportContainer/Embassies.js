import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useMemo } from "react";
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

const Embassies = () => {
  const [insidentType, setInsidentType] = useState("");
  const [textInput, setTextInput] = useState("");
  const [albums, setAlbums] = useState(null);
  const [storedRecording, setStoredRecording] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [location, setLocation] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [address, setAddress] = useState("");
  const [selectedId, setSelectedId] = useState();
  const [country, setCountry] = useState("");
  const [stateEmbassey, setStateEmbassey] = useState("");
  const [ambassedor, setAmbassedor] = useState("");
  const [videoMedia, setVideoMedia] = useState("")


  const { navigation } = useNavigation();

  const embassies = [
    {
      label: "Visa Processing Time",
      value: "Visa Processing Time",
    },
    { label: "Consular Service", value: "Consular Service" },
    { label: "Customer Service", value: "Customer Service" },
    {
      label: "Passport Renewal Processes",
      value: "Passport Renewal Processes",
    },
    {
      label: "Queue Time for service",
      value: "Queue Time for service",
    },
  ];

  function submitPost() {
    return (
      insidentType != "" &&
      textInput != "" &&
      country != "" &&
      stateEmbassey != "" &&
      ambassedor != ""
    );
  }
  const radioButtons = useMemo(
    () => [
      {
        id: "1",
        label: "Very Bad",
        value: "Very Bad",
      },
      {
        id: "2",
        label: "Bad",
        value: "Bad",
      },
      {
        id: "3",
        label: "Average",
        value: "Average",
      },
      {
        id: "4",
        label: "Good",
        value: "Good",
      },
      {
        id: "5",
        label: "Very Good",
        value: "Very Good",
      },
    ],
    []
  );

  return (
    <ReportWrapper title="Hospitals">
      <InsidentType
        insidenType={insidentType}
        setInsidentType={setInsidentType}
        labelType="embassies"
        label="Select the type of Insident"
        insident={embassies}
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
      <FormInput
        label="Country"
        //keyboardType="text"
        onChange={(value) => {
          setCountry(value);
        }}
        autoCapitalize="words"
        value={country}
        formInputStyle={{
          //height: 40,
          borderWidth: 1,
          borderColor: COLORS.gray2,
          borderRadius: 7,
        }}
      />
      <FormInput
        label="State Embassy is Located"
        //keyboardType="text"
        onChange={(value) => {
          setStateEmbassey(value);
        }}
        autoCapitalize="words"
        value={stateEmbassey}
        formInputStyle={{
          //height: 40,
          borderWidth: 1,
          borderColor: COLORS.gray2,
          borderRadius: 7,
        }}
      />
      <FormInput
        label="Ambassedor Name"
        //keyboardType="text"
        onChange={(value) => {
          setAmbassedor(value);
        }}
        autoCapitalize="words"
        value={ambassedor}
        formInputStyle={{
          //height: 40,
          borderWidth: 1,
          borderColor: COLORS.gray2,
          borderRadius: 7,
        }}
      />

      <FormInput
        label="Landmark"
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
          How would you rate your experience at the Embassy?
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

export default Embassies;

const styles = StyleSheet.create({
  checkBoxContainer: {
    marginVertical: 20,
    justifyContent: "flex-start",
  },
});
