import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, icons, SIZES } from "../constants";
import feeds from "../data/DummyFeedData";
import { utils } from "../utils";
import FormInput from "../components/FormInput";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_PROFILE_PICS, UPDATE_PROFILE } from "../Redux/URL";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ErrorImage from "../components/loadingStates/ErrorImage";
import TextButton from "../components/TextButton";
import NetworkError from "../components/loadingStates/NetworkError";
import LoadingImage from "../components/loadingStates/LoadingImage";
import axios from "axios";
import { profile_sec } from "../Redux/authSlice";
import StateLocal from "../components/StateLocal";

const EditProfile = ({ navigation }) => {
  const [state, setState] = useState("");
  const [localGov, setLocalGov] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [UserName, setUserName] = useState("");
  const [isValidImage, setIsValidImage] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [profileImag, setProfileImag] = useState("");
  const [loading, setLoading] = useState(false);
  //const [successModal, setSuccessModal] = useState(false);
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState("");

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //const profile = feeds[3];

  const mediaAccess = async () => {
    try {
      setImageLoading(true);
      // const { status } = await MediaLibrary.requestPermissionsAsync();
      // if (status !== "granted") {
      //   Alert.alert(
      //     "Sorry, we need media library permissions to access your photos."
      //   );
      //   setImageLoading(false);
      //   return;
      // }

      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImag(result.assets[0].uri);
        console.log(profileImag);
        //updatePix(profileImag);
        //console.log("The profile image was updated to the server");
      } else {
        Alert.alert("You did not select any image.");
      }
    } catch (error) {
      //console.error("Error accessing media library: ", error);
      Alert.alert("Error accessing media library", error);
    } finally {
      setImageLoading(false);
    }
  };

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
    if (profileImag !== "") {
      updatePix();
    }
  }, [profileImag]);

  useEffect(() => {
    dispatch(profile_sec({ access_token: token }));
  }, [fullName, localGov, state]);

  async function updateProfile() {
    try {
      setLoading(true);
      const formData = new FormData();

      if (fullName) {
        formData.append("fullname", fullName);
      }
      if (UserName) {
        formData.append("username", UserName);
      }
      if (state) {
        formData.append("state", state);
      }
      if (localGov) {
        formData.append("lga", localGov);
      }
      const response = await axios.put(UPDATE_PROFILE, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("report created successfully:", response.data);
      if (response.status === 200) {
        setLoading(false);
        setUpdateSuccess(true);
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
    } finally {
      setLoading(false);
    }
  }

  async function updatePix() {
    try {
      setImageLoading(true);
      if (profileImag) {
        const formData = new FormData();
        formData.append("profileImage", {
          uri: profileImag,
          type: "image/jpeg",
          name: "profileUpdate.jpg",
        });

        const response = await axios.put(UPDATE_PROFILE_PICS, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Profile image updated successfully:", response.data);
        if (response.status === 200) {
          Alert.alert("Success", "Profile image updated successfully");
          setImageLoading(false);
          dispatch(profile_sec({ access_token: token }));
          //dispatch(profile_sec());
          setUpdateSuccess(true);
        }
        return response.data;
      }
    } catch (error) {
      setImageLoading(false);
      //setError(error);
      if (error.response) {
        console.log("server error:", error.response.data);
        Alert.alert(
          "Error updating pricture",
          "There was an issue with the server. Please try again later."
        );
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        console.log("network error:", error.message);
        Alert.alert(
          "Network error updating pricture",
          "Please check your internet connection and try again."
        );
        return rejectWithValue(error.message);
      } else {
        console.log("error:", error.message);
        Alert.alert(
          "Error updating pricture",
          "An unexpected error occurred. Please try again."
        );
        setErrorMessage();
        return rejectWithValue(error.message);
      }
    } finally {
      setImageLoading(false);
    }
  }

  useEffect(() => {
    if (user?.profileImage) {
      Image.prefetch(user.profileImage)
        .then(() => setIsValidImage(true))
        .catch(() => setIsValidImage(false));
    } else {
      setIsValidImage(false);
    }
  }, [user?.profileImage]);

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
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={icons.arrowleft}
            style={{ width: 20, height: 20, tintColor: "black" }}
          />
        </TouchableOpacity>
        <Text style={styles.editProfileText}>Edit Profile</Text>
      </View>

      <View style={styles.profileImageContainer}>
        <TouchableOpacity onPress={mediaAccess}>
          {imageLoading ? (
            <ActivityIndicator size="large" color={`${COLORS.primary}`} />
          ) : profileImag ? (
            <Image
              source={{ uri: user?.profileImag }}
              style={styles.profileImg}
            />
          ) : (
            <Image
              source={
                isValidImage ? { uri: user?.profileImage } : icons.anonymous
              }
              style={styles.profileImg}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.profileImageText}>Change Profile Photo</Text>
      </View>

      <ScrollView>
        <View>
          <FormInput
            label="Full Name"
            placeholder={user?.name}
            containerStyle={{
              marginTop: SIZES.radius,
              flex: 1,
            }}
            onChange={(value) => {
              setFullName(value);
            }}
            errorMsg={fullNameError}
            appendComponent={
              <View
                style={{
                  justifyContent: "center",
                }}
              >
                <Image
                  source={
                    fullName == "" || (fullName != "" && fullNameError == "")
                      ? icons.correct
                      : icons.cancel
                  }
                  style={{
                    height: 20,
                    width: 20,
                    tintColor:
                      fullName == ""
                        ? COLORS.gray
                        : fullName != "" && fullNameError == ""
                        ? COLORS.green
                        : COLORS.red,
                  }}
                />
              </View>
            }
          />

          <View style={{ marginLeft: "auto", height: 30 }}>
            <Text
              style={{ fontWeight: "700", fontSize: 17, color: COLORS.primary }}
            >
              Change Fullname
            </Text>
          </View>
        </View>

        <View>
          <FormInput
            label="Username"
            placeholder={user?.username}
            containerStyle={{
              marginTop: SIZES.radius,
              flex: 1,
            }}
            onChange={(value) => {
              setUserName(value);
            }}
            errorMsg={fullNameError}
            appendComponent={
              <View
                style={{
                  justifyContent: "center",
                }}
              >
                <Image
                  source={
                    UserName == "" || (UserName != "" && usernameError == "")
                      ? icons.correct
                      : icons.cancel
                  }
                  style={{
                    height: 20,
                    width: 20,
                    tintColor:
                      UserName == ""
                        ? COLORS.gray
                        : fullName != "" && usernameError == ""
                        ? COLORS.green
                        : COLORS.red,
                  }}
                />
              </View>
            }
          />

          <View style={{ marginLeft: "auto", height: 30 }}>
            <Text
              style={{ fontWeight: "700", fontSize: 15, color: COLORS.primary }}
            >
              Change Username
            </Text>
          </View>
        </View>

        <StateLocal
          selectedState={state}
          setSelectedState={setState}
          selectedLocalGov={localGov}
          setSelectedLocalGov={setLocalGov}
        />
        <TextButton
          label="Update your details"
          //disabled={isEnableSignUp() ? false : true}
          buttonContainerStyle={{
            height: 55,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 45,
            borderRadius: SIZES.radius,
            backgroundColor: "#0E9C67",
          }}
          labelStyle={{
            color: COLORS.white,
            fontWeight: "700",
            fontSize: 17,
          }}
          onPress={updateProfile}
        />
      </ScrollView>
      <Modal animationType="slide" transparent={true} visible={updateSuccess}>
        <View style={styles.modalContainer}>
          <Image
            source={icons.SignUpSuccess}
            style={{ height: 110, width: 110, marginTop: 5 }}
            resizeMode="contain"
          />

          <View style={styles.logoutTextContainer}>
            <Text style={styles.primaryText}>Profile Updated successfully</Text>
          </View>
          <TextButton
            label="Dismiss"
            buttonContainerStyle={{
              height: 50,
              width: "80%",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.primary,
            }}
            labelStyle={{
              color: COLORS.white,
              fontWeight: "700",
              fontSize: 18,
            }}
            onPress={() => {
              setUpdateSuccess(false);
              dispatch(profile_sec({ access_token: token }));
              navigation.reset({
                index: 0,
                routes: [{ name: "MainScreen" }],
              });
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  editProfileText: {
    fontWeight: "700",
    color: COLORS.primary,
    fontSize: 20,
    marginLeft: 100,
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileImageContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  profileImageText: {
    marginLeft: 35,
    fontWeight: "700",
    fontSize: 16,
    color: COLORS.primary,
  },

  modalContainer: {
    width: "98%",
    height: 235,
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: 7,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: COLORS.gray2,
    paddingHorizontal: 8,
  },

  logoutTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  primaryText: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 25,
  },
  secondaryText: {
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 20,
    textAlign: "center",
    marginVertical: 10,
  },
});
