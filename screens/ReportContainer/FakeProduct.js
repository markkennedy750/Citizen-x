import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import ReportWrapper from "./ReportWrapper";
import InsidentType from "../../components/InsidentType";
import TextDesc from "../../components/TextDesc";
import CameraVideoMedia from "../../components/CameraVideoMedia";
import UserLocation from "../../components/UserLocation";
import DateTime from "../../components/DateTime";
import StateLocal from "../../components/StateLocal";
import CheckBox from "../../components/CheckBox";
import AnonymousPost from "../../components/AnonymousPost";
import TextButton from "../../components/TextButton";
import { COLORS, SIZES } from "../../constants";
import FormInput from "../../components/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { createReport } from "../../Redux/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingImage from "../../components/loadingStates/LoadingImage";
//import { Alert } from "react-native";

const FakeProduct = ({ navigation }) => {
  const [insidentType, setInsidentType] = useState("");
  const [textInput, setTextInput] = useState("");
  const [albums, setAlbums] = useState("");
  const [storedRecording, setStoredRecording] = useState(null);
  const [photoUri, setPhotoUri] = useState("");
  const [location, setLocation] = useState([]);
  const [selectedState, setSelectedState] = useState();
  const [selectedLocalGov, setSelectedLocalGov] = useState();
  const [isEnabled, setIsEnabled] = useState(false);
  const [address, setAddress] = useState("");
  const [productName, setProductName] = useState("");
  const [videoMedia, setVideoMedia] = useState("");
  const { loading, error, status, report } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const categ = "Fake products";

  useEffect(() => {
    // Update currentDate when the component mounts
    const now = new Date();
    setCurrentDate(now);
  }, []);

  useEffect(() => {
    if (report && status === "OK") {
      navigation.navigate("SignUpSuccess");
    }
  }, [report, status, navigation]);

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
      Alert.alert("Login Failed", error.error);
    }
  }, [error]);

  function submitReport() {
    console.log("Submitting report...");
    dispatch(
      createReport({
        token,
        insidentType,
        currentDate,
        textInput,
        albums,
        storedRecording,
        photoUri,
        videoMedia,
        location,
        selectedState,
        selectedLocalGov,
        productName,
        address,
        categ,
      })
    );
    console.log("Submit function executed");
  }

  const crime = [
    { label: "Counterfit Electronics", value: "Counterfit Electronics" },
    { label: "Fake Medicines", value: "Fake Medicines" },
    { label: "KnockOff Clothings", value: "KnockOff Clothings" },
    { label: "Counterfit Cosmetics", value: "Counterfit Cosmetics" },
    { label: "Imitation Food Products", value: "Imitation Food Products" },
  ];

  function submitPost() {
    return (
      insidentType != "" &&
      textInput != "" &&
      selectedState != null &&
      productName != "" &&
      loading === false
    );
  }
  if (loading) return <LoadingImage />;
  return (
    <ReportWrapper title="Fake Products">
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
        videoMedia={videoMedia}
        setVideoMedia={setVideoMedia}
      />

      <StateLocal
        selectedState={selectedState}
        setSelectedState={setSelectedState}
        selectedLocalGov={selectedLocalGov}
        setSelectedLocalGov={setSelectedLocalGov}
      />
      <UserLocation location={location} setLocation={setLocation} />
      <FormInput
        label="Product Name"
        //keyboardType="text"
        onChange={(value) => {
          setProductName(value);
        }}
        autoCapitalize="words"
        value={productName}
        formInputStyle={{
          //height: 40,
          borderWidth: 1,
          borderColor: COLORS.gray2,
          borderRadius: 7,
        }}
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

export default FakeProduct;

const styles = StyleSheet.create({
  checkBoxContainer: {
    marginVertical: 20,
  },
});
