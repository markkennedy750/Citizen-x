import { StyleSheet, Text, View } from "react-native";
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
import { CREATE_REPORT } from "../../Redux/URL";
import axios from "axios";
import ErrorImage from "../../components/loadingStates/ErrorImage";
import NetworkError from "../../components/loadingStates/NetworkError";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import { Platform } from "react-native";

const Crime = ({ navigation }) => {
  const [insidentType, setInsidentType] = useState("");
  const [textInput, setTextInput] = useState("");
  const [albums, setAlbums] = useState([]);
  const [storedRecording, setStoredRecording] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [location, setLocation] = useState(null);
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
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  const categ = "Crime";

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

  const crime = [
    { label: "Theft", value: "Theft" },
    { label: "Robbery", value: "Robbery" },
    { label: "Vandalism", value: "Vandalism" },
    { label: "Kidnapping", value: "Kidnapping" },
    { label: "Assault", value: "Kidnapping" },
  ];

  function submitPost() {
    return (
      insidentType != "" &&
      textInput != "" &&
      selectedState != null &&
      loading === false
    );
  }

  // const uriToBlob = async (uri) => {
  //   const response = await fetch(uri);
  //   const blob = await response.blob();
  //   return blob;
  // };

  async function submitReport() {
    try {
      setLoading(true);

      // Initialize FormData is_response

      const data = {
        category: categ,
        sub_report_type: insidentType,
        description: textInput,
        state_name: selectedState,
        lga_name: selectedLocalGov,
        is_anonymous: isEnabled,
        date_of_incidence: date,
        is_response : checkboxValue
      };

      if (address) {
        data.landmark = address;
      }
      if (location) {
        data.latitude = location?.latitude;
        data.longitude = location?.longitude;
      }

      const response = await axios.post(CREATE_REPORT, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
    
      if (response.data.status === "Created" && response.data.reportID) {
        const reportTypeID = response.data.reportID;
        const formData = new FormData();

        if (albums && albums.length > 0) {
          albums.forEach((album, index) => {
            const fileType = album
              .substring(album.lastIndexOf(".") + 1)
              .toLowerCase();
            let mediaType = "image";
            if (["mp4", "mov", "avi", "mkv", "webm"].includes(fileType)) {
              mediaType = "video";
            }

            formData.append("mediaFiles[]", {
              uri: album,
              type: `${mediaType}/${fileType}`,
              name: `media_${index}.${fileType}`,
            });
          });
        }

        if (storedRecording) {
          const audioFileType = storedRecording.substring(
            storedRecording.lastIndexOf(".") + 1
          );
          formData.append("mediaFiles[]", {
            uri: storedRecording,
            type: `audio/${audioFileType}`,
            name: `recording.${audioFileType}`,
          });
        }

        formData.append("report_id", reportTypeID);

        
        const Mediaresponse = await axios.post(MEDIA_UPLOAD, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(Mediaresponse.data);
      }
      
      navigation.navigate("ReportSuccess");

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      if (error.response) {
        console.log("server error:", error.response.data);
        setErrorMessage(
          "There was an issue with the server. Please try again later."
        );
      } else if (error.request) {
        console.log("network error:", error.message);
        setErrorMessage(
          "Network error. Please check your internet connection and try again."
        );
      } else {
        console.log("error:", error.message);
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally{
      setLoading(false);
      
    }
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

  if (loading) return <LoadingImage />;

  if (error.response) {
    return (
      <View style={styles.errorStyle}>
        <ErrorImage />
        <Text style={{ color: "red", fontSize: 12, fontWeight: "400" }}>
          {errorMessage}
        </Text>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TextButton
            label="Go Back"
            buttonContainerStyle={{
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
              borderRadius: SIZES.radius,
              backgroundColor: "#0E9C67",
            }}
            labelStyle={{
              color: COLORS.white,
              fontWeight: "700",
              fontSize: 18,
            }}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      </View>
    );
  } else if (error.request) {
    return (
      <View style={styles.errorStyle}>
        <NetworkError />
        <Text style={{ color: "red", fontSize: 12, fontWeight: "400" }}>
          {errorMessage}
        </Text>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TextButton
            label="Go Back"
            buttonContainerStyle={{
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
              borderRadius: SIZES.radius,
              backgroundColor: "#0E9C67",
            }}
            labelStyle={{
              color: COLORS.white,
              fontWeight: "700",
              fontSize: 18,
            }}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      </View>
    );
  } else if (error) {
    return (
      <View style={styles.errorStyle}>
        <ErrorImage />
        <Text style={{ color: "red", fontSize: 12, fontWeight: "400" }}>
          {errorMessage}
        </Text>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TextButton
            label="Go Back"
            buttonContainerStyle={{
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
              borderRadius: SIZES.radius,
              backgroundColor: "#0E9C67",
            }}
            labelStyle={{
              color: COLORS.white,
              fontWeight: "700",
              fontSize: 18,
            }}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      </View>
    );
  }
  return (
    <ReportWrapper title="Crime & Safety">
      <InsidentType
        insidenType={insidentType}
        setInsidentType={setInsidentType}
        labelType="Crime Type"
        label="Select the type of Incident"
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
        albums={albums}
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
      <UserLocation location={location} setLocation={setLocation} />
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
        onPress={async () => await submitReport()}
      />
    </ReportWrapper>
  );
};

export default Crime;

const styles = StyleSheet.create({
  checkBoxContainer: {
    marginVertical: 20,
  },
  errorStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});
