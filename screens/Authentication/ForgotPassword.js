import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StatusBar } from "react-native";
//import { AuthLayout } from "../";
import { SIZES, COLORS, icons } from "../../constants";
import FormInput from "../../components/FormInput";
import TextButton from "../../components/TextButton";
import { utils } from "../../utils";
import AuthLayoutSignUp from "./AuthLayoutSignUp";
import axios from "axios";
import { FORGET_PASSWORD } from "../../Redux/URL";
import LoadingImage from "../../components/loadingStates/LoadingImage";
import ErrorImage from "../../components/loadingStates/ErrorImage";
import NetworkError from "../../components/loadingStates/NetworkError";
import { StyleSheet } from "react-native";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function isEnableSendEmail() {
    return email != "" && emailError == "";
  }
  async function forgetPassfnc(email) {
    setLoading(true);
    try {
      const response = await axios.post(FORGET_PASSWORD, {
        email,
      });

      if (response.status === 200) {
        navigation.navigate("EmailSuccess", { email });
        setLoading(false);
      }
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

  if (loading) return <LoadingImage />;

  if (error.response) {
    return (
      <View style={styles.errorStyle}>
        <ErrorImage />
        <Text style={{ color: "red", fontSize: 10, fontWeight: "400" }}>
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
    <AuthLayoutSignUp
      title="Password Recovery"
      subtitle="Please enter your email address to recover your password"
      titleContainerStyle={{
        marginTop: StatusBar.currentHeight || 45,
      }}
    >
      {/** Form Input */}

      <View
        style={{
          flex: 1,
          marginTop: SIZES.padding * 2,
        }}
      >
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
      </View>

      {/** Button */}
      <TextButton
        label="Send Email"
        disabled={isEnableSendEmail() ? false : true}
        buttonContainerStyle={{
          height: 55,
          alignItems: "center",
          marginBottom: SIZES.padding,
          marginTop: 45,
          borderRadius: SIZES.radius,
          backgroundColor: isEnableSendEmail() ? "#0E9C67" : COLORS.invisible,
        }}
        labelStyle={{
          color: COLORS.white,
          fontWeight: "700",
          fontSize: 17,
        }}
        onPress={async () => {
          await forgetPassfnc(email);
        }}
      />
    </AuthLayoutSignUp>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  errorStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});
