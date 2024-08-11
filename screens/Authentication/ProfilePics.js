import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import AuthLayoutSignUp from "./AuthLayoutSignUp";
import { COLORS, icons, SIZES } from "../../constants";
import TextButton from "../../components/TextButton";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signup } from "../../Redux/authSlice";
import LoadingImage from "../../components/loadingStates/LoadingImage";

const ProfilePics = ({ navigation, route }) => {
  const [profileImage, setProfileImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const dispatch = useDispatch();
  const { loading, error, user, status } = useSelector((state) => state.auth);
  const { fullname, email, phoneNumber, password, username } = route.params;

  const mediaAccess = async () => {
    try {
      setImageLoading(true);
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Sorry, we need media library permissions to access your photos."
        );
        setImageLoading(false);
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error accessing media library: ", error);
      Alert.alert("Error", "There was an error accessing your media library.");
    } finally {
      setImageLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert("Sign Up failed", "There was an issue signing you up.");
    }
  }, [error]);

  useEffect(() => {
    if (user && status === "Created") {
      navigation.navigate("SignUpSuccess", {
        fullname,
        email,
        phoneNumber,
        password,
        username,
      });
    }
  }, [user, status, navigation]);

  const isEnableSignIn = () => profileImage !== "";

  const signUpFnc = () => {
    if (profileImage) {
      dispatch(
        signup({
          profileImage,
          fullname,
          username,
          phoneNumber,
          email,
          password,
        })
      );
    } else {
      noImage();
    }
  };

  function noImage() {
    setProfileImage(icons.anonymous);
    dispatch(
      signup({
        profileImage,
        fullname,
        username,
        phoneNumber,
        email,
        password,
      })
    );
  }
  if (loading) return <LoadingImage />;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Image source={icons.arrowleft} style={styles.backButtonIcon} />
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
                <View style={styles.defaultImageContainer}>
                  <Image
                    source={icons.uploadProfile}
                    resizeMode="cover"
                    style={styles.defaultImage}
                  />
                </View>
              )}
            </TouchableOpacity>
            <Text style={styles.text}>Add Profile Photo</Text>
          </View>

          <TextButton
            label={profileImage ? "Next" : "Skip"}
            //disabled={!isEnableSignIn()}
            buttonContainerStyle={[
              styles.nextButton,
              {
                backgroundColor: "#0E9C67",
              },
            ]}
            labelStyle={styles.nextButtonLabel}
            onPress={signUpFnc}
          />
        </View>
      </AuthLayoutSignUp>
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
});
