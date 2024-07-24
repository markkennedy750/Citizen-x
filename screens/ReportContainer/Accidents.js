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
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingImage from "../../components/loadingStates/LoadingImage";
import { CREATE_REPORT } from "../../Redux/URL";
import axios from "axios";

const Accidents = ({ navigation }) => {
  const [insidentType, setInsidentType] = useState("");
  const [textInput, setTextInput] = useState("");
  const [albums, setAlbums] = useState("");
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

  useEffect(() => {
    if (error) {
      Alert.alert("Login Failed", error.message);
    }
  }, [error]);

  async function submitReport() {
    try {
      setLoading(true);
      const data = {};
      data.category = categ;
      data.sub_report_type = insidentType;
      data.description = textInput;
      if (causeOfAccident) {
        data.accident_cause = causeOfAccident;
      }
      data.date_of_incidence = date;
      data.state_name = selectedState;
      data.lga_name = selectedLocalGov;
      data.is_response = checkboxValue;
      data.is_anonymous = isEnabled;
      data.landmark = address;

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
      console.log("report error:", error.response.data);
      setLoading(false);
      setError(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }

  if (loading) return <LoadingImage />;
  return (
    <ReportWrapper title="Accidents">
      <InsidentType
        insidenType={insidentType}
        setInsidentType={setInsidentType}
        labelType="Crime Type"
        label="Select the type of Insident"
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
});
