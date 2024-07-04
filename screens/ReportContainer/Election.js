import { Alert, StyleSheet, Text, View } from "react-native";
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
import RadioGroup from "react-native-radio-buttons-group";
import DateTime from "../../components/DateTime";
import { useDispatch, useSelector } from "react-redux";
import { createReport } from "../../Redux/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingImage from "../../components/loadingStates/LoadingImage";

const Election = ({ navigation }) => {
  const [insidentType, setInsidentType] = useState("");
  const [textInput, setTextInput] = useState("");
  const [albums, setAlbums] = useState("");
  const [storedRecording, setStoredRecording] = useState("");
  const [photoUri, setPhotoUri] = useState("");
  const [location, setLocation] = useState([]);
  const [selectedState, setSelectedState] = useState();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [selectedLocalGov, setSelectedLocalGov] = useState();
  const [isEnabled, setIsEnabled] = useState(false);
  const [address, setAddress] = useState("");
  const [videoMedia, setVideoMedia] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const { loading, error, status, report } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);

  const categ = "Election";

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("access_token");
        setToken(value);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (report && status === "OK") {
      navigation.navigate("SignUpSuccess");
    }
  }, [report, status, navigation]);

  useEffect(() => {
    if (error) {
      Alert.alert("Login Failed", error.message);
    }
  }, [error]);

  const elections = [
    { label: "Voter Intimidation", value: "Voter Intimidation" },
    { label: "Election violence", value: "Election violence" },
    { label: "Ballot Box Snatching", value: "Ballot Box Snatching" },
    { label: "Voter Suppression", value: "Voter Suppression" },
    { label: "Vote Bribery", value: "Vote Bribery" },
    { label: "Polling Station Issues", value: "Polling Station Issues" },
  ];

  function submitPost() {
    return (
      insidentType != "" &&
      textInput != "" &&
      selectedState != null &&
      date != null &&
      loading === false
    );
  }

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error);
    }
  }, [error]);

  function submitReport() {
    dispatch(
      createReport({
        token,
        insidentType,
        textInput,
        videoMedia,
        photoUri,
        storedRecording,
        albums,
        location,
        address,
        selectedId,
        date,
        isEnabled,
        selectedState,
        selectedLocalGov,
        time,
        categ,
      })
    );

    if (status === "OK") {
      navigation.navigate("ReportSuccess");
    }
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

  if (loading) return <LoadingImage />;

  return (
    <ReportWrapper title="Elections">
      <InsidentType
        insidenType={insidentType}
        setInsidentType={setInsidentType}
        labelType="Elections"
        label="Election Report Type"
        insident={elections}
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
      <DateTime date={date} setDate={setDate} time={time} setTime={setTime} />

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
          How was the electoral process?
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
        onPress={submitReport}
      />
    </ReportWrapper>
  );
};

export default Election;

const styles = StyleSheet.create({
  checkBoxContainer: {
    marginVertical: 20,
  },
});
