import { StyleSheet, Text, View,Platform } from "react-native";
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
import { useDispatch, useSelector } from "react-redux";
import { createReport } from "../../Redux/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingImage from "../../components/loadingStates/LoadingImage";
import { CREATE_REPORT } from "../../Redux/URL";
import axios from "axios";
import ErrorImage from "../../components/loadingStates/ErrorImage";
import NetworkError from "../../components/loadingStates/NetworkError";
import * as ImageManipulator from 'expo-image-manipulator';


const Corruption = ({ navigation }) => {
  const [insidentType, setInsidentType] = useState("");
  const [textInput, setTextInput] = useState("");
  const [albums, setAlbums] = useState([]);
  const [storedRecording, setStoredRecording] = useState("");
  const [photoUri, setPhotoUri] = useState("");
  const [location, setLocation] = useState("");
  const [selectedState, setSelectedState] = useState();
  const [selectedLocalGov, setSelectedLocalGov] = useState();
  const [isEnabled, setIsEnabled] = useState(false);
  const [address, setAddress] = useState("");
  const [videoMedia, setVideoMedia] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  const categ = "Corruption";

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

  async function compressImage(uri) {
    try {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 900 } }], 
        { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG } 
      );
      return manipulatedImage.uri;
    } catch (error) {
      console.log("Error compressing image: ", error);
      return uri;
    }
  }

  const corruption = [
    { label: "Bribery Cases", value: "Bribery Cases" },
    { label: "Embazzlement Incidents", value: "Embazzlement Incidents" },
    { label: "Public Office Bribery", value: "Public Office Bribery" },
    { label: "Kickbacks Reports", value: "Kickbacks Reports" },
    { label: "Misuse of Public Funds", value: "Misuse of Public Funds" },
  ];

  function submitPost() {
    return (
      insidentType != "" &&
      textInput != "" &&
      selectedState != null &&
      loading === false
    );
  }

  async function submitReport() {
    try {
      setLoading(true);
      const formData = new FormData();

      // Append textual data
      formData.append("category", categ);
      formData.append("sub_report_type", insidentType);
      formData.append("description", textInput);
      formData.append("state_name", selectedState);
      formData.append("lga_name", selectedLocalGov);
      formData.append("is_anonymous", isEnabled);
      formData.append("landmark", address || "");
      formData.append("latitude", location?.latitude || "");
      formData.append("longitude", location?.longitude || "");

      const appendMediaFile = (uri, name, type) => {
        formData.append("mediaFiles", {
          uri: Platform.OS === "ios" ? uri.replace("file://", "") : uri,
          type: type,
          name: name,
        });
      };
      // if (photoUri) {
      //   appendMediaFile(photoUri, "photo.jpg", "image/jpeg");
      // }
      for (let index = 0; index < albums.length; index++) {
        const album = albums[index];
        const fileType = album.substring(album.lastIndexOf(".") + 1);
        let mimeType = `image/${fileType}`;
        if (fileType !== "jpeg" && fileType !== "png") {
          mimeType = "image/jpeg";
        }
    
        const compressedImageUri = await compressImage(album);
  
        appendMediaFile(compressedImageUri, `photo${index}.${fileType}`, mimeType);
      }
      // if (videoMedia) {
      //   appendMediaFile(videoMedia, "video.mp4", "video/mp4");
      // }
      if (storedRecording) {
        appendMediaFile(storedRecording, "audio.mp3", "audio/mpeg");
      }

      // Make the request to the backend
      const response = await axios.post(CREATE_REPORT, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("report created successfully:", response.data);
      setLoading(false);
      if (response.data.status === "Created") {
        navigation.navigate("ReportSuccess");
      }
      return response.data;
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
    }
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
    <ReportWrapper title="Corruption">
      <InsidentType
        insidenType={insidentType}
        setInsidentType={setInsidentType}
        labelType="Corruption"
        label="Select the type of Incident"
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
        onPress={submitReport}
      />
    </ReportWrapper>
  );
};

export default Corruption;

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
