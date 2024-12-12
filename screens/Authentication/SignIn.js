import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  Modal,
  Vibration,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";
//import { AuthLayout } from "../";
import { SIZES, COLORS, icons } from "../../constants";
import FormInput from "../../components/FormInput";
import { utils } from "../../utils";
import CustomSwitch from "../../components/CustomSwitch";
import TextButton from "../../components/TextButton";
import { StatusBar } from "react-native";
import LoadingImage from "../../components/loadingStates/LoadingImage";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SIGNIN } from "../../Redux/URL";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [saveMe, setSaveMe] = useState(false);

  function isEnableSignIn() {
    return email != "" && password != "" && emailError == "";
  }

  async function signInFn() {
    setLoading(true);
    try {
      const response = await axios.post(SIGNIN, {
        email,
        password,
      });
      const { access_token, refresh_token } = response.data.data;

      await AsyncStorage.setItem("access_token", access_token);
      await AsyncStorage.setItem("refresh_token", refresh_token);
      //console.log(response.data);
      if (response.status === 200) {
        setLoading(false);
        navigation.reset({
          index: 0,
          routes: [{ name: "MainScreen" }],
        });
      }
    } catch (error) {
      setLoading(false);
      setErrorModal(true);
      Vibration.vibrate();
      console.log(error);
      if (error.response) {
        console.log("server error:", error.response.data);
        const errorMessage =
        error.response.data.errors || "An error occurred. Please try again.";
      setErrorMessage(errorMessage);
        return rejectWithValue(error.response.message);
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

  if (loading) return <LoadingImage />;

  return (
    <ScrollView containerStyle={styles.container}>
      <TouchableOpacity
        style={{
          marginTop: 15,
          justifyContent: "flex-start",
          marginBottom: 10,
          marginLeft: 15,
        }}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Image
          source={icons.arrowleft}
          style={{ width: 20, height: 20, tintColor: "black" }}
        />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          paddingTop: SIZES.padding * 0.5,
          paddingHorizontal: 17,
        }}
      >
        <View style={styles.imageContainer}>
          <Image
            source={icons.citizenx}
            resizeMode="contain"
            style={styles.image}
          />
          <Text style={styles.titleText}>CITIZEN X</Text>
        </View>
        {/** Email Form Inputs */}
        <FormInput
          label="Email"
          keyboardType="email-address"
          autoCompleteType="email"
          onChange={(value) => {
            // validate email
            utils.validateEmail(value, setEmailError);
            setEmail(value);
          }}
          errorMsg={emailError}
          appendComponent={
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <Image
                source={
                  email == "" || (email != "" && emailError == "")
                    ? icons.correct
                    : icons.cancel
                }
                style={{
                  height: 20,
                  width: 20,
                  tintColor:
                    email == ""
                      ? COLORS.gray
                      : email != "" && emailError == ""
                      ? COLORS.green
                      : COLORS.red,
                }}
              />
            </View>
          }
        />

        <FormInput
          label="Password"
          secureTextEntry={!showPass}
          autoCompleteType="password"
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          onChange={(value) => setPassword(value)}
          appendComponent={
            <TouchableOpacity
              style={{
                width: 40,
                alignItems: "flex-end",
                justifyContent: "center",
              }}
              onPress={() => setShowPass(!showPass)}
            >
              <Image
                source={showPass ? icons.eye_close : icons.eye}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: COLORS.gray,
                }}
              />
            </TouchableOpacity>
          }
        />

        {/** Save me & Forget Password */}
        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.radius,
            justifyContent: "space-between",
          }}
        >
          <CustomSwitch value={saveMe} onChange={(value) => setSaveMe(value)} />
          <TextButton
            label="Forgot Password?"
            buttonContainerStyle={{
              backgroundColor: null,
            }}
            labelStyle={{
              color: COLORS.gray,
              fontWeight: "600",
            }}
            onPress={() => Linking.openURL("https://www.citizenx.ng/forgot")}
          />
        </View>
        {/** Sign In */}
        <TextButton
          label="Sign In"
          disabled={isEnableSignIn() ? false : true}
          buttonContainerStyle={{
            height: 55,
            alignItems: "center",
            justifyContent: "center",
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: isEnableSignIn() ? "#0E9C67" : COLORS.invisible,
          }}
          labelStyle={{
            color: COLORS.white,
            fontWeight: "700",
            fontSize: 17,
          }}
          onPress={signInFn}
        />
        {/** Sign up */}

        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.radius,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 25,
            //marginBottom: "auto",
          }}
        >
          <Text
            style={{
              color: COLORS.darkGray,
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            Don't have an acount?
          </Text>

          <TextButton
            label="Sign Up"
            buttonContainerStyle={{
              //marginLeft: 2,
              backgroundColor: null,
            }}
            labelStyle={{
              color: "#0E9C67",
              fontWeight: "700",
              fontSize: 18,
            }}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: "SignUp" }],
              });
            }}
          />
        </View>
      </View>

      {/** Footer */}
      <Modal animationType="slide" transparent={true} visible={errorModal}>
        <View style={styles.modalContainer}>
          <Image
            source={icons.erroricon}
            style={{ height: 90, width: 90, marginTop: 5 }}
            resizeMode="contain"
          />

          <View style={styles.logoutTextContainer}>
            <Text style={styles.primaryText}>Login Failed</Text>
            <Text style={styles.secondaryText}>{errorMessage}</Text>
          </View>
          <TextButton
            label="Dismiss"
            buttonContainerStyle={{
              height: 55,
              width: "80%",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 30,
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
    </ScrollView>
  );
};

export default SignIn;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 45,
    backgroundColor: COLORS.gray2,
  },
  image: {
    width: 65,
    height: 65,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
  },
  titleText: {
    fontSize: 12.1,
    fontWeight: "500",
    color: "#000000",
  },
  modalContainer: {
    width: "98%",
    height: 320,
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
  imagelogoutContainer: {
    alignItems: "center",
    justifyContent: "center",

    marginTop: 10,
  },
  logoutTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
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
