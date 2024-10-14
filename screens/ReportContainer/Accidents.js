import { StyleSheet, Text, View, Platform } from "react-native";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingImage from "../../components/loadingStates/LoadingImage";
import { CREATE_REPORT, MEDIA_UPLOAD } from "../../Redux/URL";
import axios from "axios";
import ErrorImage from "../../components/loadingStates/ErrorImage";
import NetworkError from "../../components/loadingStates/NetworkError";
import * as ImageManipulator from "expo-image-manipulator";

const Accidents = ({ navigation }) => {
  const [insidentType, setInsidentType] = useState("");
  const [textInput, setTextInput] = useState("");
  const [albums, setAlbums] = useState([]);
  const [storedRecording, setStoredRecording] = useState(null);
  const [photoUri, setPhotoUri] = useState("");
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
  const [causeOfAccident, setCauseOfAccident] = useState("");
  const [videoMedia, setVideoMedia] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  const categ = "Accidents";

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

  // useEffect(() => {
  //   if (report && status === "OK") {
  //     navigation.navigate("SignUpSuccess");
  //   }
  // }, [report, status, navigation]);

  const Accidents = [
    { label: "Car Accidents", value: "Car Accidents" },
    { label: "Motorcycle Accidents", value: "Motorcycle Accidents" },
    { label: "Pedestrian Accidents", value: "Pedestrian Accidents" },
    {
      label: "Public Transportation Accidents",
      value: "Public Transportation Accidents",
    },
    { label: "Industrial Accidents", value: "Industrial Accidents" },
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

  // async function compressImage(uri) {
  //   try {
  //     const manipulatedImage = await ImageManipulator.manipulateAsync(
  //       uri,
  //       [{ resize: { width: 900 } }], // Resize width to 900px
  //       { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG } // Adjust compression as needed
  //     );
  //     return manipulatedImage.uri;
  //   } catch (error) {
  //     console.log("Error compressing image: ", error);
  //     return uri;
  //   }
  // }

  async function submitReport() {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("category", categ);
      formData.append("sub_report_type", insidentType);
      formData.append("description", textInput);
      formData.append("state_name", selectedState);
      formData.append("lga_name", selectedLocalGov);
      formData.append("is_anonymous", isEnabled);
      formData.append("date_of_incidence", date);

      if (address) {
        formData.append("landmark", address);
      }
      if (location) {
        formData.append("latitude", location?.latitude);
        formData.append("longitude", location?.longitude);
      }

      if (causeOfAccident) {
        formData.append("accident_cause", causeOfAccident);
      }

      console.log(formData);

      const response = await axios.post(CREATE_REPORT, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      ////////////////////////////////

      if (response.data.status === "Created" && response.data.reportID) {
        const reportTypeID = response.data.reportID;

        // Append media files
        if ((albums && albums.length > 0) || storedRecording) {
          const mediaFormData = new FormData();
          const validImageTypes = [
            "png",
            "jpg",
            "jpeg",
            "gif",
            "bmp",
            "tiff",
            "webp",
          ]; // Allowed image types

          albums.forEach((album, index) => {
            const fileType = album
              .substring(album.lastIndexOf(".") + 1)
              .toLowerCase();

            // Check if the fileType is a valid image type
            if (validImageTypes.includes(fileType)) {
              mediaFormData.append("mediaFiles[]", {
                uri: album,
                type: `image/${fileType}`,
                name: `media_${index}.${fileType}`,
              });
            } else {
              Alert.alert(
                "Media Error",
                `Invalid file type: ${fileType}. Only image files are allowed.`
              );
              console.warn(
                `Invalid file type: ${fileType}. Only image files are allowed.`
              );
            }
          });

          if (storedRecording) {
            const audioFileType = storedRecording.substring(
              storedRecording.lastIndexOf(".") + 1
            );
            mediaFormData.append("mediaFiles[]", {
              uri: storedRecording,
              type: `audio/${audioFileType}`,
              name: `recording.${audioFileType}`,
            });
          }
          mediaFormData.append("report_id", reportTypeID);

          // Media upload request
          const mediaResponse = await axios.post(MEDIA_UPLOAD, mediaFormData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
              // No need to manually set Content-Type for multipart/form-data
            },
          });
          if (mediaResponse.status === 200) {
            console.log("Media files uploaded successfully");
          } else {
            throw new Error("Media upload failed");
          }

          console.log("Media Upload Response:", mediaResponse.data);
        }

        // Handle stored recordings (if needed)
      }

      setLoading(false);
      navigation.navigate("ReportSuccess");
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.log("Server error:", error.response.data);
        setErrorMessage("Server issue. Please try again later.");
      } else if (error.request) {
        console.log("Request error:", error.request);
        setErrorMessage("Check your connection and try again.");
      } else {
        console.log("Axios error:", error.message);
        setErrorMessage("Unexpected error occurred. Please try again.");
      }
    }
  }

  if (loading) return <LoadingImage />;

  if (error.response) {
    return (
      <View style={styles.errorStyle}>
        <ErrorImage />
        <Text style={{ color: "red", fontSize: 10, fontWeight: "400" }}>
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
    <ReportWrapper title="Accidents">
      <InsidentType
        insidenType={insidentType}
        setInsidentType={setInsidentType}
        labelType="Crime Type"
        label="Select the type of Incident"
        insident={Accidents}
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
      <FormInput
        label="Cause of Accidents"
        //keyboardType="text"
        onChange={(value) => {
          setCauseOfAccident(value);
        }}
        autoCapitalize="words"
        value={causeOfAccident}
        formInputStyle={{
          //height: 40,
          borderWidth: 1,
          borderColor: COLORS.gray2,
          borderRadius: 7,
        }}
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
        onPress={submitReport}
      />
    </ReportWrapper>
  );
};

export default Accidents;

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
