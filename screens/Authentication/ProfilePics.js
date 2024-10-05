import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Alert,
  Image,
  ActivityIndicator,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import AuthLayoutSignUp from "./AuthLayoutSignUp";
import { COLORS, icons, SIZES } from "../../constants";
import TextButton from "../../components/TextButton";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import LoadingImage from "../../components/loadingStates/LoadingImage";
import axios from "axios";
import { SIGNUP } from "../../Redux/URL";
import { Vibration } from "react-native";

const ProfilePics = ({ navigation, route }) => {
  const [profileImage, setProfileImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const { fullname, email, phoneNumber, password, username } = route.params;

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
        setProfileImage(result.assets[0].uri);
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

  // useEffect(() => {
  //   if (error) {
  //     Alert.alert("Sign Up failed", "There was an issue signing you up.");
  //     console.log(error);
  //   }
  // }, [error]);

  const signUpFnc = async () => {
    //console.log("signup function called");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("telephone", phoneNumber);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      if (profileImage) {
        const fileType = profileImage.substring(
          profileImage.lastIndexOf(".") + 1
        );
        formData.append("profile_image", {
          uri: profileImage,
          type: `image/${fileType}`,
          name: `profile_image.${fileType}`,
        });
      }

      console.log("Form Data before sending to server:", formData);
      const response = await axios.post(SIGNUP, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigation.navigate("SignUpSuccess", {
        fullname,
        email,
        phoneNumber,
        password,
        username,
      });
      console.log("Signup response data:", response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorModal(true);
      Vibration.vibrate();
      console.log(error);
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
  };

  if (loading) return <LoadingImage />;

  // if (user && status === "Created") {
  //   navigation.navigate("SignUpSuccess", {
  //     fullname,
  //     email,
  //     phoneNumber,
  //     password,
  //     username,
  //   });
  //   //     dispatch(resetUserStatus());
  // }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Image
          source={icons.arrowleft}
          style={{ width: 23, height: 23, tintColor: "black", marginLeft: 12 }}
        />
      </TouchableOpacity>
      <AuthLayoutSignUp
        steps="Personalization"
        title="Add Profile Photo"
        subTitle="Add your preferred picture or avatar "
        containerStyle={styles.authLayout}
      >
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={mediaAccess}>
              {imageLoading ? (
                <ActivityIndicator size="large" color={`${COLORS.primary}`} />
              ) : profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  resizeMode="cover"
                  style={styles.profileImage}
                />
              ) : (
                <Image
                  source={icons.uploadProfile}
                  resizeMode="cover"
                  style={styles.profileImage}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.text}>Add Profile Photo</Text>
          </View>

          <TextButton
            label={profileImage ? "Next" : "Skip"}
            buttonContainerStyle={styles.nextButton}
            labelStyle={styles.nextButtonLabel}
            onPress={() => {
              if (profileImage) {
                signUpFnc();
              } else if (profileImage === "") {
                noProfileSignUp();
              }
            }}
          />
        </View>
      </AuthLayoutSignUp>
      <Modal animationType="slide" transparent={true} visible={errorModal}>
        <View style={styles.modalContainer}>
          <Image
            source={icons.erroricon}
            style={{ height: 80, width: 100, marginTop: 8 }}
            resizeMode="contain"
          />

          <View style={styles.logoutTextContainer}>
            <Text style={styles.primaryText}>Sign up failed</Text>
            <Text style={styles.secondaryText}>{errorMessage}</Text>
          </View>
          <TextButton
            label="Dismiss"
            buttonContainerStyle={{
              height: 55,
              width: "80%",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 50,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.primary,
            }}
            labelStyle={{
              color: COLORS.white,
              fontWeight: "700",
              fontSize: 18,
            }}
            onPress={() => setErrorModal(false)}
          />
        </View>
      </Modal>
    </View>
  );
};

export default ProfilePics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 45,
    backgroundColor: COLORS.white,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  text: {
    fontWeight: "800",
    fontSize: 16,
    lineHeight: 19.6,
    marginRight: 95,
    color: COLORS.primary,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 70,
    marginRight: 15,
    marginTop: 18,
  },
  authLayout: {
    paddingVertical: 20,
  },
  nextButton: {
    height: 50,
    width: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.white,
  },
  modalContainer: {
    width: "98%",
    height: 350,
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: 7,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: COLORS.gray2,
  },
  imagelogoutContainer: {
    alignItems: "center",
    justifyContent: "center",

    marginTop: 10,
  },
  logoutTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
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
  },
});
