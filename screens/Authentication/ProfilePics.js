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
//import AsyncStorage from "@react-native-async-storage/async-storage";
import { resetUserStatus, signup } from "../../Redux/authSlice";
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

  useEffect(() => {
    if (user && status === "Created") {
      navigation.navigate("SignUpSuccess", {
        fullname,
        email,
        phoneNumber,
        password,
        username,
      });
      dispatch(resetUserStatus());
    }
  }, [user, status, navigation, dispatch]);

  const signUpFnc = () => {
    //console.log("signup function called");
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
  };

  if (loading) return <LoadingImage />;

  if (error) {
    Alert.alert(
      "Sign Up failed",
      "There was an issue signing you up. Please check your internet connection and try again later."
    );
    console.log(error);
    dispatch(resetUserStatus());
  }

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
});
