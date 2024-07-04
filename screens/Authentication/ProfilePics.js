import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Alert,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import AuthLayoutSignUp from "./AuthLayoutSignUp";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants";
import TextButton from "../../components/TextButton";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signup } from "../../Redux/authSlice";
import LoadingImage from "../../components/loadingStates/LoadingImage";

const ProfilePics = ({ navigation, route }) => {
  const [profileImage, setProfileImage] = useState();
  const dispatch = useDispatch();
  const { loading, error, user, status } = useSelector((state) => state.auth);
  const { fullname, email, phoneNumber, password, username } = route.params;

  const mediaAccess = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Sorry, we need media library permissions to access your photos."
      );
      return;
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert("Sign Up failed,", "The was an issue signing you up");
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

  function signUpFnc() {
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
        style={{
          marginTop: 5,
          justifyContent: "flex-start",
          //marginBottom: ,
          marginLeft: 15,
        }}
        onPress={() => navigation.navigate("SignUp")}
      >
        <AntDesign name="arrowleft" size={25} color="black" />
      </TouchableOpacity>
      <AuthLayoutSignUp
        steps="Personalization"
        title="Add Profile Photo"
        subTitle="Add your preferred picture or avatar "
        containerStyle={{
          paddingTop: 25,
        }}
      >
        <View
          style={{
            flex: 1,
            marginTop: 45,
          }}
        >
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={mediaAccess}>
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  resizeMode="cover"
                  style={{ width: 90, height: 90, borderRadius: 45 }}
                />
              ) : (
                <Ionicons
                  name="person-circle-outline"
                  size={90}
                  color={COLORS.gray}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.text}>Add Profile Photo</Text>
          </View>

          <TextButton
            label={profileImage ? "Next" : "Skip"}
            //disabled={isEnableSignUp() ? false : true}
            buttonContainerStyle={{
              height: 55,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 35,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.primary,
            }}
            labelStyle={{
              color: COLORS.white,
              fontWeight: "700",
              fontSize: 17,
            }}
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
