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
import RadioGroup from "react-native-radio-buttons-group";
import { useDispatch, useSelector } from "react-redux";
import { createReport } from "../../Redux/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingImage from "../../components/loadingStates/LoadingImage";
import { CREATE_REPORT } from "../../Redux/URL";
import axios from "axios";
import ErrorImage from "../../components/loadingStates/ErrorImage";

const Embassies = ({ navigation }) => {
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
  const [videoMedia, setVideoMedia] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  const categ = "Embassies";

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

  async function submitReport() {
    try {
      setLoading(true);
      const data = {};
      data.category = categ;
      data.sub_report_type = insidentType;
      data.description = textInput;
      data.is_anonymous = isEnabled;
      data.landmark = address;
      data.rating = selectedId;
      data.country = country;
      data.state_embassy_location = stateEmbassey;
      data.ambassedor_name = ambassedor;

      if (location) {
        data.latitude = location.latitude;
        data.longitude = location.longitude;
      }
      if (albums) {
        const fileType = albums.substring(albums.lastIndexOf(".") + 1);
        const mimeType =
          fileType === "jpg" || fileType === "jpeg"
            ? "image/jpeg"
            : fileType === "png"
            ? "image/png"
            : fileType === "mp4"
            ? "video/mp4"
            : "audio/mpeg";
        data.media_type = {
          uri: albums,
          type: mimeType,
          name: albums,
        };
      }

      const appendFileToData = (uri, index, typePrefix) => {
        if (uri) {
          const fileType = uri.substring(uri.lastIndexOf(".") + 1);
          const mimeType =
            fileType === "jpg" || fileType === "jpeg"
              ? "image/jpeg"
              : fileType === "png"
              ? "image/png"
              : fileType === "mp4"
              ? "video/mp4"
              : "audio/mpeg";
          data[`mediaFiles_${index}`] = {
            uri: uri,
            type: mimeType,
            name: `${typePrefix}_${index}.${fileType}`,
          };
        }
      };

      if (photoUri) {
        appendFileToData(photoUri, 0, "photo");
      }

      if (videoMedia) {
        appendFileToData(videoMedia, 1, "video");
      }

      if (storedRecording) {
        appendFileToData(storedRecording, 2, "audio");
      }

      const response = await axios.post(CREATE_REPORT, data, {
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
      ambassedor != "" &&
      loading === false
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
        onPress={submitReport}
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
  errorStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});
