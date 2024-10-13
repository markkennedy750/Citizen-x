import { Alert, StyleSheet, Text, View, Platform } from "react-native";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingImage from "../../components/loadingStates/LoadingImage";
import { CREATE_REPORT } from "../../Redux/URL";
import axios from "axios";
import ErrorImage from "../../components/loadingStates/ErrorImage";
import NetworkError from "../../components/loadingStates/NetworkError";
import * as ImageManipulator from "expo-image-manipulator";

const Election = ({ navigation }) => {
  const [insidentType, setInsidentType] = useState("");
  const [textInput, setTextInput] = useState("");
  const [albums, setAlbums] = useState([]);
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
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
      //rating
      const data = {
        category: categ,
        sub_report_type: insidentType,
        description: textInput,
        state_name: selectedState,
        lga_name: selectedLocalGov,
        is_anonymous: isEnabled,
        date_of_incidence: date,
      };

      if (address) {
        data.landmark = address;
      }
      if (location) {
        data.latitude = location?.latitude;
        data.longitude = location?.longitude;
      }
      if (selectedId) {
        data.rating = selectedId;
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

      setLoading(false);
      navigation.navigate("ReportSuccess");
    } catch (error) {
      setLoading(false);
      setError(error);
      if (error.response) {
        console.log("server error:", error.response.data);
        setErrorMessage(
          "There was an issue with the server. Please try again later."
        );
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        console.log("network error:", error.message);
        setErrorMessage(
          "Network error. Please check your internet connection and try again."
        );
        return rejectWithValue(error.message);
      } else {
        console.log("error:", error.message);
        setErrorMessage("An unexpected error occurred. Please try again.");
        return rejectWithValue(error.message);
      }
    } finally {
      setLoading(false);
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
  errorStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});
