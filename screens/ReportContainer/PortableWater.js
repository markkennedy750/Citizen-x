import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useMemo } from "react";
import ReportWrapper from "./ReportWrapper";
import InsidentType from "../../components/InsidentType";
import TextDesc from "../../components/TextDesc";
import CameraVideoMedia from "../../components/CameraVideoMedia";
import UserLocation from "../../components/UserLocation";
import StateLocal from "../../components/StateLocal";
import CheckBox from "../../components/CheckBox";
import AnonymousPost from "../../components/AnonymousPost";
import TextButton from "../../components/TextButton";
import { COLORS, SIZES } from "../../constants";
import FormInput from "../../components/FormInput";
import RadioGroup from "react-native-radio-buttons-group";
import { useDispatch, useSelector } from "react-redux";
import { createReport } from "../../Redux/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingImage from "../../components/loadingStates/LoadingImage";

const PortableWater = ({ navigation }) => {
  const [insidentType, setInsidentType] = useState("");
  const [textInput, setTextInput] = useState("");
  const [albums, setAlbums] = useState("");
  const [storedRecording, setStoredRecording] = useState("");
  const [photoUri, setPhotoUri] = useState("");
  const [location, setLocation] = useState([]);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [selectedState, setSelectedState] = useState();
  const [selectedLocalGov, setSelectedLocalGov] = useState();
  const [checked, setChecked] = useState(false);
  const [unchecked, setUnChecked] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [address, setAddress] = useState("");
  const [videoMedia, setVideoMedia] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const { loading, error, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);
  const [report, setReport] = useState("");

  useEffect(() => {
    setReport("Portable Water");
  }, []);

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
    if (error) {
      Alert.alert("Login Failed", error.message);
    }
  }, [error]);

  function submitReport() {
    dispatch(
      createReport({
        token,
        insidentType,
        textInput,
        albums,
        storedRecording,
        photoUri,
        videoMedia,
        location,
        isEnabled,
        selectedState,
        selectedLocalGov,
        address,
        selectedId,
        checkboxValue,
        address,
        report
      })
    );

    if (status === "OK") {
      navigation.navigate("ReportSuccess");
    }
  }

  const portableWater = [
    { label: "Water Quality", value: "Water Quality" },
    { label: "Water Pressure", value: "Water Pressure" },
    { label: "Water Distribution", value: "Water Distribution" },
    { label: "Water Contamination", value: "Water Contamination" },
    {
      label: "Water Treatment Plant Issues",
      value: "Water Treatment Plant Issues",
    },
  ];

  function submitPost() {
    return (
      insidentType != "" &&
      textInput != "" &&
      selectedState != null &&
      loading === false
    );
  }

  const checkedBoxFucn = (value) => {
    if (value === checked) {
      setChecked(true);
      setUnChecked(false);
      setCheckboxValue(true);
    } else if (value === unchecked) {
      setUnChecked(true);
      setChecked(false);
      setCheckboxValue(false);
    }
  };

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
    <ReportWrapper title="Portable Water">
      <InsidentType
        insidenType={insidentType}
        setInsidentType={setInsidentType}
        labelType="Crime Type"
        label="Select the type of Insident"
        insident={portableWater}
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
          Was there an outage on water supply in your area?
        </Text>
        <CheckBox
          checked={checked}
          setChecked={() => checkedBoxFucn(checked)}
          label="Yes"
        />
        <CheckBox
          checked={unchecked}
          setChecked={() => checkedBoxFucn(unchecked)}
          label="No"
        />
      </View>

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
          How would you rate the water supply in your area?
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

export default PortableWater;

const styles = StyleSheet.create({
  checkBoxContainer: {
    marginVertical: 20,
  },
});
