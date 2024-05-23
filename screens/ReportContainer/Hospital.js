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

const Hospital = () => {
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
  const [selectedId, setSelectedId] = useState();
  const [hospitalName, setHospitalName] = useState("");
  const [hospitaleAddress, setHospitalAddress] = useState("");
  const [department, setDepartment] = useState("");
  const [departmentNameHead, setDepartmentNameHead] = useState("");

  const { navigation } = useNavigation();

  const Hospital = [
    {
      label: "Predifined Emergency Service",
      value: "Predifined Emergency Service",
    },
    { label: "Patience Care", value: "Patience Care" },
    { label: "Staff Attitude", value: "Staff Attitude" },
    { label: "Facilities Cleanliness", value: "Facilities Cleanliness" },
    {
      label: "Availability of Medications",
      value: "Availability of Medications",
    },
  ];

  function submitPost() {
    return (
      insidentType != "" &&
      textInput != "" &&
      selectedState != null &&
      hospitalName != "" &&
      hospitaleAddress != ""
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
        labelType="Crime Type"
        label="Select the type of Insident"
        insident={Hospital}
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
      <FormInput
        label="Hospital Name"
        //keyboardType="text"
        onChange={(value) => {
          setHospitalName(value);
        }}
        autoCapitalize="words"
        value={hospitalName}
        formInputStyle={{
          //height: 40,
          borderWidth: 1,
          borderColor: COLORS.gray2,
          borderRadius: 7,
        }}
      />
      <FormInput
        label="Hospital Address"
        //keyboardType="text"
        onChange={(value) => {
          setHospitalAddress(value);
        }}
        autoCapitalize="words"
        value={hospitaleAddress}
        formInputStyle={{
          //height: 40,
          borderWidth: 1,
          borderColor: COLORS.gray2,
          borderRadius: 7,
        }}
      />
      <FormInput
        label="Department"
        //keyboardType="text"
        onChange={(value) => {
          setDepartment(value);
        }}
        autoCapitalize="words"
        value={department}
        formInputStyle={{
          //height: 40,
          borderWidth: 1,
          borderColor: COLORS.gray2,
          borderRadius: 7,
        }}
      />
      <FormInput
        label="Department Name Head"
        //keyboardType="text"
        onChange={(value) => {
          setDepartmentNameHead(value);
        }}
        autoCapitalize="words"
        value={departmentNameHead}
        formInputStyle={{
          //height: 40,
          borderWidth: 1,
          borderColor: COLORS.gray2,
          borderRadius: 7,
        }}
      />
      <StateLocal
        selectedState={selectedState}
        setSelectedState={setSelectedState}
        selectedLocalGov={selectedLocalGov}
        setSelectedLocalGov={setSelectedLocalGov}
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
          How would you rate your healthcare experience?
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

export default Hospital;

const styles = StyleSheet.create({
  checkBoxContainer: {
    marginVertical: 20,
    justifyContent: "flex-start",
  },
});
